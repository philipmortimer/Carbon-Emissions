import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

export const PromptSchemaCSV = (props) => {
  
  const navigate = useNavigate();

  const navigateToCSVSchema = () =>{
    navigate('/CSVschema');
  };

  return (
    <Button className="homepage-csv-schema-button" variant='primary' onClick={navigateToCSVSchema}>
      <span className="homepage-csv-schema-button-inner-text">CSV Schema</span>
    </Button>
  )
}

export const PromptSchemaJSON = (props) => {
  
  const navigate = useNavigate();

  const navigateToJSONSchema = () =>{
    navigate('/JSONschema');
  };

  return (
    <div className={`${props.className}`}>
      <Button className={`${props.className}-button`} variant='primary' onClick={navigateToJSONSchema}>
        JSON Schema
      </Button>

      
    </div>
  )
}
