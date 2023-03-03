import {travelKind} from "../data/travelkind";
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

//A base class that effects inherit from
class Effect {
    constructor(effect){
        this.effect = effect;
        this.revertState = []; //the state we write when we uncheck a policy change, pair of journeys and emission bars
    }
    
    apply(){}

    revert(){}

    getCO2eSaved(){ return 0; }

    //takes a list of bars (pairs of [name, num]), make sure you dont pass in a [bar, setter] pair ([[name, num], setter])
    static sumCO2e(emissions){
          
        const sum = emissions.reduce((x, y) => x + y[1], 0);
        return sum;
    }

    //arguments: any bars (pairs of [name, value]), variadic array of strings
    //returns  : array of indices for all names
    static searchBarsOnNames(bars, ...names){
        if(names.length === 0) { return [-1]; }

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
}


//Placeholder, returns a new effect that does nothing
//const NO_EFFECT = (() => {return new Effect(()=>{return [[], []]})})();

class NoEffect extends Effect {

}

//A class to be used for all simple effects, ensures they are only accessing the current prediction data. Consistency of scope. 
class SimpleEffect extends Effect {

    //constructor(effect){super(effect)}

    //mutates journeys and/or emissions and returns nothing
    //wraps effects in a context of just taking two arguments
    //journeysState and emissionsState are array-setter pairs
    apply(journeysState, emissionsState){

        this.revertState = [journeysState[0], emissionsState[0]]; //saves the current state before changing it, so we can change things back when we uncheck
        //assert we have data
        if(this.revertState[0].length === 0 || this.revertState[1].length === 0){
            return;
        }

        const [newJourneys, newEmissions] = this.effect(journeysState, emissionsState);
        //assigns new values to bars
        (journeysState[1])(newJourneys);
        (emissionsState[1])(newEmissions);
    }

    revert(journeysState, emissionsState){
        (journeysState[1])(this.revertState[0]);
        (emissionsState[1])(this.revertState[1]);
    }

    //Returns the change in emissions a simple effect gives
    getCO2eSaved(journeysState, emissionsState){

        //effect will mutate copies
        const newEmissions = this.effect(journeysState, emissionsState)[1];

        //measure the change in the emissionsCopy
        return Effect.sumCO2e(emissionsState[0]) - Effect.sumCO2e(newEmissions);
    }
}

//immutable set of policies and their effects
const POLICIES_BASE = 
[
    {
        name: "No domestic flights",
        effect: new NoEffect() // will do something to the data
    },
    {
        name: "Economy-class flights",
        effect: new NoEffect()
    },
    {
        name: "Replace all ICEs with EVs",
        effect: new SimpleEffect((jState, eState) => {
                const journeys = jState[0];
                const emissions = eState[0];

                //Swap all ICE journeys with EVs

                //indices of all interesting bars
                const [journeyEVBar, journeyPetrolBar, journeyDieselBar] = Effect.searchBarsOnNames(journeys, travelKind.electricCar, travelKind.petrolCar, travelKind.dieselCar);
                const iceBars = [journeyPetrolBar, journeyDieselBar];

                let newJourneys = Effect.copyBars(journeys); //a mutable copy of journeys

                //add extra journeys to electricCars from diesel or petrol 
                iceBars.map((position) => {
                    if(position !== -1){ //if it was found by Effect.searchBarsOnNames
                        newJourneys[journeyEVBar][1] += journeys[position][1];
                        newJourneys[position][1] = 0;
                    }
                    return position;
                });

                //remove ICE emissions, scale EV emissions by extrapolation
                const factorEV = newJourneys[journeyEVBar][1] / journeys[journeyEVBar][1];

                let newEmissions = Effect.copyBars(emissions); //a mutable copy of emissions

                const [emissionsEVBar, emissionsPetrolBar, emissionsDieselBar] = Effect.searchBarsOnNames(emissions, travelKind.electricCar, travelKind.petrolCar, travelKind.dieselCar);

                const EVBar = newEmissions[emissionsEVBar];
                EVBar[1] = EVBar[1] * factorEV; //extrapolate the increase in ev journeys
                newEmissions[emissionsPetrolBar][1] = 0; //no longer emitters
                newEmissions[emissionsDieselBar][1] = 0; //no longer emitters

                return [newJourneys, newEmissions];
            })
    },
    {
        name: "Train routes <300mi",
        effect: new NoEffect()
    },
    {
        name: "Coach routes for <3hrs",
        effect: new NoEffect()
    },
    {
        name: "Replace personal vehicles with taxis",
        effect: new NoEffect()
    },
    {
        name: "Electric scooters forbidden",
        effect: new NoEffect()
    },
    {
        name: "No personal ICE vehicles",
        effect: new NoEffect()
    }
]

export const getPolicies = () => {
    let policiesCopy = [];
    POLICIES_BASE.map(x => {
        policiesCopy.push(
            {
                name: x.name,
                effect: x.effect,
                selected: false
            }
        )
        return x;
    })
    return policiesCopy;
}