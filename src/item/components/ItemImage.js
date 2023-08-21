import React from 'react'
import './ItemImage.css'
export default function ItemImage(props) {
  const imgPath = process.env.REACT_APP_BACKEND_URL + '/' + props.src

  return (
    <div className={`item-image ${props.className}`}>
      <img src={imgPath} alt={props.alt} />
    </div>
  )
}
