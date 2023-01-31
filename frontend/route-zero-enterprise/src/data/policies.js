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

//immutable set of policies and their effects
const POLICIES_BASE = 
[
    {
        name: "No domestic flights",
        effect: () => {}, // will do something to the data
    },
    {
        name: "Economy-class flights",
        effect: () => {}
    },
    {
        name: "EV hire, instead of ICE",
        effect: () => {}
    },
    {
        name: "Train routes <300mi",
        effect: () => {}
    },
    {
        name: "Coach routes for <3hrs",
        effect: () => {}
    },
    {
        name: "Prefer EV taxis",
        effect: () => {}
    },
    {
        name: "Electric scooters allowed",
        effect: () => {}
    },
    {
        name: "No personal ICE vehicles",
        effect: () => {}
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