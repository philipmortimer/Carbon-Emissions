import React, {useEffect} from "react";
import {Container} from "react-bootstrap";

import "./Graph.scss";

export const Graph = () => {

    useEffect(() => {
        document.title = "Graphs | RouteZero"
    }, []);
    
    return(
        <h1>Visualisation</h1>
    )
}