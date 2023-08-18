import React from 'react'
import './Title.css'
export default function Title(props) {
  return (
    <p className='title'>{props.children}</p>
  )
}
