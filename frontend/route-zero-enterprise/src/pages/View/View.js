import React, {useEffect, useState} from "react";

//components
import "./View.scss";
import {BarChart} from "../../components/Chart/Chart.js";
import {PolicySelector} from "../../components/Policy/Policy.js";

//helpers
import {journeyBars, emissionBars, predictJourneyBars} from "../../helpers/chart.js";

//data
import {getPolicies} from "../../data/policies.js";

export const View = (props) => {

    const [beforeJourneys, setBeforeJourneys] = useState([]); //array of pairs
    const [beforeEmissions, setBeforeEmissions] = useState([]);
    const [predictJourneys, setPredictJourneys] = useState([]);
    const [predictEmissions, setPredictEmissions] = useState([]);

    const [policies, setPolicies] = useState(getPolicies());

    //console.log(policies);

    useEffect(() => {
        document.title = "Graphs | RouteZero"
        if(props.file !== null) {

            journeyBars(props.file)
            .then((pairs) => {
                setBeforeJourneys(pairs);
            });

            emissionBars(props.file, props.response, "currentCarbonKgCo2e")
            .then((pairs) => {
                setBeforeEmissions(pairs);
            });

            setPredictJourneys(predictJourneyBars(props.response));

            emissionBars(props.file, props.response, "newCarbonKgCo2e")
            .then((pairs) => {
                setPredictEmissions(pairs);
            })
        }
    }, [props.setFile, props.file, props.response]);
    
    return(<>
            {/* <p>{JSON.stringify(props.response)}</p> */}
            <div className="center-grid">
                <div className="outer">
                <div className="cell">
                    {/*PolicySelector asks for all prediction data as that is what it is modifying based on policy choices*/}
                    <PolicySelector policies={policies} setPolicies={setPolicies} predictJourneysState={[predictJourneys, setPredictJourneys]} predictEmissionsState={[predictEmissions, setPredictEmissions]}/>
                </div>
                <div className="cell">
                    <h1>Visualisation</h1>
                    <div className="center-grid">
                        <div className="inner">
                        <div className="cell">
                            <h2>Before</h2>
                            <div className="Chart">
                                <BarChart chartId="1" header="Journeys" bars={beforeJourneys}/>
                            </div>
                            <div className="Chart">
                                <BarChart chartId="2" header="Current Emissions (KgCO2)" bars={beforeEmissions}/>
                            </div>
                        </div>
                        <div className="cell">
                            <h2>After</h2>
                            <div className="Chart">
                                <BarChart chartId="3" header="Average Predicted Journeys" bars={predictJourneys}/>
                            </div>
                            <div className="Chart">
                                <BarChart chartId="4" header="Predicted Emissions (KgCO2)" bars={predictEmissions}/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

        </>
    )
}