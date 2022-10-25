import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

import {Home} from "./pages/Home/Home.js";

//import Button from 'react-bootstrap/Button';

function App() {
  return (
    <>
      <h1>Route Zero Carbon Tracking for Business</h1>
      <Router className="router">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            
          </li>
        </ul>

        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
