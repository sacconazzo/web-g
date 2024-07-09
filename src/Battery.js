import React, { useState, useEffect } from 'react'
import {
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Area,
  Line,
  Bar,
  ReferenceLine,
  Rectangle,
} from 'recharts'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Fade from 'react-bootstrap/Fade'
// import ProgressBar from "react-bootstrap/ProgressBar"
import Spinner from 'react-bootstrap/Spinner'
import TooltipChart from './TooltipBatteryChart'
import moment from 'moment'

let data = null
let last = {}
let today = {}
let minA = 0
let maxA = 0
let minAh = 0
let maxAh = 0

const Monitor = (props) => {
  const [loaded, setLoaded] = useState(false)

  function time(date) {
    const d = new Date(date),
      h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
      m = ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
    return h + m
  }

  function timeS(date, values) {
    const w = values.length
      ? ` ${formatW(values[0].payload.b1A * values[0].payload.b1V + values[0].payload.b2A * values[0].payload.b2V)}`
      : ''
    const d = new Date(date),
      h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
      m = ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(),
      s = ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds()
    return (
      <>
        {moment(date).fromNow(true)}
        <b>{w}</b>
        {` (${h}${m}${s})`}
      </>
    )
  }

  const round = (v) => (Math.round(v) > 0 ? `+${Math.round(v)}` : `${Math.round(v)}`)

  const formatDate = (value, values) => {
    const options = { weekday: 'long', day: 'numeric' }
    const perc = values.length ? ` (${round((values[0].payload.b1Ah + values[0].payload.b2Ah) / 2)}%)` : ''
    const wh = values.length ? ` ${formatWh(values[0].payload.b1Wh + values[0].payload.b2Wh)}` : ''
    return (
      <>
        {new Date(value).toLocaleDateString(props.locale, options)}
        <b> {wh}</b>
        {perc}
      </>
    )
  }

  const formatDateShort = (value) => {
    const options = { month: 'short', day: 'numeric' }
    return new Date(value).toLocaleDateString(props.locale, options)
  }

  const formatFlatNumber = (value) =>
    value.toLocaleString(props.locale, {
      maximumFractionDigits: 0,
      signDisplay: 'always',
    })

  const formatV = (value) => {
    return (
      value.toLocaleString(props.locale, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) + 'V'
    )
  }

  const formatA = (value) => formatFlatNumber(value) + 'A'

  const formatW = (value) => formatFlatNumber(value) + 'W'

  const formatAh = (value) => formatFlatNumber(value) + 'Ah'

  const formatP = (value) => formatFlatNumber(value / 2) + '%'

  const formatWh = (value) => formatFlatNumber(value) + 'Wh'

  const formatT = (value) => {
    return (
      value.toLocaleString(props.locale, {
        maximumFractionDigits: 0,
      }) + '°C'
    )
  }

  const formatter = (value, name) => {
    if (name === 'timestamp') return value
    if (['b1A', 'b2A'].includes(name))
      return (
        value.toLocaleString(props.locale, {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1,
          signDisplay: 'always',
        }) + ' A'
      )
    if (['b1Ah', 'b2Ah'].includes(name))
      return (
        value.toLocaleString(props.locale, {
          maximumFractionDigits: 1,
          minimumFractionDigits: 1,
          signDisplay: 'always',
        }) + ' Ah'
      )
    return name === 'temp'
      ? value.toLocaleString(props.locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + ' °C'
      : value.toLocaleString(props.locale, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + ' V'
  }

  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry

    return <span style={{ color }}>{value}</span>
  }

  const gradientOffset = (f) => {
    const dataMax = Math.max(...data.realtime.map((i) => i[f]))
    const dataMin = Math.min(...data.realtime.map((i) => i[f]))

    if (dataMax <= 0) {
      return 0
    }
    if (dataMin >= 0) {
      return 1
    }

    return dataMax / (dataMax - dataMin)
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
        const response = await fetch('https://api.giona.tech/domotica/battery', {
          credentials: 'include',
        })

        data = await response.json()
        if (window.innerHeight > window.innerWidth) data.realtime = data.realtime.slice(-50)

        last = data.realtime[data.realtime.length - 1]
        today = data.dayWeek[data.dayWeek.length - 1]

        minA = data.realtime.reduce((min, c) => (c.b1A < min ? c.b1A : min), 0)
        maxA = data.realtime.reduce((max, c) => (c.b1A > max ? c.b1A : max), 0)
        minA = data.realtime.reduce((min, c) => (c.b2A < min ? c.b2A : min), minA)
        maxA = data.realtime.reduce((max, c) => (c.b2A > max ? c.b2A : max), maxA)

        minAh = data.dayWeek.reduce((min, c) => (c.b1Ah + c.b2Ah < min ? c.b1Ah + c.b2Ah : min), 0)
        maxAh = data.dayWeek.reduce((max, c) => (c.b1Ah + c.b2Ah > max ? c.b1Ah + c.b2Ah : max), 0)

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
            {data?.system && (
              <p>
                {data.system.uptime} ({data.system.temp} °C)
              </p>
            )}
          </Jumbotron>
          {!data && <Spinner className="ml-3" animation="grow" />}
          <Fade in={!!data}>
            <>
              {data?.realtime && (
                <Card bg="" text="dark">
                  <Card.Header as="h5">
                    Realtime <b>{formatW(last.b1A * last.b1V + last.b2A * last.b2V)}</b> {formatA(last.b1A + last.b2A)}{' '}
                    ({data.realtime[data.realtime.length - 1].temp}°C)
                  </Card.Header>
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
                        <YAxis
                          allowDataOverflow
                          yAxisId={1}
                          ticks={[last.bmV, (last.b2V + last.b1V) / 2]}
                          dataKey="b2V"
                          domain={[12, 15.5]}
                          tickFormatter={formatV}
                        />
                        <YAxis
                          allowDataOverflow
                          yAxisId={2}
                          stroke="#ce7e00"
                          ticks={[minA, (last.b1A + last.b2A) / 2, maxA]}
                          domain={[-35, 15]}
                          dataKey="b2A"
                          tickFormatter={formatA}
                          orientation="right"
                        />
                        <YAxis
                          allowDataOverflow
                          yAxisId={3}
                          stroke="#6aa84f"
                          hide
                          dataKey="temp"
                          domain={[5, 'auto']}
                          tickFormatter={formatT}
                        />
                        <ReferenceLine y={0} yAxisId={2} stroke="#ce7e00" strokeDasharray="3 3" />
                        <ReferenceLine y={minA} yAxisId={2} stroke="#ED757355" strokeDasharray="3 3" />
                        <ReferenceLine y={maxA} yAxisId={2} stroke="#edb27377" strokeDasharray="3 3" />
                        <Legend formatter={renderColorfulLegendText} />
                        <Tooltip content={<TooltipChart formatter={formatter} labelFormatter={timeS} />} />
                        <Area yAxisId={1} type="monotone" dataKey="bmV" dot={false} stroke="#cc0000" fill="#cc0000" />
                        <Area yAxisId={1} type="monotone" dataKey="b1V" dot={false} stroke="#45818e" fill="#76a5af" />
                        <Area yAxisId={1} type="monotone" dataKey="b2V" dot={false} stroke="#3d85c6" fill="#6fa8dc" />
                        <defs>
                          <linearGradient id="splitColor1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={gradientOffset('b1A')} stopColor="#edb27355" />
                            <stop offset={gradientOffset('b1A')} stopColor="#ED757377" />
                          </linearGradient>
                          <linearGradient id="splitColor2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset={gradientOffset('b2A')} stopColor="#edb27355" />
                            <stop offset={gradientOffset('b2A')} stopColor="#ED757377" />
                          </linearGradient>
                        </defs>
                        <Area
                          yAxisId={2}
                          // stackId={1}
                          strokeWidth={1.5}
                          type="monotone"
                          dataKey="b1A"
                          dot={false}
                          fill="url(#splitColor1)"
                          stroke="#ce7e00"
                        />
                        <Area
                          yAxisId={2}
                          // stackId={1}
                          strokeWidth={1.5}
                          type="monotone"
                          dataKey="b2A"
                          dot={false}
                          stroke="#e69138"
                          fill="url(#splitColor2)"
                        />
                        <Line
                          yAxisId={3}
                          type="monotone"
                          strokeWidth={1.5}
                          dataKey="temp"
                          dot={false}
                          stroke="#6aa84f"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
              )}
              <p></p>
              {data?.dayWeek && (
                <Card bg="light">
                  <Card.Header as="h5">
                    Day <b>{formatWh(today.b1Wh + today.b2Wh)}</b> {formatAh(today.b1Ah + today.b2Ah)} (
                    {round((today.b1Ah + today.b2Ah) / 2)}%)
                  </Card.Header>
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
                        <YAxis
                          allowDataOverflow
                          yAxisId={1}
                          ticks={[today.bmV, (today.b2V + today.b1V) / 2]}
                          dataKey="b2V"
                          domain={[12.2, 14]}
                          tickFormatter={formatV}
                        />
                        <YAxis
                          allowDataOverflow
                          yAxisId={2}
                          stroke="#ce7e00"
                          ticks={[-60, -30, 0, 30, 60]}
                          domain={[-70, 70]}
                          dataKey="b2Ah"
                          tickFormatter={formatP}
                          orientation="right"
                        />
                        <YAxis
                          allowDataOverflow
                          yAxisId={3}
                          hide
                          stroke="#6aa84f"
                          dataKey="temp"
                          domain={[10, 'auto']}
                          tickFormatter={formatT}
                        />
                        <Legend formatter={renderColorfulLegendText} />
                        <Tooltip content={<TooltipChart formatter={formatter} labelFormatter={formatDate} />} />
                        <ReferenceLine y={0} yAxisId={2} stroke="#ce7e00" strokeDasharray="3 3" />
                        <ReferenceLine y={minAh} yAxisId={2} stroke="#ED757355" strokeDasharray="3 3" />
                        <ReferenceLine y={maxAh} yAxisId={2} stroke="#edb27377" strokeDasharray="3 3" />
                        <Area yAxisId={1} type="monotone" dataKey="bmV" dot={false} stroke="#cc0000" fill="#cc0000" />
                        <Area yAxisId={1} type="monotone" dataKey="b1V" dot={false} stroke="#45818e" fill="#76a5af" />
                        <Area yAxisId={1} type="monotone" dataKey="b2V" dot={false} stroke="#3d85c6" fill="#6fa8dc" />
                        <Bar
                          yAxisId={2}
                          stackId={1}
                          dataKey="b1Ah"
                          fill="#ce7e00"
                          activeBar={<Rectangle fill="#f6b26b" stroke="#ce7e00" />}
                        />
                        <Bar
                          yAxisId={2}
                          stackId={1}
                          dataKey="b2Ah"
                          fill="#e69138"
                          activeBar={<Rectangle fill="#ffd966" stroke="#e69138" />}
                        />
                        <Line
                          yAxisId={3}
                          type="monotone"
                          dataKey="temp"
                          strokeWidth={1.5}
                          dot={false}
                          stroke="#6aa84f"
                        />
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
