import React from 'react'
import './Avatar.css'
export default function Avatar(props) {
  return (
    <div className='avatar'>
        <img src={props.src || 'https://images.unsplash.com/photo-1534294668821-28a3054f4256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dW5rbm93bnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'} alt={props?.alt} />
    </div>
  )
}
