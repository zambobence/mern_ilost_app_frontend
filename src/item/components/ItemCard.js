import React from 'react'
import './ItemCard.css'
import CardImg from './CardImg'
import { Link } from 'react-router-dom'

export default function ItemCard(props) {
    const {item, className} = props
  return (
    <div className={`card ${className}`}>
        <p><Link to={`/item/${item._id}`}>LINK</Link></p>
        <h1>{item.title}</h1>
        <CardImg src={item.imageUrl} alt={item.title} />
        <h2>{item.title}</h2>
        <p>Type: {item.type}</p>
        <p>Color: {item.color}</p>
        <p>Distance {(item.distance / 1000).toFixed(2)} km</p>
        <p>Location: {item.location.formattedAddress}</p>
        <p>{item.lost ? "Lost": "Found"} on {item.timeLost}</p>
    </div>
  )
}
