import React, { useState, useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import Fade from 'react-bootstrap/Fade'

const Balance = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 50)
  }, [loaded])

  return (
    <div>
      <Navbar className="shadow-sm" bg="light" expand="lg" sticky="top">
        <Navbar.Brand>Daily Notes</Navbar.Brand>
      </Navbar>
      <Fade in={loaded}>
        <ResponsiveEmbed style={{ width: '100%', height: ' calc(100vh - 169px)' }}>
          <embed src="https://jws.giona.tech" />
        </ResponsiveEmbed>
      </Fade>
    </div>
  )
}

export default Balance
