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
