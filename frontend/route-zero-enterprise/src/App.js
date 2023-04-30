import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { Home } from './pages/Home/Home.js'
import { View } from './pages/View/View.js'
import {CSVSchema} from './pages/Schemas/CSVSchema.js'
import {JSONSchema} from './pages/Schemas/JSONSchema.js'
import { Hero } from './components/Hero/Hero.js'
import { Content } from './components/Content/Content.js'

import './style.scss';

// import Button from 'react-bootstrap/Button';


/**
 * This callback is `setFile` and is used by pages for setting the uploaded file residing in App.js. 
 * 
 * @callback setFile
 * @param {Object} file - File uploaded in the web-browser
 */

/**
 * This callback is `setValidity` and is used by pages for setting the state string of the uploaded file in App.js.
 * 
 * @callback setValidity
 * @param {string} validity - New validity state string
 */

/**
 * This callback is `setResponse` sets `response` to the JSON returned from our Spring API in App.js.
 * 
 * @callback setResponse
 * @param {Object} response - API response JSON
 */

/**
 * This callback is `setLoading` sets `loading` to the state string representing the predictions loading in App.js.
 * 
 * @callback setLoading
 * @param {string} loading - New state string representing predictions loading
 */

/**
 * Displays page on path/site location using BrowserRouter
 * 
 * @returns {JSX.Element} App pages
 */
function App () {
  // hoisted from button components to share between pages (home, view)
  const [file, setFile] = useState(null) // current file
  const [response, setResponse] = useState(null) // JSON data returned from server
  const [validity, setValidity] = useState('no_file') // no upload
  const [loading, setLoading] = useState('loaded')

  return (
    <>
      <Router className='router'>
        <Hero response={response} />
        <Content child={
          <Routes>
            <Route path='/' element={<Home file={file} setFile={setFile} validity={validity} setValidity={setValidity} setResponse={setResponse} loading={loading} setLoading={setLoading}/>} />
            <Route path='/view' element={<View file={file} setFile={setFile} response={response} loading={loading} setLoading={setLoading} />} />
            <Route path='/CSVschema' element={<CSVSchema/>}/>
            <Route path='/JSONschema' element={<JSONSchema/>}/>

          </Routes>
        }
        />
      </Router>
    </>
  )
}

export default App
