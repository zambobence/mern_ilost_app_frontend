import React from 'react'

export default function CreatorData({data}) {
  return (
    <div>
        {data?.first_name && <p>{data?.first_name}</p>}
        {data?.last_name && <p>{data?.last_name}</p>}
        {data?.phone && <p>{data?.phone}</p>}
        <p>
            Email: {data?.email}
        </p>

    </div>
  )
}
