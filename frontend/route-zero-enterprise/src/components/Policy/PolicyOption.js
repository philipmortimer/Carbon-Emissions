import React, {useState, useEffect} from "react";

export const PolicyOption = ({
    policyOption, //
    key,
    policies,
    setPolicies,
    journeys,
    setJourneys,
    emissions,
    setEmissions,
}) => {

    //CO2e saved
    const [saved, setSaved] = useState(0);

    useEffect(() => {
        console.log("useEffect");
        if(!policyOption.selected){
            setSaved(policyOption.effect.getCO2eSaved(
                [journeys, setJourneys],
                [emissions, setEmissions]
            ));
        }
    }, [policies, setEmissions]);

    const togglePolicy = () => {
        setPolicies(policies.map((p, i) => {
            if(i === key){
                p.selected = !p.selected;
            }
            return p;
        }));
    }

    return (
        <label key={key} className="list-group-item">
            <input className="form-check-input me-1" type="checkbox" value="" onClick={() => {
                togglePolicy(); 
            }}/>
            <p>{policyOption.name}</p>
            <div className="aligner">
                <span className={`${policyOption.selected}`}>{Math.round(saved * 100)/100}Kt</span>
            </div>
        </label>
    )
}