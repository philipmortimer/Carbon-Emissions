import {travelKind} from "../data/travelkind";

const INCLUDE_EFFECTS = true;

// assumptions 
const DOMESTIC_FLIGHT_PROPORTION = 0.75;

// policies is an object containing all selectable options
/* 
it may look something like this

policies = 
[
    {
        name: "No domestic flights",
        effect: () => {} // function
        selected: false
    },
    {
        ...
    }
]

this object will get mutated here, provided a setter setPolicies which will update each policy field as a callback of the bootstrap 'form-check-input'
*/

/**
 * 
 */

//A base class that effects inherit from
class Effect {
    constructor(effect){
        this.effect = effect;
    }
    
    static NOT_FOUND_FACTOR = 1; //preserves original emission (see SimpleEffect.interpolateEmissions)

    applyEffect(){}

    getCO2eSaved(){ return 0; }

    //takes a list of bars (pairs of [name, num]), make sure you dont pass in a [bar, setter] pair ([[name, num], setter])
    static sumCO2e(emissions){
        
        const sum = emissions.reduce((x, y) => x + y[1], 0);
        return sum;
    }

    //arguments: any bars (pairs of [name, value]), variadic array of strings
    //returns  : array of indices for all names
    static searchBarsOnNames(bars, ...names){
        if(names.length === 0) { throw Error("searchBarsOnNames cannot be called with no names to search for"); }

        //indices corresponds 1:1 with names
        const indices = []; //names.map(n => {indices.push(-1); return n}); 
        for(let i = 0; i < names.length; i++){
            indices.push(-1);
        }

        for(let i = 0; i < bars.length; i++){
            const name = bars[i][0];
            names.map((n, j) => { 
                if(name === n) { indices[j] = i; };
                return n;
            })
        }

        return indices;
    }

    static copyBars(src){
        return JSON.parse(JSON.stringify(src));
    }

    static totalBars(bars){
        const copy = Effect.copyBars(bars);
        return copy.reduce((subTot, bar) => subTot + bar[1], 0);
    }

    //handles any index of indices being -1, just adds nothing
    static tallyBarsOnIndices(bars, ...indices){
        if(indices.length === 0) { throw Error("tallyBarsOnIndices cannot be called with no names to search for"); }
        let val = 0;
        for(let i = 0; i < indices.length; i++){
            const index = indices[i];
            if(index >= 0 && index < bars.length){
                val += bars[index][1];
            }
        }
        return val;
    }

    // increases the number of predicted journeys of each bar proportionally s.t. they sum to x more journeys in total
    // pass in oldJourneys
    static extrapolateJourneys(journeyBars, totalIncrease){
        const total = Effect.totalBars(journeyBars);
        const factr = (totalIncrease + total) / total;
        return journeyBars.map(bar => [bar[0], bar[1] * factr]);
    }

    // pass in oldEmissions
    static interpolateEmissions(emissionBars, journeyBarsOld, journeyBarsNew){
        const factors = {}; //map string->number, always at least as many factors as emission bars

        journeyBarsOld.map((bar, i) => { 
            const barName = bar[0];
            const barVal  = bar[1];
            if(barVal === 0) {
                factors[barName] = undefined; //avoids what would otherwise be a division by 0
            }else{
                factors[bar[0]] = journeyBarsNew[i][1] / barVal;  //find by what proportion a bar has increased by 
            }

            return bar;
        });

        return emissionBars.map((bar) => {
            const barName = bar[0];
            const f = factors[barName] === undefined ? Effect.NOT_FOUND_FACTOR : factors[barName]; //if a travel type is not included in journeys, it is not to be interpolated on 
            return [bar[0], bar[1] * f];
        }); //increase by name, not index
    }
}

class NoEffect extends Effect {

}

//A class to be used for all simple effects, ensures they are only accessing the current prediction data. Consistency of scope. 
class SimpleEffect extends Effect {

    constructor(effect, name){
        super(effect);
        this.name = name;
    }

    //mutates journeys and/or emissions and returns nothing
    //wraps effects in a context of just taking two arguments
    //journeysState and emissionsState are array-setter pairs
    applyEffect(journeysState, emissionsState){

        const [newJourneys, newEmissions] = this.effect(journeysState, emissionsState);
        //assigns new values to bars
        (journeysState[1])(newJourneys);
        (emissionsState[1])(newEmissions);
    }

    //Returns the change in emissions a simple effect gives
    getCO2eSaved(journeysState, emissionsState){

        const newEmissions = this.effect(journeysState, emissionsState)[1];

        return Effect.sumCO2e(emissionsState[0]) - Effect.sumCO2e(newEmissions);
    }
}

//immutable set of policies and their effects
const POLICIES_BASE = 
[
    {
        name: "No domestic flights",
        //this effect requires some creativity; we say that a high proportion of flights for a small/medium sized company are domestic; ~0.75 (completely arbitrary number).
        effect: new SimpleEffect((jState, eState) => {

            const jOld = jState[0];
            const eOld = eState[0];

            const iFlight = Effect.searchBarsOnNames(jOld, travelKind.flight);
            const jFlight = Effect.tallyBarsOnIndices(jOld, ...iFlight);
            
            let jNew = Effect.copyBars(jOld);

            if(iFlight !== -1) {
                jNew[iFlight][1] *= (1 - DOMESTIC_FLIGHT_PROPORTION);
                jNew = Effect.extrapolateJourneys(jNew, jFlight * DOMESTIC_FLIGHT_PROPORTION);
            }

            const eNew = Effect.interpolateEmissions(eOld, jOld, jNew);

            return [jNew, eNew];

        }, "")
    },
    {
        name: "Economy-class flights",
        effect: new NoEffect()
    },
    {
        name: "Replace all ICEs with Electric cars",
        effect: new SimpleEffect((jState, eState) => {
            const journeys = jState[0];
            const emissions = eState[0];

            //Swap all ICE journeys with EVs

            //indices of all interesting bars
            const [journeyEVIndex, journeyPetrolIndex, journeyDieselIndex] = Effect.searchBarsOnNames(journeys, travelKind.electricCar, travelKind.petrolCar, travelKind.dieselCar);
            const [emissionPetrolIndex, emissionDieselIndex] = Effect.searchBarsOnNames(emissions, travelKind.petrolCar, travelKind.dieselCar);
            const iceBars = [journeyPetrolIndex, journeyDieselIndex];

            let newJourneys = Effect.copyBars(journeys); //a mutable copy of journeys

            //add extra journeys to electricCars from diesel or petrol 
            iceBars.map((position) => {
                if(position !== -1){ //if it was found by Effect.searchBarsOnNames
                    newJourneys[journeyEVIndex][1] += journeys[position][1];
                    newJourneys[position][1] = 0;
                }
                return position;
            });

            const newEmissions = Effect.interpolateEmissions(emissions, journeys, newJourneys);
            
            if(emissionDieselIndex !== -1) newEmissions[emissionDieselIndex][1] = 0; //clamp this to zero if found
            if(emissionPetrolIndex !== -1) newEmissions[emissionPetrolIndex][1] = 0; //clamp this to zero if found

            return [newJourneys, newEmissions];
        }, "ice_ev")
    },
    {
        name: "Train routes <300mi",
        effect: new NoEffect()
    },
    {
        name: "50% of flights become coach and train",
        //assume that all flights take a coach and a train to replace (admittedly not always true or possible)
        effect: new SimpleEffect((jState, eState) => {
            const jOld = jState[0];
            const eOld = eState[0];
            const flight = Effect.searchBarsOnNames(jOld, travelKind.flight);
            const jFlight = Effect.tallyBarsOnIndices(jOld, ...flight);
            const [coach, train] = Effect.searchBarsOnNames(jOld, travelKind.coach, travelKind.train);

            let jNew = Effect.copyBars(jOld);
            jNew[flight][1] /= 2;
            jNew[coach][1] += jFlight / 2;
            jNew[train][1] += jFlight / 2;
            
            const eNew = Effect.interpolateEmissions(eOld, jOld, jNew);

            return [jNew, eNew];

        }, "flight_coachrail")
    },
    {
        name: "Replace personal cars with taxis",
        effect: new SimpleEffect((jState, eState) => {
            const jOld = jState[0];
            const eOld = eState[0];
            const personalVehicles = Effect.searchBarsOnNames(jOld, travelKind.petrolCar, travelKind.dieselCar, travelKind.hybridCar)
            const personalJourneys = Effect.tallyBarsOnIndices(jOld, ...personalVehicles);

            const taxi = Effect.searchBarsOnNames(jOld, travelKind.taxi);

            let jNew = Effect.copyBars(jOld);
            //flatten personal vehicle bars
            personalVehicles.map((index) => {
                if(index !== -1){
                    jNew[index][1] = 0;
                }
                return index;
            });
            //increase taxi by personalJourneys
            jNew[taxi][1] += personalJourneys

            //figure out emissions
            const eNew = Effect.interpolateEmissions(eOld, jOld, jNew);

            return [jNew, eNew];

        }, "taxis_personal")
    },
    {
        name: "Electric scooters forbidden",
        /**
         * Find out how many electric scooters there are
         * Store that number x
         * Set electric scooter journeys to 0
         * Extrapolate journeys by x
         * Interpolate emissions
         */
        effect: new SimpleEffect((jState, eState) => {
            const journeys = jState[0];
            const emissions = eState[0];

            const [index] = Effect.searchBarsOnNames(journeys,travelKind.electricScooter);
            const scooterJourneys = Effect.tallyBarsOnIndices(journeys, index);

            let newJourneys = Effect.copyBars(journeys);
            if(index !== -1) {
                newJourneys[index][1] = 0;
                newJourneys = Effect.extrapolateJourneys(newJourneys, scooterJourneys);
            }

            const newEmissions = Effect.interpolateEmissions(emissions, journeys, newJourneys);

            return [newJourneys, newEmissions];
        }, "no_scooters")
    },
    {
        name: "No personal ICE vehicles",
        /**
         * Total the number of ICE journeys taken in personal vehicles as x
         * Set those bars in newJourneys to 0
         * Extrapolate x more journeys
         * Interpolate emissions
         * Clamp any personal ICE emitters which are not represented in journeys to zero
         */
        effect: new SimpleEffect((jState, eState) => {
            const journeys = jState[0];
            const emissions = eState[0];

            const [journeyPetrolIndex, journeyDieselIndex] = Effect.searchBarsOnNames(journeys, travelKind.petrolCar, travelKind.dieselCar);
            const [emissionPetrolIndex, emissionDieselIndex] = Effect.searchBarsOnNames(emissions, travelKind.petrolCar, travelKind.dieselCar);
            const ICEJourneys = Effect.tallyBarsOnIndices(journeys, journeyPetrolIndex, journeyDieselIndex); //can be 0

            let newJourneys = Effect.copyBars(journeys);
            [journeyPetrolIndex, journeyDieselIndex].map(index => index !== -1 ? newJourneys[index][1] = 0 : {});
            newJourneys = Effect.extrapolateJourneys(newJourneys, ICEJourneys);

            const newEmissions = Effect.interpolateEmissions(emissions, journeys, newJourneys);

            if(emissionPetrolIndex !== -1) newEmissions[emissionPetrolIndex][1] = 0;
            if(emissionDieselIndex !== -1) newEmissions[emissionDieselIndex][1] = 0;

            return [newJourneys, newEmissions]; 
        }, "no_ice")  
    }
]

export const getPolicies = () => {
    let policiesCopy = [];
    POLICIES_BASE.map(x => {
        policiesCopy.push(
            {
                name: x.name,
                effect: INCLUDE_EFFECTS ? x.effect : new NoEffect(), //if you would like to disable effects, please set INCLUDE_EFFECTS false
                selected: false
            }
        )
        return x;
    })
    return policiesCopy;
}