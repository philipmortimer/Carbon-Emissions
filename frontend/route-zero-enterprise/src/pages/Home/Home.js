import React, { useEffect } from 'react'

import { UploadButton } from '../../components/Upload/Upload.js'
import { PredictButton } from '../../components/SeePredictions/SeePredictions.js'
import { PromptSchemaCSV } from '../../components/Prompts/Prompts.js'

import './Home.scss'
import Modal from './components/Modal/Modal'

export const Home = (props) => {
  useEffect(() => {
    document.title = 'Upload Travel Data | RouteZero'
  }, [])

    useEffect(() => {
        document.title = "Upload Travel Data | RouteZero"
    }, []);


    return(   
        <div className="middle-grid">
            <div className="custom-container">
                <h1>Do you want to know your potential carbon savings?</h1>
                <div className="csv-prompt">
                    <h3>Simply upload your travel expense or milage data as a CSV file</h3>
                    <PromptSchemaCSV className="homepage-csv-schema"/>
                </div>
                <div className="buttons">
                    <UploadButton file={props.file} setFile={props.setFile} validity={props.validity}/>
                    <PredictButton file={props.file} validity={props.validity} setValidity={props.setValidity} setResponse={props.setResponse}/>
                </div>
                <>
                    <Modal />
                </>
            </div>
        </div>    
    );
}
