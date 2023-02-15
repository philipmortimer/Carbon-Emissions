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

    getCO2eSaved(){}

    static sumCO2e(emissions){
        //                     num, pair  number
        return emissions.reduce((x, y) => x + y[1], 0);
    }

    //arguments: any bars (pairs of [name, value]), variadic array of strings
    //returns  : array of indices for all names
    static searchBarsOnNames(bars, ...names){
        if(names.length === 0) { return [-1]; }
        console.log(names);

        //indices corresponds 1:1 with names
        const indices = []; //names.map(n => {indices.push(-1); return n}); 
        for(let i = 0; i < names.length; i++){
            indices.push(-1);
        }

        for(let i = 0; i < bars.length; i++){
            const name = bars[i][0];
            names.map((n, j) => { 
                if(name === n) { indices[j] = i; };
            })
        }

        return indices;
    }

    static copyBars(src){
        return JSON.parse(JSON.stringify(src));
    }
}

    // *Example effect* 
/*
    (jState, eState) => {
        const [j, setJ] = jState;
        const [e, setE] = eState;
        setJ(j.pop(1));
        const newE = [];
        e.map((emission, i) => {
            [name, value] = emission;
            if(name === "flight"){
                newE.push(emission);
            }
        });
        setE(newE);
    }
*/

//Placeholder, returns a new effect that does nothing
const NO_EFFECT = (() => {return new Effect(()=>{})})();

//A class to be used for all simple effects, ensures they are only accessing the current prediction data. Consistency of scope. 
class SimpleEffect extends Effect {

    constructor(effect){super(effect)}

    //mutates journeys and/or emissions and returns nothing
    //wraps effects in a context of just taking two arguments
    //journeysState and emissionsState are array-setter pairs
    apply(journeysState, emissionsState){
        this.revertState = [journeysState[0], emissionsState[0]]; //saves the current state before changing it, so we can change things back when we uncheck
        this.effect(journeysState, emissionsState);
    }

    //Returns the change in emissions a simple effect gives
    getCO2eSaved(journeysState, emissionsState){
        //Unpacking just the data and not the setter makes this function inherently safer
        const journeysCopy = [...journeysState[0]];
        const emissionsCopy = [...emissionsState[0]];

        const previousTotalCO2e = Effect.sumCO2e(emissionsCopy);

        //Create setters for the copy data to apply the effect as usual
        const journeysCopySetter = (newJourneys) => {journeysCopy = newJourneys;} 
        const emissionsCopySetter = (newEmissions) => {emissionsCopy = newEmissions;} 

        //effect will mutate copies
        this.effect([journeysCopy, journeysCopySetter], [emissionsCopy, emissionsCopySetter]);

        //measure the change in the emissionsCopy
        return previousTotalCO2e - Effect.sumCO2e(emissionsCopy);
    }
}

//immutable set of policies and their effects
const POLICIES_BASE = 
[
    {
        name: "No domestic flights",
        effect: NO_EFFECT // will do something to the data
    },
    {
        name: "Economy-class flights",
        effect: NO_EFFECT
    },
    {
        name: "Replace all ICEs with EVs",
        effect: new SimpleEffect((jState, eState) => {
                //console.log("print");
                const [journeys, setJourneys] = jState;
                const [emissions, setEmissions] = eState;
                //Swap all ICE journeys with EVs
                //what bar # is ICEs? 
                let barNos = [];
                let barEVJourneys = -1;
                for(let i = 0; i < journeys.length; i++){
                    const name = journeys[i][0];
                    if(name === travelKind.petrolCar || name === travelKind.dieselCar){
                        barNos.push(i); //those bars representing ICEs
                    }
                    if(name === travelKind.electricCar){
                        barEVJourneys = i;
                    }
                }

                let newJourneys = Effect.copyBars(journeys); //a mutable copy of journeys
                console.log(journeys, newJourneys);

                barNos.map((i) => {
                    //add extra journeys to electricCars from diesel or petrol 
                    newJourneys[barEVJourneys][1] += newJourneys[i][1];
                    newJourneys[i][1] = 0;
                    return i;
                });
                //console.log(barNos, barEVs, newJourneys);

                //remove ICE emissions, scale EV emissions by extrapolation
                const factorEV = newJourneys[barEVJourneys][1] / journeys[barEVJourneys][1];
                let newEmissions = Effect.copyBars(emissions); //a mutable copy of emissions

                const [emissionsEVBar, emissionsPetrolBar, emissionsDieselBar] = Effect.searchBarsOnNames(emissions, travelKind.electricCar, travelKind.petrolCar, travelKind.dieselCar);
                console.log(emissionsEVBar, emissionsPetrolBar, emissionsDieselBar);
                console.log(newEmissions[emissionsEVBar][1], factorEV);
                const EVBar = newEmissions[emissionsEVBar];
                EVBar[1] = EVBar[1] * factorEV; //extrapolate the increase in ev journeys
                newEmissions[emissionsPetrolBar][1] = 0; //no longer emitters
                newEmissions[emissionsDieselBar][1] = 0; //no longer emitters
                console.log(newEmissions[emissionsEVBar][1]);

                //set state
                setJourneys(newJourneys);
                setEmissions(newEmissions);
            })
    },
    {
        name: "Train routes <300mi",
        effect: NO_EFFECT
    },
    {
        name: "Coach routes for <3hrs",
        effect: NO_EFFECT
    },
    {
        name: "Replace personal vehicles with taxis",
        effect: NO_EFFECT
    },
    {
        name: "Electric scooters forbidden",
        effect: NO_EFFECT
    },
    {
        name: "No personal ICE vehicles",
        effect: NO_EFFECT
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