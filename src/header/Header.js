import React, { useState } from 'react'
import NavLinks from './NavLinks'
import Container from '../shared/UI/Container'
import Logo from './Logo'
import './Header.css'
import MenuToggler from './MenuToggler'
import MobileNavigation from './MobileNavigation'
import DesktopNavigation from './DesktopNavigation'
export default function Header(props) {

  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(prevState => !prevState)
  }

  const closeMenu = () => {
    setShowMenu(false)
  }


  return (
    <header>
        <Container>
          <MobileNavigation>
            <MenuToggler onClick={toggleMenu} />
            <Logo />
            {showMenu && <NavLinks onClick={closeMenu} />}
          </MobileNavigation>
          <DesktopNavigation>
            <Logo />
            <NavLinks />
          </DesktopNavigation>
        </Container>
    </header>
  )
}
