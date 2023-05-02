import React, { useEffect } from 'react'

import { UploadButton } from '../../components/Upload/Upload.js'
import { PredictButton } from '../../components/SeePredictions/SeePredictions.js'
import { PromptSchemaCSV } from '../../components/Prompts/Prompts.js'
import { PromptSchemaJSON } from '../../components/Prompts/Prompts.js'
import { ProgressBar } from '../../components/ProgressBar/ProgressBar.js'

import './Home.scss'
import HelpButton from '../../components/HelpButtons/UploadHelpButton.js'

/** @function Home
 * 
 * @desc Produces the landing page for our website
 * 
 * @param {Object} props - File-upload and some prediction loading properties 
 * @param {Object} props.file - The current file object
 * @param {setFile} props.setFile 
 * @param {string} props.validity - State of the current file as a string
 * @param {setValidity} props.setValidity 
 * @param {setResponse} props.setResponse 
 * @param {string} props.loading - State of loading predictions
 * @param {setLoading} props.setLoading 
 * @returns {JSX.Element} Homepage
 * 
 */


export const Home = (props) => {

    useEffect(() => {
        document.title = "Upload Travel Data | RouteZero"
    }, []);
    

    return(   
        <div className="middle-grid">
            <div className="custom-container">
                <h1>Do you want to know your potential carbon savings?</h1>
                <div className="help">
                    <h4>Simply upload your travel expense or milage data as a CSV or JSON file</h4>
                </div>
                <div className="buttons">
                    <UploadButton file={props.file} setFile={props.setFile} validity={props.validity} setResponse={props.setResponse}/>
                    <PromptSchemaCSV className="homepage-csv-schema"/>
                    <PromptSchemaJSON className="homepage-json-schema"/>
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
