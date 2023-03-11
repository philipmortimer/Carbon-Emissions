import React /**/, {useEffect}/*, useState}*/ from "react";
// import {KiloTonBubble} from "../KiloTonBubble/KiloTonBubble.js";
import {PolicyOption} from "./PolicyOption.js";

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

    // const applyPolicies = () => {

    //     policies.map(p => {
    //         if(p.selected){
    //             p.effect.apply(journeysState, emissionsState);
    //             console.log(p.name);
    //         }
    //     });
    // }

    // const refreshSavings = () => {
    //     const newSavedCO2e = policies.map((p, i) => 
    //         p.selected 
    //         ? savedCO2e[i] //if we select a policy, that locks in the carbon savings. Adding up selected policies gives our total savings
    //         : p.effect.getCO2eSaved(journeysState, emissionsState));
    //     setSavedCO2e(newSavedCO2e);
    // }

    // useEffect(() => {
    //     refreshSavings();

    // }, [policies]);

    //toggles a policy option based on its index in policies
    // const togglePolicy = (index) => {
    //     setPolicies(policies.map((x, i) => {
    //         if(i === index){
    //             x.selected = !x.selected;
    //         }
    //         return x;
    //     }));
    // }

    // //takes a policy option (json of three fields)
    // //gives a bootsrap checkbox
    // const checkboxElem = (policyOption, i) => {
    //     return (
    //         <label key={i} className="list-group-item">
    //             <input className="form-check-input me-1" type="checkbox" value="" onClick={() => {
    //                 togglePolicy(i); 
    //                 applyPolicies();
    //                 // if(policyOption.selected) {
    //                 //     policyOption.effect.apply(journeysState, emissionsState);
    //                 // }else{
    //                 //     policyOption.effect.revert(journeysState, emissionsState);
    //                 // }
    //             }}/>
    //             <p>{policyOption.name}</p>
    //             <KiloTonBubble setPolicies={setPolicies} policyOption={policyOption} journeysState={journeysState} emissionsState={emissionsState} savedCO2e={savedCO2e[i]}/>
    //         </label>
    //     )

    // }

    return(
        <>
        { policies === undefined || setPolicies === undefined 
        ? <em>Error: Please provide policies and setter. </em>
        : 
        (
            <div className="list-group policy">
                {policies.map((policyOption, i) => {
                    return <PolicyOption 
                    policyOption={policyOption} 
                    key={i} policies={policies} 
                    setPolicies={setPolicies} 
                    journeys={journeysState[0]} 
                    setJourneys={journeysState[1]} 
                    emissions={emissionsState[0]} 
                    setEmissions={emissionsState[1]}
                    />
                })}
            </div> 
        )
        }  
        </>
    );
}