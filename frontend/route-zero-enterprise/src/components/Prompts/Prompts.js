import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

export const PromptSchemaCSV = (props) => {
  
  const navigate = useNavigate();

  const navigateToCSVSchema = () =>{
    navigate('/schema');
  };

  return (
    <Button className="homepage-csv-schema-button" variant='primary' onClick={navigateToCSVSchema}>
      <span className="homepage-csv-schema-button-inner-text">CSV Schema</span>
    </Button>
  )
}
