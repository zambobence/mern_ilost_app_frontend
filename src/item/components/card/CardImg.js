import React from 'react'
import './CardImg.css'
export default function CardImg(props) {
  const imgPath = process.env.REACT_APP_BACKEND_URL + '/' + props.src

  return (
    <div className='card-img'>
        <img src={imgPath} alt={props.alt} />
    </div>
  )
}
