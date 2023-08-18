import React from 'react'
import './Input.css'
export default function Input(props) {

  return (
    <div className={`input-controller ${props.isValid ? '' : 'invalid' }`}>
        <label htmlFor={props.id}>{props.label}</label>
        {!props.isValid && <p>{props.error}</p>}
        <input id={props.id} {...props.input} />
    </div>
  )
}
