import React, {useEffect} from "react";
import {Container} from "react-bootstrap";

import "./Graph.scss";

export const Graph = () => {

    useEffect(() => {
        document.title = "Upload Climate Data | RouteZero"
    });
    
    return(
        <h1>Visualisation</h1>
    )
}