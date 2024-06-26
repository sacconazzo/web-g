import React, { useState, useEffect } from 'react'
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
      <Fade in={loaded}>
        <ResponsiveEmbed style={{ width: '100%', height: ' calc(100vh - 113px)' }}>
          <embed src="https://20percent.giona.tech" />
        </ResponsiveEmbed>
      </Fade>
    </div>
  )
}

export default Balance
