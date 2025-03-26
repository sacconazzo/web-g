import React, { useState, useEffect } from 'react'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import Navbar from 'react-bootstrap/Navbar'
import Fade from 'react-bootstrap/Fade'

const CAMERA_URL = 'https://picam.giona.tech'
const CLOUDFLARE_LOGIN_URL = 'https://picam.giona.tech'

const Camera = (props) => {
  const [loaded, setLoaded] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // Controlla se l'utente è autenticato (Cloudflare usa un cookie)
    fetch(CAMERA_URL, { credentials: 'include' })
      .then((response) => {
        if (response.status === 200) {
          setAuthenticated(true)
        } else {
          openLoginPopup()
        }
      })
      .catch(() => openLoginPopup())

    setTimeout(() => {
      setLoaded(true)
    }, 50)
  }, [])

  const openLoginPopup = () => {
    let loginWindow = window.open(
      CLOUDFLARE_LOGIN_URL,
      'Login',
      'width=500,height=600,left=100,top=100,resizable=no,scrollbars=no'
    )

    let checkLogin = setInterval(() => {
      if (loginWindow && loginWindow.closed) {
        clearInterval(checkLogin)
        // Dopo il login, ricarica la pagina
        window.location.reload()
      }
    }, 1000)
  }

  return (
    <div style={{ display: props.isVisible ? 'block' : 'none' }}>
      <Navbar className="shadow-sm" bg="light" expand="lg" sticky="top">
        <Navbar.Brand>Pi Camera</Navbar.Brand>
      </Navbar>
      <Fade in={loaded && authenticated}>
        {authenticated ? (
          <ResponsiveEmbed style={{ width: '100%', height: 'calc(100vh - 169px)' }}>
            <embed src={CAMERA_URL} />
          </ResponsiveEmbed>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>🔒 Accesso richiesto. Aprendo il login...</p>
          </div>
        )}
      </Fade>
    </div>
  )
}

export default Camera
