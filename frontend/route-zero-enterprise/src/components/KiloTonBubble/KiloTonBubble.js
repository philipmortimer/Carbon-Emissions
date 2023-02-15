import React , {useEffect, useState} from "react";

export const KiloTonBubble = ({setPolicies, policyOption, journeysState, emissionsState, savedCO2e}) => {

    //unpack our tuples of state and setter
    const [journeys, setJourneys] = journeysState;
    const [emissions, setEmissions] = emissionsState;

    return (
        <div className="aligner">
            <span className={`${policyOption.selected}`}>{Math.round(savedCO2e * 100)/100}Kt</span>
        </div>
    );
}