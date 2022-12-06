import React, {useEffect} from "react";
//import {Container} from "react-bootstrap";

//import {readText} from '../../helpers/file_reader.js';
//import {JourneysChart} from '../../components/Chart/JourneysChart.js';
//import {EmissionsChart} from '../../components/Chart/EmmissionsChart.js';

import "./View.scss";
import {JourneysChart2} from "../../components/Chart/JourneysChart2.js";
import {EmissionsChart2} from "../../components/Chart/EmissionsChart2";

export const View = (props) => {

    useEffect(() => {
        document.title = "Graphs | RouteZero"
    }, []);
    
    return(<>
            <h1>Visualisation</h1>
            <p>{JSON.stringify(props.response)}</p>
            <div className="center-grid">
                <div className="cell">
                    <h2 id='h2'>Before</h2>
                    <div className="Chart">
                        <JourneysChart2 chartId="1"/>
                    </div>
                    <div className="Chart">
                        <EmissionsChart2 chartId="2"/>
                    </div>
                </div>
                <div className="cell">
                    <h2 id='h2'>After</h2>
                    <div className="Chart">
                        <JourneysChart2 chartId="3"/>
                    </div>
                    <div className="Chart">
                        <EmissionsChart2 chartId="4"/>
                    </div>
                </div>
            </div>

        </>
    )
}