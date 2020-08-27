import React, { useState, useEffect } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import Fade from 'react-bootstrap/Fade'
import TitleAnim from './TitleAnim.jsx'
import ToastSys from './ToastSys.jsx'

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 50)
  })

  return (
    <div>
      <Navbar className="shadow-sm" bg="light" expand="lg" sticky="top">
        <Navbar.Brand>Welcome</Navbar.Brand>
      </Navbar>
      <Fade in={loaded}>
        <Container className="p-3">
          <Jumbotron>
            <h1 className="header"><TitleAnim texts={["Ciao", "viaggiatore!"]} /></h1>
            <h3 className="header">benvenuto nel pannello di controllo di sacconazzo</h3>
          </Jumbotron>
          <CardDeck>
          <Card bg="light" border="info" className="p-3 text-center align-items-center" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>
                  Software Engineer</Card.Title>
              </Card.Body>
            </Card>
            <Card bg="light" border="info" className="p-3 text-center" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>
                  SAP ERP Certified Tech Consultant</Card.Title>
              </Card.Body>
            </Card>
            <Card bg="light" border="info" className="p-3 text-center" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>
                  SAP Fiori Certified Web & App Developer
                </Card.Title>
              </Card.Body>
            </Card>
            <Card bg="light" border="info" className="p-3 text-center" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>JS React & Java Android Developer</Card.Title>
                <Card.Text>

                </Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
        </Container>
      </Fade>
      <ToastSys loaded={loaded} />
    </div>
  )
};

export default Home;