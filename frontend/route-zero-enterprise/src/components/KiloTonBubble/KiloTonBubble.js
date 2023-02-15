import React /*, {useEffect, useState}*/ from "react";

export const KiloTonBubble = ({policyOption, journeysState, emissionsState}) => {

    //unpack our tuples of state and setter
    const [journeys, setJourneys] = journeysState;
    const [emissions, setEmissions] = emissionsState;

        //takes a policy option and returns the change in CO2e that it has on the data
    //this needs to be computed at selection-time, since it may depend on what policies are already selected 
    const getCO2eSaved = (policyOption) => {
        return 100;
    }

    return (
        <div className="aligner">
            <span className={`${policyOption.selected}`}>{getCO2eSaved(policyOption)}Kt</span>
        </div>
    );
}