import React from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

export const PromptSchemaCSV = (props) => {
  
  const navigate = useNavigate();

  const navigateToCSVSchema = () =>{
    navigate('/CSVschema');
  };

  return (
    <Button id="homepage-csv-schema-button" onClick={navigateToCSVSchema}>
      <span id="homepage-csv-schema-button-inner-text">CSV Schema</span>
    </Button>
  )
}

export const PromptSchemaJSON = (props) => {
  
  const navigate = useNavigate();

  const navigateToJSONSchema = () =>{
    navigate('/JSONschema');
  };

  return (
      <Button id="homepage-json-schema-button" onClick={navigateToJSONSchema}>
        <span>JSON Schema</span>
      </Button>
  )
}
