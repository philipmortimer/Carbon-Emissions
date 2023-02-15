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
    }

    //Overridden as needed
    apply(){}

    getCO2eSaved(){}

    sumCO2e(emissions){
        //                     num, pair  number
        return emissions.reduce((x, y) => x + y[1], 0);
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
        this.effect(journeysState, emissionsState);
    }

    //Returns the change in emissions a simple effect gives
    getCO2eSaved(journeysState, emissionsState){
        //Unpacking just the data and not the setter makes this function inherently safer
        const journeysCopy = [...journeysState[0]];
        const emissionsCopy = [...emissionsState[0]];

        const previousTotalCO2e = this.sumCO2e(emissionsCopy);

        //Create setters for the copy data to apply the effect as usual
        const journeysCopySetter = (newJourneys) => {journeysCopy = newJourneys;} 
        const emissionsCopySetter = (newEmissions) => {emissionsCopy = newEmissions;} 

        //effect will mutate copies
        this.effect([journeysCopy, journeysCopySetter], [emissionsCopy, emissionsCopySetter]);

        //measure the change in the emissionsCopy
        return previousTotalCO2e - this.sumCO2e(emissionsCopy);
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
        effect:
            new SimpleEffect((jState, eState) => {
                const [j, setJ] = jState;
                const [e, setE] = eState;
                //Swap all ICE journeys with EVs
                //what bar # is ICEs? 
                j.map((journey, i) => {
                    
                })

                //remove ICE emissions, scale EV emissions by extrapolation
                
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