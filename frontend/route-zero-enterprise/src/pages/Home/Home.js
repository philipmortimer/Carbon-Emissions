import React, {useEffect, useState} from "react";
import { Button, Row, Col, Container } from 'react-bootstrap';

import { UploadButton } from '../../components/Upload/Upload.js';
import { PredictButton } from '../../components/SeePredictions/SeePredictions.js';

import "./Home.scss";

export const Home = () => {

    //hoisted from button components to share between them
    const [file, setFile] = useState(null); //current file
    const [validity, setValidity] = useState("no_file"); //no upload


    useEffect(() => {
        document.title = "Upload Travel Data | RouteZero"
    }, []);


    return(   
        <div className="centre-grid">
            <div className="custom-container">
                <h1>Want to know your potential carbon savings?</h1>
                <h3>Simply upload your travel expense or milage data as a CSV file</h3>
                <div className="buttons">
                    <UploadButton setFile={setFile} validity={validity}/>
                    <PredictButton file={file} validity={validity} setValidity={setValidity}/>
                </div>
            </div>
        </div>    
    );
}