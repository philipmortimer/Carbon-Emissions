import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const PromptSchemaCSV = (props) => {

    const [shown, setShown] = useState(false);

    const handleClose = () => setShown(false);
    const handleShow = () => setShown(true);

    return(
        <div className={`${props.className}`}>
            <Button className={`${props.className}-button`} variant="primary" onClick={handleShow}>
                CSV Schema
            </Button>

            <Modal show={shown} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>CSV Schema</Modal.Title>
                </Modal.Header>
                    <Modal.Body>Schema</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};