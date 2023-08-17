import React from 'react'
import './ItemImage.css'
export default function ItemImage(props) {
  return (
    <div className={`item-image ${props.className}`}>
        <img src={props.src} alt={props.alt} />
    </div>
  )
}
