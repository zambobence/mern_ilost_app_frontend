import React from 'react'
import ReactDOM from 'react-dom'
import './BackDrop.css'

export default function BackDrop(props) {
    const content = 
    <div className='backdrop' style={{ display: props.show ? 'block' : 'none' }} onClick={props.clearModal}>
        <h1>Backdrop</h1>
        {props.show}
    </div>

  return (
    ReactDOM.createPortal(content, document.getElementById('backdrop-hook'))
  )
}
