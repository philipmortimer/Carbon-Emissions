import React, {useEffect} from "react";
import {Container} from "react-bootstrap";

import {readText} from '../../helpers/file_reader.js';
import {Chart} from '../../components/Chart/Chart.js';

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
                        <Chart/>
                    </div>
                    <div className="Chart">
                        <Chart/>
                    </div>
                </div>
                <div className="cell">
                    <h2>After</h2>
                    <div className="Chart">
                        <Chart/>
                    </div>
                    <div className="Chart">
                        <Chart/>
                    </div>
                </div>
            </div>

        </>
    )
}