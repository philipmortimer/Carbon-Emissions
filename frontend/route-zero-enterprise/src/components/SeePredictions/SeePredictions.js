import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
//custom components
import { Button } from 'react-bootstrap';
//helpers
import {fetchPOST} from '../../helpers/fetch.js';
import {readText} from '../../helpers/file_reader.js';
//data
import {params} from '../../data/backend.js';
//style
import "./SeePredictions.scss";

export const PredictButton = (props) => {

    // const [validity, setValidity] = useState("no_file"); //no upload
    const [loading, setLoading] = useState("loaded");
    const navigate = useNavigate();

    const checkValidity = () => {
        if(props['file'] !== null){
            if(props['file'].name.split('.')[1] !== 'csv'){
                props['setValidity']("invalid_extension");
            }else{
                props['setValidity']("valid");
            }
        }else{
            props['setValidity']("no_file");
        }
    }

    const getSuggestion = (validity) => {
        return validity === "valid" ?
            "CSV file selected"
        : validity === "invalid_extension" ?
            "You must select a CSV file"
        : "Please select a file"
    }   

    const loadThenPost = () => {
        setLoading("loading")
        readText(props['file'], async (e) => { 
            fetchPOST(`http://${params.ip}:${params.port}${params.endpoint}`, e.target.result)
            .then((data) => { 
                //once we load in with the data we redirect to the view page 
                props.setResponse(data);
                setLoading("loaded");
                navigate("/view");
            });
        });
    }

    useEffect(() => {
        checkValidity();
    }, [props['file']]) //refreshes on updates to props['file']

    return(
        <>
            {(props['validity'] === 'valid' && loading === "loaded") ? <Button onClick={loadThenPost}>See predictions</Button> : <Button disabled>See predictions</Button>}
            <p className="suggestion">{getSuggestion(props['validity'])}</p>
        </>
    )
}