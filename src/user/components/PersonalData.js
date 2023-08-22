import React from 'react'

export default function PersonalData({userData}) {
  return (
    <div>
      <p>First name: {userData?.first_name}</p>
      <p>Last  name: {userData?.last_name}</p>
      <p>Email name: {userData?.email}</p>
      <p>Phone: {userData?.phone}</p>
    </div>
  )
}
