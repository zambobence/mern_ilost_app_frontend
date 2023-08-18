import React from 'react'
import './MenuToggler.css'

export default function MenuToggler(props) {
  return (
    <div className='menu-toggler' onClick={props.onClick}>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )
}
