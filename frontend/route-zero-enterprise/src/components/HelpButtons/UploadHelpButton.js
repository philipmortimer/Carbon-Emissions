import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="help-button" variant="secondary" onClick={handleShow}>
                Help
            </Button>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Information</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p>Please upload your .csv or .json file by pressing the 'Upload' button. Once this step is completed,
                        you will be able to access your predictions by pressing the 'See predictions' button.</p>

                    <p>The predictions will not work without a valid csv or json file. Please review the csv and json schema for more information.
                    </p>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

function HelpButton() {
    return (
        <>
            {['end'].map((placement, idx) => (
                <OffCanvasExample key={idx} placement={placement} name={placement} />
            ))}
        </>
    );
}

export default HelpButton