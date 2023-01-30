import React /*, {useEffect, useState}*/ from "react";

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
export const PolicySelector = ({policies, setPolicies}) => {

    //toggles a policy option based on its index in policies
    const togglePolicy = (index) => {
        setPolicies(policies.map((x, i) => {
            if(i === index){
                x.selected = !x.selected;
            }
            return x;
        }));
    }

    const getCO2eSaved = (policyOption) => {
        return 0;
    }

    //takes a policy option (json of three fields)
    //gives a bootsrap checkbox
    const checkboxElem = (policyOption, i) => {
        return (
            <label className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" value="" onClick={() => {togglePolicy(i); policyOption.effect();}}/>
                {policyOption.name}
                <div className="aligner">
                    <span className={`${policyOption.selected}`}>{getCO2eSaved(policyOption)}Kt</span>
                </div>
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