import React from 'react'

export default function InputRange(props) {
  return (
    <div className='input-controller'>
        <label htmlFor={props.id}>{props.label}</label>
        <input type='range'
            id={props.id}
            value={props.value}
            onChange={props.onChange} min='100' max='5000'
        />
        <p>{props.value} meter</p>
    </div>
  )
}
