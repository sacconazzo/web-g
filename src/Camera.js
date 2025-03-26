import React, { useState, useEffect } from 'react'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import Navbar from 'react-bootstrap/Navbar'
import Fade from 'react-bootstrap/Fade'

const CAMERA_URL = 'https://picam.giona.tech'
const CLOUDFLARE_LOGIN_URL = 'https://picam.giona.tech'

const Camera = (props) => {
  const [loaded, setLoaded] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [loginWindow, setLoginWindow] = useState(null)

  useEffect(() => {
    // Controlla se l'utente è autenticato (il cookie viene inviato automaticamente con la richiesta)
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
    let loginWin = window.open(CLOUDFLARE_LOGIN_URL, 'Login', 'width=500,height=600')
    setLoginWindow(loginWin)

    let checkLogin = setInterval(() => {
      if (loginWin && loginWin.closed) {
        clearInterval(checkLogin)
        // Dopo il login, verifica se l'utente è autenticato
        fetch(CAMERA_URL, { credentials: 'include' })
          .then((response) => {
            if (response.status === 200) {
              setAuthenticated(true)
            }
          })
          .catch(() => {
            // In caso di errore, l'utente non è autenticato
            setAuthenticated(false)
          })
      }
    }, 1000)
  }

  useEffect(() => {
    if (authenticated && loginWindow) {
      // Chiudi il popup se l'utente è autenticato
      loginWindow.close()
    }
  }, [authenticated, loginWindow])

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
