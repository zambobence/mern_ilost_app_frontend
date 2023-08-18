import React from 'react'
import DateComponent from './DateComponent'
export default function CardContent({item}) {
  return (
    <div className='card-content'>
        <h2>{item.title}</h2>
        <p>Type: {item.type}</p>
        <p>Color: {item.color}</p>
        {item.distance && <p>Distance {(item.distance / 1000).toFixed(2)} km</p>}
        <p>{item.lost ? "Lost " : "Found "}<DateComponent date={item.timeLost} /></p>
    </div>
  )
}
