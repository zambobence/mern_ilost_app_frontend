import React from 'react'

export default function Input(props) {

  return (
    <div>
        <label htmlFor={props.id}>{props.label}</label>
        {!props.isValid && <p>{props.error}</p>}
        <input id={props.id} {...props.input} />
    </div>
  )
}
