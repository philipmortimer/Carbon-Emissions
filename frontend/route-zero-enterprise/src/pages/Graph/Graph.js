import React, {useEffect} from "react";
import {Container} from "react-bootstrap";

export const Graph = () => {

    useEffect(() => {
        document.title = "Upload Climate Data | RouteZero"
    });
    
    return(
        <Container>
            <h1>Visualisation</h1>
        </Container>
    )
}