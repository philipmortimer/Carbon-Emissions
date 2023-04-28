import React, {useState, useEffect} from "react";

export const PolicyOption = ({
    policyOption, //
    ID,
    policies,
    setPolicies,
    journeys,
    setJourneys,
    emissions,
    setEmissions,
    originalPredict
}) => {

    //CO2e saved
    const [saved, setSaved] = useState(0);

    useEffect(() => {
        if(!policyOption.selected){
            
            setSaved(policyOption.effect.getCO2eSaved(
                [journeys, setJourneys],
                [emissions, setEmissions]
            ));
        }
    }, [policies, setEmissions, policyOption.effect, policyOption.selected, emissions, journeys, setJourneys]);

    const togglePolicy = () => {
        setPolicies(policies.map((p, i) => {
            if(i === ID){
                p.selected = !p.selected;
            }
            return p;
        }));
    }

    const applyAllEffects = () => {
        setJourneys(JSON.parse(JSON.stringify(originalPredict.journeys)));
        setEmissions(JSON.parse(JSON.stringify(originalPredict.emissions)));
        // // console.log(originalPredict);

        let journeysAccumulator = JSON.parse(JSON.stringify(originalPredict.journeys));
        let emissionsAccumulator = JSON.parse(JSON.stringify(originalPredict.emissions));
        const setJourneysAccumulator = (jAcc) => { journeysAccumulator = jAcc; } 
        const setEmissionsAccumulator = (eAcc) => { emissionsAccumulator = eAcc; }
        let jAccState = [journeysAccumulator, setJourneysAccumulator];
        let eAccState = [emissionsAccumulator, setEmissionsAccumulator];

        for(let i = 0; i < policies.length; i++){
            const p = policies[i];
            if(p.selected){
                p.effect.applyEffect(jAccState, eAccState);
                jAccState[0] = journeysAccumulator;
                eAccState[0] = emissionsAccumulator;
            }
        }

        setJourneys(journeysAccumulator);
        setEmissions(emissionsAccumulator);
    }

    return (
        <label key={ID} className="list-group-item">
            <input className="form-check-input me-1" type="checkbox" value="" onClick={() => {
                togglePolicy(); 
                applyAllEffects();
            }}/>
            <p>{policyOption.name}</p>
            <div className="aligner">
                <span className={`${policyOption.selected}`}>{Math.round(saved * 100)/100}Kt</span>
            </div>
        </label>
    )
}