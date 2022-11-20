import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import {Home} from "./pages/Home/Home.js";
import {Graph} from "./pages/Graph/Graph.js";
import {Hero} from "./components/Hero/Hero.js";
import {Content} from "./components/Content/Content.js";

//import Button from 'react-bootstrap/Button';

function App() {
  return (
    <>
      <Router className="router">
        <Hero/>
        <Content child={
                  <Routes>  
                  <Route path="/" element={<Home/>} />
                  <Route path="/graph" element={<Graph/>}/>
                </Routes>
        }></Content>
      </Router>
    </>
  );
}

export default App;
