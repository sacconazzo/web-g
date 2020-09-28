import React, { useState, useEffect } from "react"

import Jumbotron from "react-bootstrap/Jumbotron"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import CardDeck from "react-bootstrap/CardDeck"
import Card from "react-bootstrap/Card"
import Fade from "react-bootstrap/Fade"
import Table from "react-bootstrap/Table"
import ProgressBar from "react-bootstrap/ProgressBar"
import Spinner from "react-bootstrap/Spinner"

var cpu = null

const Monitor = (props) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 50)
  }, [loaded])

  const [refresh, setRefresh] = useState(0)
  useEffect(() => {
    fetch("https://giona.sytes.net/cpu_load", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        cpu = json

        setTimeout(() => {
          setRefresh(refresh + 1)
        }, 2000)
      })
  }, [refresh, props])

  return (
    <div>
      <Navbar className="shadow-sm" bg="light" expand="lg" sticky="top">
        <Navbar.Brand>System Monitor</Navbar.Brand>
      </Navbar>
      <Fade in={loaded}>
        <Container className="p-3">
          <Jumbotron className="text-center">
            <h1 className="header">
              <strong>g NAS</strong> e <strong>SCN Router</strong>
            </h1>
          </Jumbotron>
          {!cpu && <Spinner className="ml-3" animation="grow" />}
          <Fade in={!!cpu}>
            <CardDeck>
              {cpu && (
                <Card bg="" text="dark">
                  <Card.Header as="h5">SCN</Card.Header>
                  <Card.Body>
                    <Card.Text>{cpu.scnuptime}</Card.Text>
                    <Card.Title>Processes</Card.Title>
                    <Table hover className="mt-2" size="sm">
                      <tbody>
                        {cpu.scnps.map((event) => (
                          <tr>
                            <td>{event.split(" ")[2] + " " + event.split(" ")[3].substring(0, 30)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Card.Title>Clients</Card.Title>
                    <Table hover className="mt-2" size="sm">
                      <tbody>
                        {cpu.scnuser.map((event) => (
                          <tr>
                            <td>{event.split(" ")[0] + " " + event.split(" ")[1]} </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              )}
              {cpu && (
                <Card bg="light">
                  <Card.Header as="h5">g</Card.Header>
                  <Card.Body>
                    <Card.Text>{cpu.uptime}</Card.Text>
                    <Card.Title>Processes</Card.Title>
                    <Table hover className="mt-2" size="sm">
                      <tbody>
                        {cpu.ps.map((event) => (
                          <tr>
                            <td>{event.split(" ")[2] + " " + event.split(" ")[3].substring(0, 30)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Card.Title>Storage</Card.Title>
                    {cpu.vol}
                    <ProgressBar animated now={cpu.volfree.substring(0, cpu.volfree.length - 1)} />
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
