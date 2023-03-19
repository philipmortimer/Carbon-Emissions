import React, { useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DownloadButton } from '../../components/Download/DownloadButton';
import './CSVSchema.scss'


export const CSVSchema = (props) => {
  
    return(  
       
        <div class="custom-container">
        <div class="middle-container">
                <div class="section">
                <div class="sub-section">
                <h1>CSV Schema</h1>
                </div>
                </div>
                <div class="section">
                <div class="sub-section">
                <h2>Line format:</h2>
                </div>
                <div class="sub-section">
                <Row>
                    <Col>
                    <p>Please format each line of your CSV as follows:</p>
                    <p>origin,destination,distanceKm,departureTime,arrivalTime,transport</p>
                    </Col>
                </Row>
                </div>
                </div>
                <div class="section">
                <div class="sub-section">
                <h2>Download example</h2>
                </div>
                <div class="sub-section">
                <DownloadButton/>
                </div>
                </div>
                <div class="section">
                <div class="sub-section">   
                <h4>Origin & Destination</h4>
                </div> 
                <div class="sub-section"> 
                <p>These are the name of the source and destination of your travel journey. Please include these names, but you
                    could also opt to omit them. For more information, please refer to the example above.</p>
                </div>
                </div>
                <div class="section">
                <div class="sub-section"> 
                <h4>Distance</h4>
                </div>
                <div class="sub-section"> 
                <p>This is the number of kilometers you travelled between source and destination. This information could easily be 
                    found through a map application such as Google Maps.
                </p>
                </div>
                </div>
                <div class="section">
                <div class="sub-section"> 
                <h4>Arrival & Departure time</h4>
                </div>
                <div class="sub-section"> 
                <p>Please include the time in the following format yyyy-mm-ddThh:mm:ss.000Z, where yyyy stands for year,
                    mm stands for month, dd stands for day, hh stands for hour, mm stands for minutes and ss stands for 
                    seconds, e.g. 2022-10-14T17:48:00.000Z.
                </p>
                </div>
                </div>
                <div class="section">
                <div class="sub-section"> 
                    <h4>Transport</h4>
                    </div>
                    <div class="sub-section"> 
                    <p>To include the type of transportation used, please pick one from the following dictionary and 
                        use the exact spelling seen bellow:</p>
                    <ul>
                        <Row>
                            <Col> 
                                <li>foot</li>
                                <li>bike</li>
                                <li>electricScooter</li>
                                <li>petrolCar</li>
                            </Col>
                        <Col>
                            <li>dieselCar</li>
                            <li>hybridCar</li>
                            <li>electricCar</li>
                            <li>taxi</li>
                        </Col>
                        <Col>
                            <li>bus</li>
                            <li>coach</li>
                            <li>eurostar</li>
                            <li>lightRail</li>
                        </Col>
                        <Col>
                            <li>tram</li>
                            <li>subway</li>
                            <li>flight</li>
                            <li>ferry</li>
                        </Col>
                        </Row>
                    </ul>
                    </div>
                </div>
            </div>
            </div>
            
    );
}