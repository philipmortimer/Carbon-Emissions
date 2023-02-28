import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {travelKind} from '../../data/travelkind.js';

export const PromptSchemaCSV = (props) => {

    const [shown, setShown] = useState(false);

    const handleClose = () => setShown(false);
    const handleShow = () => setShown(true);

    return(
        <div className={`${props.className}`}>
            <Button className={`${props.className}-button`} variant="primary" onClick={handleShow}>
                CSV Schema
            </Button>

            <Modal show={shown} onHide={handleClose} className="csv-modal" size="lg">
                <Modal.Header closeButton >
                    <Modal.Title >CSV Schema</Modal.Title>
                </Modal.Header>
                    <Modal.Body className="csv-schema body">
                        <h3>Line format</h3>
                        <p>Please format each line of your CSV as follows</p>
                        <code>origin,destination,distanceKm,departureTime,arrivalTime,transport</code>
                        <h3><code>transport</code></h3>
                        <DropdownButton id="dropdown-basic-button" title="View transport options">
                            <Dropdown.Item><p>a journey taken by foot; <code>{travelKind.foot}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey by bicycle; <code>{travelKind.bike}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey by electric scooter; <code>{travelKind.electricScooter}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey driven in a petrol car; <code>{travelKind.petrolCar}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey driven in a diesel car; <code>{travelKind.dieselCar}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey driven in a hybrid car; <code>{travelKind.hybridCar}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey driven in an electric car; <code>{travelKind.electricCar}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey by taxi; <code>{travelKind.taxi}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey driven by bus; <code>{travelKind.bus}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey by coach; <code>{travelKind.coach}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey on the Eurostar; <code>{travelKind.eurostar}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey light-rail; <code>{travelKind.lightRail}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey by tram; <code>{travelKind.tram}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey by subway; <code>{travelKind.subway}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey by plane; <code>{travelKind.flight}</code></p></Dropdown.Item>
                            <Dropdown.Item><p>a journey by ferry; <code>{travelKind.ferry}</code></p></Dropdown.Item>
                        </DropdownButton>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};