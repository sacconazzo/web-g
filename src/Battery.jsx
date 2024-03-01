import React, { useState, useEffect } from "react"

import Jumbotron from "react-bootstrap/Jumbotron"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import CardDeck from "react-bootstrap/CardDeck"
import Card from "react-bootstrap/Card"
import Fade from "react-bootstrap/Fade"
import Table from "react-bootstrap/Table"
// import ProgressBar from "react-bootstrap/ProgressBar"
import Spinner from "react-bootstrap/Spinner"

var data = null

const Monitor = (props) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 50)
  }, [loaded])

  const [refresh, setRefresh] = useState(0)
  useEffect(() => {
    fetch("https://api.giona.tech/domotica/battery", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        data = json

        setTimeout(() => {
          setRefresh(refresh + 1)
        }, 2000)
      })
  }, [refresh, props])

  return (
    <div>
      <Navbar className="shadow-sm" bg="light" expand="lg" sticky="top">
        <Navbar.Brand>Battery Monitor</Navbar.Brand>
      </Navbar>
      <Fade in={loaded}>
        <Container className="p-3">
          <Jumbotron className="text-center">
            <h1 className="header">
              <strong>Van Battery Monitor</strong>
            </h1>
          </Jumbotron>
          {!data && <Spinner className="ml-3" animation="grow" />}
          <Fade in={!!data}>
            <CardDeck>
              {data && (
                <Card bg="" text="dark">
                  <Card.Header as="h5">SCN</Card.Header>
                  <Card.Body>
                    <Card.Text>{data.realtime[0].temperature}</Card.Text>
                    <Card.Title>Processes</Card.Title>
                    <Table hover className="mt-2" size="sm">
                      <tbody>

                      </tbody>
                    </Table>
                    <Card.Title>Clients</Card.Title>
                    <Table hover className="mt-2" size="sm">
                      <tbody>

                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              )}
              {data && (
                <Card bg="light">
                  <Card.Header as="h5">g</Card.Header>
                  <Card.Body>
                    <Card.Text>test</Card.Text>
                    <Card.Title>Processes</Card.Title>
                    <Table hover className="mt-2" size="sm">
                      <tbody>

                      </tbody>
                    </Table>
                    <Card.Title>Storage</Card.Title>
                    <Card.Text>

                    </Card.Text>
                    <Card.Text>

                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </CardDeck>
          </Fade>
        </Container>
      </Fade>
    </div>
  )
}

export default Monitor
