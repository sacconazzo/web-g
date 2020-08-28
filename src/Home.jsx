import React, { useState, useEffect } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import Fade from 'react-bootstrap/Fade'
import TitleAnim from './TitleAnim.jsx'
import ToastSys from './ToastSys.jsx'
import Editor from './Editor.jsx'

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 50)
  }, [loaded])

  useEffect(() => {

    if (!content) {

      fetch('https://sacconazzo.altervista.org/api/?fn=get-bethel-stat', {
        method: "POST",
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: "usr=GRighini&token=a68c861c2fdcc868a04be4da2d08fc2cad17ac793117c6cd8e5743f12e3fe9e1&from=2020-09-15"
      })
        .then(response => response.json())
        .then(json => setContent(json.stats[1].note))

    }

  }, [content])

  return (
    <div>
      <Navbar className="shadow-sm" bg="light" expand="lg" sticky="top">
        <Navbar.Brand>Welcome</Navbar.Brand>
      </Navbar>
      <Fade in={loaded}>
        <Container className="p-3 text-center">
          <Jumbotron>
            <h1 className="header"><TitleAnim texts={["Hi,", "traveler!"]} /></h1>
            <h4 className="header">my name is Giona, I'm a full-stack software engineer at <a href="https://www.alteaup.it" target="_blank" rel="noopener noreferrer">Altea Up</a></h4>
            <h4 className="header"><a href="mailto:info@giona.tech" >contact me</a> for info, consultancy or collaborations</h4>
          </Jumbotron>
          <CardDeck>

            <Card bg="light" border="info" className="p-3 text-center" >
              <Card.Body>
                <Card.Title>
                  SAP ERP Certified Tech Expert</Card.Title>
              </Card.Body>
            </Card>
            <Card bg="light" border="info" className="p-3 text-center" >
              <Card.Body>
                <Card.Title>
                  SAP Fiori Certified Developer
                </Card.Title>
              </Card.Body>
            </Card>

            <Card bg="light" border="info" className="p-3 text-center" >
              <Card.Body>
                <Card.Title>React & HTML5 for Web & Mob apps</Card.Title>
                <Card.Text>

                </Card.Text>
              </Card.Body>
            </Card>

            <Card bg="light" border="info" className="p-3 text-center" >
              <Card.Body>
                <Card.Title>Java Android Developer</Card.Title>
                <Card.Text>

                </Card.Text>
              </Card.Body>
            </Card>

          </CardDeck>

        </Container>
      </Fade>
      <Fade in={!!content}>
        <Container className="mt-2 mb-2" >
          <Editor content={content} bingo={content => { }} />
        </Container>
      </Fade>
      <ToastSys loaded={loaded} />
    </div>
  )
};

export default Home;