import React, { useState, useEffect } from 'react'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import Navbar from 'react-bootstrap/Navbar'
import Fade from 'react-bootstrap/Fade'

const Camera = (props) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 50)
  }, [loaded])

  return (
    <div style={{ display: props.isVisible ? 'block' : 'none' }}>
      <Navbar className="shadow-sm" bg="light" expand="lg" sticky="top">
        <Navbar.Brand>Pi Camera</Navbar.Brand>
      </Navbar>
      <Fade in={loaded}>
        <ResponsiveEmbed style={{ width: '100%', height: ' calc(100vh - 169px)' }}>
          <embed src="https://picam.giona.tech" />
        </ResponsiveEmbed>
      </Fade>
    </div>
  )
}

export default Camera
