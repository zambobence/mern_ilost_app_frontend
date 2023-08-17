import React from 'react'

export default function InputRange(props) {
  return (
    <div>
        <input type='range'
            value={props.value}
            onChange={props.onChange} min='100' max='5000'
        />
        <p>{props.value} meter</p>
    </div>
  )
}
