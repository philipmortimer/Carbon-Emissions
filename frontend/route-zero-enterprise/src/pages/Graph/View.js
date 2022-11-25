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
            <div>
                <Chart/>
                <Chart/>
                <Chart/>
                <Chart/>
            </div>

        </>
    )
}