import React, { useState, useEffect } from "react"
import { ComposedChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Area, Line } from 'recharts'
import Jumbotron from "react-bootstrap/Jumbotron"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Card from "react-bootstrap/Card"
import Fade from "react-bootstrap/Fade"
// import ProgressBar from "react-bootstrap/ProgressBar"
import Spinner from "react-bootstrap/Spinner"

var data = null

const Monitor = (props) => {
  const [loaded, setLoaded] = useState(false)

  function time(date) {
    var d = new Date(date),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    return h + ':' + m;
  }

  const formatTimeShort = (value) => {
    const options = { hours: 'short', minutes: 'numeric' }
    return new Date(value).toLocaleDateString(props.locale, options)
  }

  const formatV = (value) => {
    return value.toLocaleString(props.locale, {
      maximumFractionDigits: 1,
    }) + "V"
  }

  const formatT = (value) => {
    return value.toLocaleString(props.locale, {
      maximumFractionDigits: 0,
    }) + '°C'
  }

  const formatter = (value, name) => {
    if (name === 'timestamp') return value
    return name === 'temp' ? value.toLocaleString(props.locale, {
      maximumFractionDigits: 2,
    }) + ' °C' : value.toLocaleString(props.locale, {
      maximumFractionDigits: 2,
    }) + " V"
  }

  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry

    return <span style={{ color }}>{value}</span>
  }

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
            <>
              {data && (
                <Card bg="" text="dark">
                  <Card.Header as="h5">Realtime ({data.realtime[data.realtime.length-1].temp} °C)</Card.Header>
                  <Card.Body>
                  <ResponsiveContainer width={'100%'} height={300}>
                    <ComposedChart
                      data={data.realtime}
                      margin={{
                        top: 5,
                        // right: 30,
                        // left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" tickFormatter={time} />
                      <YAxis yAxisId={1} dataKey="b2V" domain={[12.5, 14.5]} tickFormatter={formatV} />
                      <YAxis yAxisId={2} dataKey="temp" tickFormatter={formatT} orientation='right' />
                      <Legend formatter={renderColorfulLegendText} />
                      <Tooltip formatter={formatter}/>
                      <Area yAxisId={1} type="monotone" dataKey="bmV" dot={false}stroke="#cc0000" fill="#cc0000"/>
                      <Area yAxisId={1} type="monotone" dataKey="b1V" dot={false} stroke="#3d85c6" fill="#6fa8dc" />
                      <Area yAxisId={1} type="monotone" dataKey="b2V" dot={false} stroke="#3d85c6" fill="#6fa8dc" />
                      <Line yAxisId={2} type="monotone" dataKey="temp" dot={false} stroke="#6aa84f" />
                    </ComposedChart>
                  </ResponsiveContainer>
                  </Card.Body>
                </Card>
              )}
              <p></p>
              {data && false && (
                <Card bg="light">
                  <Card.Header as="h5">Day Week</Card.Header>
                  <Card.Body>
                  <ResponsiveContainer width={'100%'} height={300}>
                    <ComposedChart
                      data={data.realtime}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timestamp" tickFormatter={formatTimeShort} />
                      <YAxis yAxisId={1} dataKey="bmV"  />
                      <YAxis yAxisId={2} dataKey="temp"  />
                      <Legend formatter={renderColorfulLegendText} />
                      <Area yAxisId={2} type="monotone" dataKey="temp" stroke="#8884d8" fill="#8884d8" activeDot={{ r: 8 }} />
                      <Area yAxisId={1} type="monotone" dataKey="bmV" stroke="#aaaaaa" fill="#cccccc" />
                      <Line yAxisId={2} type="monotone" dataKey="rate" dot={false} stroke="#000000" />
                      <Line yAxisId={2} type="monotone" dataKey="rate" dot={false} stroke="#000000" />
                      <Line yAxisId={2} type="monotone" dataKey="rate" dot={false} stroke="#000000" />
                    </ComposedChart>
                  </ResponsiveContainer>
                  </Card.Body>
                </Card>
              )}
            </>
          </Fade>
        </Container>
      </Fade>
    </div>
  )
}

export default Monitor
