import React from 'react'
import './CardImg.css'
export default function CardImg(props) {
  return (
    <div className='card-img'>
        <img src={props.src} alt={props.alt} />
    </div>
  )
}
