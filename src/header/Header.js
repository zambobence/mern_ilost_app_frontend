import React from 'react'
import NavLinks from './NavLinks'
import Container from '../shared/UI/Container'
import Logo from './Logo'
import './Header.css'
import MenuToggler from './MenuToggler'
import MobileNavigation from './MobileNavigation'
import DesktopNavigation from './DesktopNavigation'

export default function Header(props) {
  return (
    <header>
        <Container>
          <MobileNavigation>
            <MenuToggler onClick={props.toggleMenu} />
            <Logo />
            {props.show && <NavLinks />}
          </MobileNavigation>
          <DesktopNavigation>
            <Logo />
            <NavLinks />
          </DesktopNavigation>
        </Container>
    </header>
  )
}
