import React, { useEffect, useState, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
// custom components
import { Button } from 'react-bootstrap'
// helpers
import { fetchPOST } from '../../helpers/fetch.js'
// data
import { exposedEndpoints } from '../../data/backend.js'
// style
import './SeePredictions.scss'
import { InvalidFileModal } from '../InvalidFileModal/InvalidFileModal.js'

import {fileTypeAndValidation} from '../../helpers/file.js'


function checkValidity (state, action) {
  // TODO: Note this code here causes a console warning. This needs to be fixed in future!
  if (action.f !== null) {
    if (!fileTypeAndValidation(action.f.name).isValidFile) { 
      action.setV('invalid_extension')
    } else {
      action.setV('valid')
    }
  } else {
    action.setV('no_file')
  }
  return {}
}

export const PredictButton = (props) => {
  
  
  const [, dispatch] = useReducer(checkValidity, {}) // react needs to know that we arent changing the checkValidity function

  const [modalErrorTxt, setModalErrorTxt] = useState('') // Text to show in modal
  const [showModal, setShowModal] = useState(false) // Indicates whether modal should be shown

  const navigate = useNavigate()

  const getSuggestion = (validity) => {
    if (validity === 'valid') {
      return 'CSV or JSON file selected'
    } else if (validity === 'invalid_extension') {
      return 'You must select either a CSV or a JSON file'
    } else if (validity === 'invalid_by_backend_determination') {
      return 'You must select a correctly formatted file'
    } else { // In this case validty = "no_file"
      return 'Please select a file'
    }
  }

  const loadThenPost = () => {
    props.setLoading('loading')
    props.file
      .text()
      .then((text) => fetchPOST(`${exposedEndpoints.ip}:${exposedEndpoints.port}${exposedEndpoints.endpoint}`, text))
      .then((response) => {
        const json = response.data
        const err = response.error
        if (err !== undefined) {
          // Handles error coming from fetchPOST request (e.g. wifi issues or backend down etc)
          alert('An unexpected communication error occurred. Please try again.' +
                '\nError details:\n' + err)
          props.setLoading('loaded')
        } else if (json.error !== undefined) {
          // Handles case where backend has returned an error message (e.g. invalid CSV file provided)
          props.setValidity('invalid_by_backend_determination')
          setModalErrorTxt(json.error)
          setShowModal(true)
          props.setLoading('loaded')
        } else {
          // Loads view after receiving response from backend (no errors)
          props.setResponse(json)
          props.setLoading('loaded')
          navigate('/view')
        }
      })
  }

  useEffect(() => {
    dispatch({ f: props.file, setV: props.setValidity}) // dubiously important console warning in exchange for removing a compilation warning, bring this up in discussion for more information
  }, [props.file, props.setValidity]) // refreshes on updates to props['file']

  return (
    <span className="flex-row predict-pair">
      {
        props.validity === 'valid' && props.loading === 'loaded'
        ? <Button id="predict-button" onClick={loadThenPost}>See predictions</Button>
        : <Button id="predict-button-disabled" disabled>See predictions</Button>
      }
      <p className='suggestion'>{getSuggestion(props.validity)}</p>
      <InvalidFileModal show={showModal} onHide={() => { setModalErrorTxt(''); setShowModal(false) }} msg={modalErrorTxt} />
    </span>
  )
}
