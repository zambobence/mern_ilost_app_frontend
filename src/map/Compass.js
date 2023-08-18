import React from 'react'
import './Compass.css'
export default function Compass(props) {
  return (
    <div onClick={props.onClick}>
        <i class="fa-regular fa-compass compass"></i>
    </div>
  )
}
