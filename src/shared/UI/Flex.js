import React from 'react'

export default function Flex(props) {
  return (
    <div className='flex' style={{...props.style}}>
        {props.children}
    </div>
  )
}
