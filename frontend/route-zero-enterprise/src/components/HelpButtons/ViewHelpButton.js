import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="light" onClick={handleShow} className="me-2 pull-right">
                Help
            </Button>
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Information</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p>On this page you can visualise your journeys and current carbon emissions under the 'Before' section,
                        as well as prospects for improving your footprint.</p>

                    <p>By ticking the policies on the left of the screen in accordance with your needs, a visualisation of how much
                        carbon you could prevent from being released into the atmosphere will be displayed.
                    </p>
                    <p>The green bubbles next to each policy represents the reduction in kilotonnes of carbon emissions. If this number is negative, it means more emissions.
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