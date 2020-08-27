import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Home from './Home.jsx'

const Login = (props) => {
    const [pwd, setPwd] = useState('')

    const close = () => {
        props.close()
    }

    const logged = () => {
        props.logged(pwd)
    }

    return (
        <>
            <Home />
            <Modal show={true} onHide={close} centered aria-labelledby="contained-modal-title-vcenter" >
                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control className="mt-2" type="password" onChange={event => setPwd(event.target.value)} placeholder="key" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={logged}>OK</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Login;