import React, { useEffect } from 'react'

import { UploadButton } from '../../components/Upload/Upload.js'
import { PredictButton } from '../../components/SeePredictions/SeePredictions.js'
import { PromptSchemaCSV } from '../../components/Prompts/Prompts.js'
import { ProgressBar } from '../../components/ProgressBar/ProgressBar.js'

import './Home.scss'
import HelpButton from '../../components/HelpButtons/UploadHelpButton.js'


export const Home = (props) => {

    useEffect(() => {
        document.title = "Upload Travel Data | RouteZero"
    }, []);
    

    return(   
        <div className="middle-grid">
            <div className="custom-container">
                <h1>Do you want to know your potential carbon savings?</h1>
                <div className="help">
                    <h3>Simply upload your travel expense or milage data as a CSV file</h3>
                </div>
                <div className="buttons">
                    <UploadButton file={props.file} setFile={props.setFile} validity={props.validity}/>
                    <PromptSchemaCSV className="homepage-csv-schema"/>
                    <HelpButton/>
                    <PredictButton id="predict-button" file={props.file} validity={props.validity} setValidity={props.setValidity} setResponse={props.setResponse} loading={props.loading} setLoading={props.setLoading}/>
                </div>
            </div>
            <div className="progress-bar">
                    <ProgressBar loading={props.loading}/>
            </div>
        </div>    
    );
}
