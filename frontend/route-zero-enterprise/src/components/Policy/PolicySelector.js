import React /**/, {useEffect}/*, useState}*/ from "react";
// import {KiloTonBubble} from "../KiloTonBubble/KiloTonBubble.js";
import {PolicyOption} from "./PolicyOption.js";

// ID used for component
export const policySelectorId = 'policySelector';

export const PolicySelector = ({policies, setPolicies, journeysState, emissionsState, originalPredict}) => {

    return(
        <>
            <div className="list-group policy">

                <div id={policySelectorId}>
                    {policies.map((policyOption, i) => {
                        return <PolicyOption 
                        policyOption={policyOption} 
                        ID={i} 
                        policies={policies} 
                        setPolicies={setPolicies} 
                        journeys={journeysState[0]} 
                        setJourneys={journeysState[1]} 
                        emissions={emissionsState[0]} 
                        setEmissions={emissionsState[1]}
                        originalPredict={originalPredict}
                        key={i}
                        />
                    })}
                </div>

            </div>  
        </>
    );
}