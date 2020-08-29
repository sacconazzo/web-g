import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast'


const ToastSys = (props) => {
    const [loadedExt, setShowExt] = useState(false);
    useEffect(() => {

        setTimeout(() => {
            setShowExt(true)
        }, 3000)

    }, [loadedExt])

    return (
        <div
            style={{
                position: 'fixed',
                bottom: '57px',
                right: 0,
                width: '300px',
            }}
        >
            <Toast className="m-3 d-none d-lg-block" show={loadedExt} onClose={() => setShowExt(false)}>
                <Toast.Header>
                    <strong className="mr-auto">Giusto</strong>
                    <small className="mr-auto">un saluto</small>
                </Toast.Header>
                <Toast.Body>Grazie della visita! Per ogni informazione non esitare a contattarmi su <strong>info@giona.tech</strong>. Oppure consulta il mio sito web, il mio <strong>profilo linkedin</strong> o il mio <strong>portfolio pubblico su GitHub</strong>. Per qualsiasi altra cosa, sono a tua disposizione...</Toast.Body>
            </Toast>
            <Toast className="m-3 d-none d-lg-block" onClose={() => props.messageokok()} show={props.messageok} delay={3000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">Thank you!</strong>
                    <small></small>
                </Toast.Header>
                <Toast.Body>I will reply you soon</Toast.Body>
            </Toast>
        </div>
    )
};

export default ToastSys;