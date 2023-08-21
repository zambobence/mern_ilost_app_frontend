import React from 'react'
import './ItemCard.css'
import CardImg from './CardImg'
import CardContent from './CardContent'
import { Link } from 'react-router-dom'

export default function ItemCard(props) {
    const {item, className} = props

  return (
    <div className={`card ${className}`}>
        <Link to={`/item/${item._id}`}>
          <CardImg src={item.imageUrl} alt={item.title} />
          <CardContent item={item} />
        </Link>
    </div>
  )
}
