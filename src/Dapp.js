import React, { useState, useEffect } from 'react'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import Fade from 'react-bootstrap/Fade'

const Balance = (props) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 50)
  }, [loaded])

  return (
    <div style={{ display: props.isVisible ? 'block' : 'none' }}>
      <Fade in={loaded}>
        <ResponsiveEmbed style={{ width: '100%', height: ' calc(100vh - 113px)' }}>
          <embed src="https://20percent.giona.tech" />
        </ResponsiveEmbed>
      </Fade>
    </div>
  )
}

export default Balance
