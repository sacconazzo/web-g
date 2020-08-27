import React, { useState, useEffect } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Fade from 'react-bootstrap/Fade'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Private = (props) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
            console.log(props.auth)
        }, 50)
    })

    return (
        <>
            <Navbar className="shadow-sm" bg="light" expand="lg" sticky="top">
                <Navbar.Brand>Private section</Navbar.Brand>
            </Navbar>
            <Fade in={loaded}>
                <Container className="p-3 text-center">
                    <Jumbotron>
                        <h1 className="header">Control Panel</h1>
                        <Form action="/personale.php" method="post">
                            <input type="hidden" name="pwd" value={props.auth} />
                            <Button type="submit">Accedi</Button>
                        </Form>
                    </Jumbotron>
                </Container>
            </Fade>
        </>
    );
};

export default Private;