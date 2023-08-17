import React from 'react'
import { Link } from 'react-router-dom'

export default function NavLinks() {
  return (
    <div>
        <Link to="/add-item">Add Items</Link>
        <Link to="/authenticate">Authenticate</Link>
        <Link to="/browse-item">Browse</Link>
    </div>
  )
}
