import React, {useEffect, useState} from "react";
import { Button } from 'react-bootstrap';

import "./SeePredictions.scss";

export const PredictButton = (props) => {

    // const [validity, setValidity] = useState("no_file"); //no upload

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

    useEffect(() => {
        checkValidity();
    }, [props['file']]) //refreshes on updates to props['file']

    return(
        <>
            {props['validity'] === 'valid' ? <Button>See predictions</Button> : <Button disabled>See predictions</Button>}
            <p className="suggestion">{getSuggestion(props['validity'])}</p>
        </>
    )
}