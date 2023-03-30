import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

export const PromptSchemaCSV = (props) => {
  
  const navigate = useNavigate();

  const navigateToCSVSchema = () =>{
    navigate('/CSVschema');
  };

  return (
    <div className={`${props.className}`}>
      <Button className={`${props.className}-button`} variant='primary' onClick={navigateToCSVSchema}>
        CSV Schema
      </Button>

      
    </div>
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
