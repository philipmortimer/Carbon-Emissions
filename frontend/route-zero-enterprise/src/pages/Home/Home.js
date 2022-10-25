import React, {useEffect} from "react";
import { Button, Row, Col, Container } from 'react-bootstrap';

export const Home = () => {

    useEffect(() => {
        document.title = "Upload Travel Data | RouteZero"
    });

    return(   
        <div className="container">
            <h1>Want to know your potential carbon savings?</h1>
            <h3>Simply upload your travel expense or milage data</h3>
            <Button>Upload</Button>
        </div>    
    );
}