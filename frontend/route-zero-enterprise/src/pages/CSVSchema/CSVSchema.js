import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './CSVSchema.scss'
import HelpButton from '../../components/HelpButtons/UploadHelpButton.js'

export const CSVSchema = (props) => {
  
    return(  
       
            <Container>
            <h1>CSV Schema</h1>
            <br></br>
            <h2>Line format:</h2>
            <p>origin,destination,distanceKm,departureTime,arrivalTime,transport</p>
            <h3>Origin & Destination</h3>
            <p>These are the name of the source and destination of your travel journey. Please include the names</p>
            <h3>Distance</h3>
            <p>This is the number of kilometers you travelled between source and destination.</p>
            <h3>Arrival & Departure time</h3>
            <p>Please include the time in the following format yyyy-mm-ddThh:mm:ss.000Z, where yyyy stands for year,
                mm stands for month, dd stands for day, hh stands for hour, mm stands for minutes and ss stands for 
                seconds, e.g. 2022-10-14T17:48:00.000Z.
            </p>
            <h3>Transport</h3>
            <p>To include the transport please pick one from the following dictionary:</p>
            <ul>
                <Row>
                    <Col> <li>foot</li>
                <li>bike</li>
                <li>electricScooter</li>
                <li>petrolCar</li>
                <li>dieselCar</li>
                <li>hybridCar</li>
                <li>electricCar</li>
                <li>taxi</li></Col>
                    <Col><li>bus</li>
                <li>coach</li>
                <li>eurostar</li>
                <li>lightRail</li>
                <li>tram</li>
                <li>subway</li>
                <li>flight</li>
                <li>ferry</li></Col>
                </Row>
               
            </ul>
            </Container>
        
       
    );
}