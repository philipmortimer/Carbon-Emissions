import React, {useEffect, useState} from "react";

import "./View.scss";
import {BarChart} from "../../components/Chart/Chart.js";

//helpers
import {journeyBars, emissionBars, predictJourneyBars} from "../../helpers/chart.js";


export const View = (props) => {

    const [beforeJourneys, setBeforeJourneys] = useState([]); //array of pairs
    const [beforeEmissions, setBeforeEmissions] = useState([]);
    const [predictJourneys, setPredictJourneys] = useState([]);
    const [predictEmissions, setPredictEmissions] = useState([]);

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
    }, [props.setFile]);
    
    return(<>
            <h1>Visualisation</h1>
            {/* <p>{JSON.stringify(props.response)}</p> */}
            <div className="center-grid">
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

        </>
    )
}