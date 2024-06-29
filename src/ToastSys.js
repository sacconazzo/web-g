import React, { useState, useEffect } from 'react'
import Toast from 'react-bootstrap/Toast'

const ToastSys = (props) => {
  const [loadedExt, setShowExt] = useState(0)
  useEffect(() => {
    if (loadedExt === 0) {
      setTimeout(() => {
        setShowExt(1)
      }, 3000)
    }
  }, [loadedExt])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '57px',
        right: 0,
        width: '300px',
      }}
    >
      {/* <Toast className="m-3 d-none d-lg-block" show={loadedExt === 1} onClose={() => setShowExt(2)}>
        <Toast.Header>
          <strong className="mr-auto">Giusto</strong>
          <small className="mr-auto">un saluto</small>
        </Toast.Header>
        <Toast.Body>Grazie della visita! Sarà un piacere scambiare due chiacchiere personalmente</Toast.Body>
      </Toast> */}
      <Toast className="m-3" onClose={() => props.messageokok()} show={props.messageok} delay={3000} autohide>
        <Toast.Header>
          <strong className="mr-auto">Thank you!</strong>
          <small></small>
        </Toast.Header>
        <Toast.Body>I will reply you soon</Toast.Body>
      </Toast>
    </div>
  )
}

export default ToastSys
