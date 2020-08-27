import React, { useState, useEffect } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Fade from 'react-bootstrap/Fade'

const Private = (props) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 50)
    })

    return (
        <>
            <Navbar className="shadow-sm" bg="light" expand="lg" sticky="top">
                <Navbar.Brand>Private section</Navbar.Brand>
            </Navbar>
            <Fade in={loaded}>
                <Container className="p-3">
                    <Jumbotron>
                        <h1 className="header">Ciao!</h1>
                    </Jumbotron>
                </Container>
            </Fade>
        </>
    );
};

export default Private;