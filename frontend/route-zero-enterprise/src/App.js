import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import {Home} from "./pages/Home/Home.js";
import {View} from "./pages/Graph/View.js";
import {Hero} from "./components/Hero/Hero.js";
import {Content} from "./components/Content/Content.js";

//import Button from 'react-bootstrap/Button';

function App() {

  //hoisted from button components to share between pages (home, view)
  const [file, setFile] = useState(null); //current file
  const [response, setResponse] = useState(null); //JSON data returned from server
  const [validity, setValidity] = useState("no_file"); //no upload

  return (
    <>
      <Router className="router">
        <Hero response={response}/>
        <Content child={
                  <Routes>  
                  <Route path="/" element={<Home file={file} setFile={setFile} validity={validity} setValidity={setValidity} setResponse={setResponse}/>} />
                  <Route path="/view" element={<View file={file} setFile={setFile} response={response}/>}/>
                </Routes>
        }></Content>
      </Router>
    </>
  );
}

export default App;
