import React from 'react'
import Button from './Button'
import BackDrop from './BackDrop'
import './Modal.css'

export default function Modal(props) {
  return (
  <>
    <BackDrop show={props.show} clearModal={props.clearModal} />
      <div className='modal' style={{display: props.show ? "block" : "none"}}>
        <h2>Error</h2>
        {props.content && <p>{props.content}</p>}
        <Button onClick={props.clearModal}>Close</Button>
      </div>
  </>
  )
}
