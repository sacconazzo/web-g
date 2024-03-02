import React, { useState } from "react"
import {
  useNavigate
} from "react-router-dom";
import "./App.css"
import Home from "./Home.jsx"
import Private from "./Private.jsx"
import Monitor from "./Monitor.jsx"
import Battery from "./Battery.jsx"
import Login from "./Login.jsx"
import Icon from "./assets/favicon.ico"
import Navbar from "react-bootstrap/Navbar"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav"
import TitleAnim from "./TitleAnim.jsx"
import "@trendmicro/react-sidenav/dist/react-sidenav.css"
import "font-awesome/css/font-awesome.min.css"
import styled from "styled-components"

const Main = styled.main`
  position: relative;
  overflow: auto;
  transition: all 0.15s;
  background-color: #fcfcfd;
  margin-left: ${(props) => (props.expanded ? 240 : 64)}px;
  height: calc(100vh - 56px - 57px);
`
const Head = styled.div`
  position: relative;
  overflow: auto;
  height: 56px;
`
const Bar = styled.div`
  position: relative;
  height: calc(100vh - 56px);
`
const Separator = styled.div`
  clear: both;
  position: relative;
  margin: 0.8rem;
  background-color: #f9dcdd;
  height: 1px;
`

const SideNavF = styled(SideNav)`
  background: #34558b;
`

var auth = localStorage.getItem("auth")

function App() {
  const navigate = useNavigate()
  const path = window.location.hash
  var sel = path.replace(/[^\w\s]/gi, '')
  sel = sel === "" || !sel ? "home" : sel

  window.onpopstate = () => setView(window.location.hash.replace(/[^\w\s]/gi, '') || "home")

  const [view, setView] = useState(sel)
  const [expanded, setState] = useState(false)

  return (
    <>
      <Head expanded={expanded}>
        <Navbar variant="dark" bg="dark" className="justify-content-between" sticky="top">
          <Image className="px-1" alt="logo" src={Icon} width="28" height="20" />
          <Navbar.Brand className="px-1">sacconazzo</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="px-2">
              @{" "}
              <a href="https://giona.tech" target="_blank" rel="noopener noreferrer">
                <TitleAnim static texts={["giona.tech"]} />
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
          <Form inline>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="button-tooltip-2">linkedin.com/in/giona-righini</Tooltip>}
            >
              <Button
                variant="outline-primary"
                className="mr-sm-2"
                href="https://www.linkedin.com/in/giona-righini"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-fw fa-linkedin" style={{ fontSize: "1.25em" }}></i>
              </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">github.com/sacconazzo</Tooltip>}>
              <Button
                variant="outline-success"
                className="mr-sm-2 d-none d-md-block"
                href="https://github.com/sacconazzo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-fw fa-github" style={{ fontSize: "1.25em" }}></i>
              </Button>
            </OverlayTrigger>
          </Form>
        </Navbar>
      </Head>
      <Bar>
        <SideNavF
          expanded={expanded}
          onToggle={(expanded) => {
            setState(expanded)
          }}
          onSelect={(selected) => {
            setView(selected)
            navigate("#" + selected)
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav selected={view} >
            <NavItem eventKey="home">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem eventKey="battery">
              <NavIcon>
                <i className="fa fa-fw fa-battery-three-quarters" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Private</NavText>
            </NavItem>
            <NavItem eventKey="monitor">
              <NavIcon>
                <i className="fa fa-fw fa-tachometer" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Sys Monitor</NavText>
            </NavItem>
            <NavItem eventKey="private">
              <NavIcon>
                <i className="fa fa-fw fa-sign-in" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Private</NavText>
            </NavItem>
            <Separator />
            <NavItem eventKey="login">
              <NavIcon>
                <i className="fa fa-fw fa-cogs" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Keys</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNavF>
        <Main expanded={expanded}>
          {view === "home" && <Home />}
          {view === "monitor" && <Monitor />}
          {view === "battery" && <Battery />}
          {view === "private" && <Private auth={auth} />}
          {view === "login" && (
            <Login
              close={() => {
                setView("home")
              }}
              logged={(_auth) => {
                auth = _auth
                localStorage.setItem("auth", auth)
                setView("home")
              }}
            />
          )}
        </Main>
        <Navbar variant="light" bg="light" className="justify-content-between border-top" sticky="bottom">
          <Navbar.Brand className="px-1"></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="px-2">© Giona Righini {new Date().getFullYear()}</Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </Bar>
    </>
  )
}

export default App
