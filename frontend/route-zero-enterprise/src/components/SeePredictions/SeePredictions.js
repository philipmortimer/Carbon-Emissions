import React, {useEffect, useState, useReducer} from "react";
import { useNavigate } from 'react-router-dom';
//custom components
import { Button } from 'react-bootstrap';
//helpers
import {fetchPOST} from '../../helpers/fetch.js';
//data
import {exposedEndpoints} from '../../data/backend.js';
//style
import "./SeePredictions.scss";

function checkValidity(state, action){
    console.log("DISPATCHED!!!baybee");
    
    if(action.f !== null){
        if(action.f.name.split('.')[1] !== 'csv'){
            action.setV("invalid_extension");
        }else{
            action.setV("valid");
        }
    }else{
        action.setV("no_file");
    }
    return {};
}

export const PredictButton = (props) => {

    const [loading, setLoading] = useState("loaded");

    const [, dispatch] = useReducer(checkValidity, {}); // react needs to know that we arent changing the checkValidity function
    
    const navigate = useNavigate();
 
    const getSuggestion = (validity) => {
        return validity === "valid" ?
            "CSV file selected"
        : validity === "invalid_extension" ?
            "You must select a CSV file"
        : "Please select a file"
    }   

    const loadThenPost = () => {
        setLoading("loading")
        props['file']
        .text()
        .then((text) => fetchPOST(`${exposedEndpoints.ip}:${exposedEndpoints.port}${exposedEndpoints.endpoint}`, text))
        .then((json) => {
            props.setResponse(json);
            setLoading("loaded");
            navigate("/view");
        })
    }

    useEffect(() => {
        dispatch({f: props.file, setV: props.setValidity}); //dubiously important console warning in exchange for removing a compilation warning, bring this up in discussion for more information
    }, [props.file, props.setValidity]) //refreshes on updates to props['file']
    

    return(
        <>
            {(props['validity'] === 'valid' && loading === "loaded") ? <Button onClick={loadThenPost}>See predictions</Button> : <Button disabled>See predictions</Button>}
            <p className="suggestion">{getSuggestion(props['validity'])}</p>
        </>
    )
}