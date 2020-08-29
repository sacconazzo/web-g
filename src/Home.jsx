import React, { useState, useEffect } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import Fade from 'react-bootstrap/Fade'
import TitleAnim from './TitleAnim.jsx'
import ToastSys from './ToastSys.jsx'
import Modal from 'react-bootstrap/Modal';
import Editor from './Editor.jsx'
import Button from 'react-bootstrap/Button';

var msg;

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 50)
  }, [loaded])

  const [content, setContent] = useState(null);

  useEffect(() => {
    if (!content) {
      setTimeout(() => {
        setContent("<p><strong>Write and send me a direct message here...</strong></p><p>...do not forget your reference so that I can get back to you!</p>")
      }, 5000)
    }
  }, [content])

  const [status, setStatus] = useState(0)
  const [error, setError] = useState(false)

  return (
    <div>
      <Navbar className="shadow-sm" bg="light" expand="lg" sticky="top">
        <Navbar.Brand>Welcome</Navbar.Brand>
      </Navbar>
      <Fade in={loaded}>
        <Container className="p-3 text-center">
          <Jumbotron style={{ minWidth: '12rem' }}>
            <h1 className="header"><TitleAnim texts={["Hi,", "traveler!"]} /></h1>
            <h4 className="header">my name is Giona, I'm a full-stack engineer at <a href="https://www.alteaup.it" target="_blank" rel="noopener noreferrer">Altea Up</a></h4>
            <h4 className="header"><a href="mailto:info@giona.tech" >contact me</a> for info, consultancy or collaborations</h4>
          </Jumbotron>
          <CardDeck className="">

            <Card bg="light" border="info" style={{ minWidth: '12rem' }} className="text-center"  >
              <Card.Body>
                <Card.Title>
                  SAP ERP Certified Tech Expert</Card.Title>
              </Card.Body>
            </Card>

            <Card bg="light" border="info" style={{ minWidth: '12rem' }} className="text-center" >
              <Card.Body>
                <Card.Title>
                  SAP Fiori Certified Developer
                </Card.Title>
              </Card.Body>
            </Card>

            <Card bg="light" border="info" style={{ minWidth: '12rem' }} className="text-center" >
              <Card.Body>
                <Card.Title>React & HTML5 for Web & Mob apps</Card.Title>
                <Card.Text>

                </Card.Text>
              </Card.Body>
            </Card>

            <Card bg="light" border="info" style={{ minWidth: '12rem' }} className="text-center" >
              <Card.Body>
                <Card.Title>Java Android Developer</Card.Title>
                <Card.Text>

                </Card.Text>
              </Card.Body>
            </Card>

          </CardDeck>

        </Container>
      </Fade>
      <Fade in={!!content && status < 2}>
        <Container className="mt-4 mb-2" >
          {status < 2 && <Editor content={content} bingo={content => { msg = content }} />}
          <Button disabled={status > 0} className="mt-2 mb-2 float-right" variant="primary" onClick={() => {

            if (!msg) return

            var payload = {
              message: msg
            }

            fetch('https://sacconazzo.altervista.org/api/?fn=send-message', {
              method: "POST",
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              body: JSON.stringify(payload)
            })
              .then(res => setStatus(2))
              .catch(e => {
                setError(true)
                setStatus(0)
              })

            setStatus(1)

          }}>Send <i className="fa fa-fw fa-paper-plane" /></Button>
        </Container>
      </Fade>
      <ToastSys loaded={loaded} messageok={status === 2} messageokok={() => setStatus(3)} />
      <Modal show={error} onHide={() => setError(false)} centered aria-labelledby="contained-modal-title-vcenter" >
        <Modal.Header closeButton>
          <Modal.Title>Ops...!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please check connection or try again</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setError(false)}>Ok</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
};

export default Home;