import React, { useState, useEffect } from "react"
import { ComposedChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Area, Line } from 'recharts'
import Jumbotron from "react-bootstrap/Jumbotron"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Card from "react-bootstrap/Card"
import Fade from "react-bootstrap/Fade"
// import ProgressBar from "react-bootstrap/ProgressBar"
import Spinner from "react-bootstrap/Spinner"
import moment from "moment"

var data = null

const Monitor = (props) => {
  const [loaded, setLoaded] = useState(false)

  function time(date) {
    var d = new Date(date),
        h = (d.getHours()<10?'0':'') + d.getHours(),
        m = ':' + (d.getMinutes()<10?'0':'') + d.getMinutes()
    return h + m;
  }

  function timeS(date) {
    var d = new Date(date),
        h = (d.getHours()<10?'0':'') + d.getHours(),
        m = ':' + (d.getMinutes()<10?'0':'') + d.getMinutes(),
        s = ':' + (d.getSeconds()<10?'0':'') + d.getSeconds();
    return `${moment(date).fromNow()} (${h}${m}${s})`;
  }

  const formatDate = (value) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(value).toLocaleDateString(props.locale, options)
  }

  const formatDateShort = (value) => {
    const options = { month: 'short', day: 'numeric' }
    return new Date(value).toLocaleDateString(props.locale, options)
  }

  const formatV = (value) => {
    return value.toLocaleString(props.locale, {
      minimumFractionDigits: 1
    }) + "V"
  }

  const formatA = (value) => {
    return value.toLocaleString(props.locale, {
      maximumFractionDigits: 0,
    }) + "A"
  }

  const formatAh = (value) => {
    return value.toLocaleString(props.locale, {
      maximumFractionDigits: 0,
    }) + "Ah"
  }

  const formatT = (value) => {
    return value.toLocaleString(props.locale, {
      maximumFractionDigits: 0,
    }) + '°C'
  }

  const formatter = (value, name) => {
    if (name === 'timestamp') return value
    if (['b1A', 'b2A'].includes(name)) return value.toLocaleString(props.locale, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }) + " A"
    if (['b1Ah', 'b2Ah'].includes(name)) return value.toLocaleString(props.locale, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 1,
    }) + " Ah"
    return name === 'temp' ? value.toLocaleString(props.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ' °C' : value.toLocaleString(props.locale, {
      minimumFractionDigits: 2,
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
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.giona.tech/domotica/battery", {
          method: "GET",
          credentials: "include",
        })
        data = await response.json()
        setTimeout(() => {
          setRefresh(refresh + 1)
        }, 2000)
      } catch (e) {
        setTimeout(() => {
          setRefresh(refresh + 1)
        }, 2000)
      }
    }
    fetchData()
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
            {data?.system &&<p>{data.system.uptime} ({data.system.temp} °C)</p>}
          </Jumbotron>
          {!data && <Spinner className="ml-3" animation="grow" />}
          <Fade in={!!data}>
            <>
              {data?.realtime && (
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
                      <XAxis dataKey="timestamp" minTickGap={15} tickFormatter={time} />
                      <YAxis allowDataOverflow yAxisId={1} ticks={[12.5, 13, 13.3, 13.8]} dataKey="b2V" domain={[12, 14]} tickFormatter={formatV} />
                      <YAxis allowDataOverflow yAxisId={2} stroke="#ce7e00" ticks={[-20, -10, -5, 0, 5]} domain={[-30, 10]} dataKey="b2A" tickFormatter={formatA} orientation='right' />
                      <YAxis allowDataOverflow yAxisId={3} stroke="#6aa84f" hide dataKey="temp" domain={[10, 'auto']} tickFormatter={formatT} />
                      {/* <ReferenceLine y={13} yAxisId={2} label="Max" stroke="red" strokeDasharray="3 3" /> */}
                      <Legend formatter={renderColorfulLegendText} />
                      <Tooltip formatter={formatter} labelFormatter={timeS} />
                      <Area yAxisId={1} type="monotone" dataKey="bmV" dot={false} stroke="#cc0000" fill="#cc0000"/>
                      <Area yAxisId={1} type="monotone" dataKey="b1V" dot={false} stroke="#45818e" fill="#76a5af" />
                      <Area yAxisId={1} type="monotone" dataKey="b2V" dot={false} stroke="#3d85c6" fill="#6fa8dc" />
                      <Line yAxisId={2} strokeWidth={2} type="monotone" dataKey="b1A" dot={false} stroke="#ce7e00" />
                      <Line yAxisId={2} strokeWidth={2} type="monotone" dataKey="b2A" dot={false} stroke="#e69138" />
                      <Line yAxisId={3} type="monotone" dataKey="temp" dot={false} stroke="#6aa84f" />
                    </ComposedChart>
                  </ResponsiveContainer>
                  </Card.Body>
                </Card>
              )}
              <p></p>
              {data?.dayWeek && (
                <Card bg="light">
                  <Card.Header as="h5">Day Week ({data.dayWeek[data.dayWeek.length-1].temp} °C)</Card.Header>
                  <Card.Body>
                  <ResponsiveContainer width={'100%'} height={300}>
                    <ComposedChart
                      data={data.dayWeek}
                      margin={{
                        top: 5,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" tickFormatter={formatDateShort} />
                      <YAxis allowDataOverflow yAxisId={1} ticks={[12.5, 13, 13.3, 13.8]} dataKey="b2V" domain={[12.2, 14]} tickFormatter={formatV} />
                      <YAxis allowDataOverflow yAxisId={2} stroke="#ce7e00" ticks={[-40, -20, 0, 20, 40]} domain={[-50, 50]} dataKey="b2A" tickFormatter={formatAh} orientation='right' />
                      <YAxis allowDataOverflow yAxisId={3} hide stroke="#6aa84f" dataKey="temp" domain={[10, 'auto']} tickFormatter={formatT}/>
                      <Legend formatter={renderColorfulLegendText} />
                      <Tooltip formatter={formatter} labelFormatter={formatDate} />
                      <Area yAxisId={1} type="monotone" dataKey="bmV" dot={false} stroke="#cc0000" fill="#cc0000"/>
                      <Area yAxisId={1} type="monotone" dataKey="b1V" dot={false} stroke="#45818e" fill="#76a5af" />
                      <Area yAxisId={1} type="monotone" dataKey="b2V" dot={false} stroke="#3d85c6" fill="#6fa8dc" />
                      <Line yAxisId={2} strokeWidth={2} type="monotone" dataKey="b1Ah" dot={false} stroke="#ce7e00" />
                      <Line yAxisId={2} strokeWidth={2} type="monotone" dataKey="b2Ah" dot={false} stroke="#e69138" />
                      <Line yAxisId={3} type="monotone" dataKey="temp" dot={false} stroke="#6aa84f" />
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
