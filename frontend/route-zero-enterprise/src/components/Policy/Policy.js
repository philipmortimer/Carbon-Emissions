import React /**/, {useEffect}/*, useState}*/ from "react";
import {KiloTonBubble} from "../KiloTonBubble/KiloTonBubble.js";

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
export const PolicySelector = ({policies, setPolicies, journeysState, emissionsState, savedCO2e, setSavedCO2e}) => {

    useEffect(() => {
        
    }, [setPolicies]);

    //toggles a policy option based on its index in policies
    const togglePolicy = (index) => {
        setPolicies(policies.map((x, i) => {
            if(i === index){
                x.selected = !x.selected;
            }
            return x;
        }));
    }

    //takes a policy option (json of three fields)
    //gives a bootsrap checkbox
    const checkboxElem = (policyOption, i) => {
        return (
            <label key={i} className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" onClick={() => {
                    togglePolicy(i); 
                    // policyOption.effect.apply(journeysState, emissionsState); //mutates 'After' data
                    if(policyOption.selected) {
                        policyOption.effect.apply(journeysState, emissionsState);
                    }else{
                        policyOption.effect.revert(journeysState, emissionsState);
                    }
                }}/>
                {policyOption.name}
                <KiloTonBubble setPolicies={setPolicies} policyOption={policyOption} journeysState={journeysState} emissionsState={emissionsState} savedCO2e={savedCO2e[i]}/>
            </label>
        )
    }

    return(
        <>
        { policies === undefined || setPolicies === undefined 
        ? <em>Error: Please provide policies and setter. </em>
        : 
        (
            <div className="list-group policy">
                {policies.map((policyOption, i) => {
                    return checkboxElem(policyOption, i);
                })}
            </div> 
        )
        }  
        </>
    );
}