import React from "react";
import {Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import {Logo} from "../Logo/Logo.js";

import "./Hero.scss";

export const Hero = (props) => {
    return(
        <>
        <Navbar bg="light" variant="light">
            <Container fluid>
            <Navbar.Brand className="navbar-brand" href="https://routezero.world/"><Logo/>{/*RouteZero*/}</Navbar.Brand>
            <Nav className="me-auto">
                <Link className="nav-link" to="/">Upload</Link>
                <Link className="nav-link" id={"view-link" + (props.response === null ? "-disabled" : "")} to={props.response === null ? "/" : "/view"}>View</Link>
            </Nav>
            </Container>
        </Navbar>
        </>
    )
};