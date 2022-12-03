import React, {useEffect} from "react";
import {Container} from "react-bootstrap";

import {readText} from '../../helpers/file_reader.js';
import {JourneysChart} from '../../components/Chart/JourneysChart.js';
import {EmissionsChart} from '../../components/Chart/EmmissionsChart.js';

import "./View.scss";

export const View = (props) => {

    useEffect(() => {
        document.title = "Graphs | RouteZero"
    }, []);
    
    return(<>
            <h1>Visualisation</h1>
            <p>{JSON.stringify(props.response)}</p>
            <div className="center-grid">
                <div className="cell">
                    <h2>Before</h2>
                    <div className="Chart">
                        <JourneysChart/>
                    </div>
                    <div className="Chart">
                        <EmissionsChart/>
                    </div>
                </div>
                <div className="cell">
                    <h2>After</h2>
                    <div className="Chart">
                        <JourneysChart/>
                    </div>
                    <div className="Chart">
                        <EmissionsChart/>
                    </div>
                </div>
            </div>

        </>
    )
}