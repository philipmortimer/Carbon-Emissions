import React, {useEffect, useState} from "react";
import { Button, Row, Col, Container } from 'react-bootstrap';

import { UploadButton } from '../../components/Upload/Upload.js';
import { PredictButton } from '../../components/SeePredictions/SeePredictions.js';
import { PromptSchemaCSV } from '../../components/Prompts/Prompts.js';

import "./Home.scss";

export const Home = (props) => {

    useEffect(() => {
        document.title = "Upload Travel Data | RouteZero"
    }, []);


    return(   
        <div className="centre-grid">
            <div className="custom-container">
                <h1>Want to know your potential carbon savings?</h1>
                <div className="csv-prompt">
                    <h3>Simply upload your travel expense or milage data as a CSV file</h3>
                    <PromptSchemaCSV className="homepage-csv-schema"/>
                </div>
                <div className="buttons">
                    <UploadButton setFile={props.setFile} validity={props.validity}/>
                    <PredictButton file={props.file} validity={props.validity} setValidity={props.setValidity} setResponse={props.setResponse}/>
                </div>
            </div>
        </div>    
    );
}