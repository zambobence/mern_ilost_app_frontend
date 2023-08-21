import React from 'react'

export default function CreatorData(props) {
  return (
    <div>
        {props.data.first_name && <p>{props.data.first_name}</p>}
        {props.data.last_name && <p>{props.data.last_name}</p>}
        {props.data.phone && <p>{props.data.phone}</p>}
        <p>
            Email: {props.data.email}
        </p>

    </div>
  )
}
