import React from 'react'
import Button from './Button'
import BackDrop from './BackDrop'
import './Modal.css'

export default function Modal(props) {
  return (
  <>
    <BackDrop show={props.show} clearModal={props.clearModal} />
      <div className={`modal ${props.error ? 'error' : 'success'}`} style={{display: props.show ? "block" : "none"}}>
        {props.error && <h2>Error</h2>}
        {props.success && <h2>Success</h2>}
        {props.content && <p>{props.content}</p>}
        {props.error &&  <Button onClick={props.clearModal}>Close</Button>}
      </div>
  </>
  )
}
