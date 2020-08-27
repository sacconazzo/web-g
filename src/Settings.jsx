import React, { useState, useEffect } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Fade from 'react-bootstrap/Fade'

const Settings = (props) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 50)
    })

    return (
        <div>
            <Navbar className="shadow-sm" bg="light" expand="lg" sticky="top">
                <Navbar.Brand>Settings</Navbar.Brand>
            </Navbar>
            <Fade in={loaded}>
                <Container className="p-3">
                    <Jumbotron>
                        <h1 className="App-logo/text-center">
                            <i className="fa fa-cog" style={{ fontSize: '4em' }}></i>
                        </h1>
                    </Jumbotron>
                </Container>
            </Fade>
        </div>
    )
};

export default Settings;