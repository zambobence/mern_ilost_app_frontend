import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthCtx from '../shared/context/auth-context'
export default function NavLinks(props) {


  const {isLoggedIn, userId, logout} = useContext(AuthCtx)
  
  const authenticatedRoutes = [
    {link: '/', label: 'Browse'},
    {link: `/user/${userId}`, label: 'Profile'},
    {link: '/add-item', label: 'Add item'},
    {link: '/', label: 'Signout', onClick: logout}
  ]

  const publicRoutes = [
    {link: '/', label:'Authentication'},
    {link: '/browse', label: 'Browse'}
  ]

  const protectedNavLinks = authenticatedRoutes.map((e, i) => <Link key={i} to={e.link} onClick={e.onClick}>{e.label}</Link>)
  const publicNavLinks = publicRoutes.map((e, i) => <Link key={i} to={e.link}>{e.label}</Link>)


  return (
    <div className='nav-links' onClick={props?.closeMenu}>
      {isLoggedIn ? protectedNavLinks : publicNavLinks}
    </div>
  )
}
