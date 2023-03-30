import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

//components
import "./View.scss";
import {BarChart} from "../../components/Chart/Chart.js";
import {PolicySelector} from "../../components/Policy/PolicySelector.js";
import HelpButton from '../../components/HelpButtons/ViewHelpButton.js'
import {DownloadGraphs} from '../../components/DownloadGraphs/DownloadGraphs'

//helpers
import {journeyBars, emissionBarsBefore, emissionBarsAfter, predictJourneyBars} from "../../helpers/chart.js";

//data
import {getPolicies} from "../../data/policies.js";

export const View = (props) => {
    // ID's used for each chart
    const beforeJourneyId = "1";
    const currentEmissionId = "2";
    const currentJourneyId = "3";
    const predictEmissionsId = "4";

    // PairArray<BarName, Number>
    const [beforeJourneys, setBeforeJourneys] = useState([]);
    const [beforeEmissions, setBeforeEmissions] = useState([]);
    const [predictJourneys, setPredictJourneys] = useState([]);
    const [predictEmissions, setPredictEmissions] = useState([]);

    const [originalPredict, setOriginalPredict] = useState({});

    const [policies, setPolicies] = useState([]);
    // const [savedCO2e, setSavedCO2e] = useState([]); //array of numbers (in Kt)

    //console.log(policies);

    const resetGraphs = () => {
        if(props.file !== null && props.file !== undefined && predictJourneys.length === 0) {

            journeyBars(props.file)
                .then((pairs) => {
                    setBeforeJourneys(pairs);
                });

                emissionBarsBefore(props.file, props.response)
                .then((pairs) => {
                    setBeforeEmissions(pairs);
                });

            setPredictJourneys(predictJourneyBars(props.response));

            emissionBarsAfter(props.file, props.response)
            .then((pairs) => { 
                setPredictEmissions(pairs)
                return pairs;
             })
            .then((pairs) => {
                //final setup
                setOriginalPredict({
                    journeys: predictJourneyBars(props.response),
                    emissions: pairs
                });
                setPolicies(getPolicies());
            });
        }
    }

    useEffect(() => {
        document.title = "Graphs | RouteZero"

        resetGraphs();

    }, [props.setFile, props.file, props.response]);

    return(<>
            {props.file === undefined || props.file === null
                ?
                <div className="middle-grid">
                    <h1>Error</h1>
                    <h3>Could not display predictions</h3>
                    <p>There was an error displaying your predictions. Your data is not loaded, please <Link to="/">provide a CSV</Link></p>
                </div>
                :
                <div className="center-grid">
                    <div className="outer">
                        <div className="cell">
                            {/*PolicySelector asks for all prediction data as that is what it is modifying based on policy choices*/}
                            <PolicySelector
                                policies={policies}
                                setPolicies={setPolicies}
                                journeysState={[predictJourneys, setPredictJourneys]}
                                emissionsState={[predictEmissions, setPredictEmissions]}
                                originalPredict={originalPredict}/>
                            { // savedCO2e={savedCO2e}
                                // setSavedCO2e={setSavedCO2e}/>
                            }

                        </div>

                        <div className="cell">
                            <div className="inline">
                                <h1>Visualisation</h1>
                                <HelpButton/>
                                <DownloadGraphs beforeJourneyId={beforeJourneyId} currentEmissionId={currentEmissionId} 
                                    currentJourneyId={currentJourneyId} predictEmissionsId={predictEmissionsId}/>
                            </div>
                            
                            <div className="center-grid2">
                        
                                <div className="inner">
                            
                                    <div className="cell">
                                        <h2>Before</h2>
                                        <div className="Chart">
                                            <BarChart chartId={beforeJourneyId} header="Journeys" bars={beforeJourneys}/>
                                        </div>
                                        <div className="Chart">
                                            <BarChart chartId={currentEmissionId} header="Current Emissions (KgCO2)" bars={beforeEmissions}/>
                                        </div>
                                    </div>
                                    <div className="cell">
                                        <h2>After</h2>
                                        <div className="Chart">
                                            <BarChart chartId={currentJourneyId} header="Average Predicted Journeys" bars={predictJourneys}/>
                                        </div>
                                        <div className="Chart">
                                            <BarChart chartId={predictEmissionsId} header="Predicted Emissions (KgCO2)" bars={predictEmissions}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}