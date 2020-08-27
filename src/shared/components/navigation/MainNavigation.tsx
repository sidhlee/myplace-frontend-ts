import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { bp } from '../../vars'

import SideDrawer from './SideDrawer'
import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import Backdrop from '../UIElements/Backdrop'

// Extending MainHeader to style the nested components
const Navbar = styled(MainHeader)`
  .main-navigation__menu-btn {
    --size: 2.5rem;
    width: var(--size);
    height: var(--size);
    background: transparent;
    border: none;
    margin-right: 1em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 4px;
    span {
      display: block;
      width: 100%;
      height: 4px;
      background: var(--cl-white);
    }
    @media (min-width: ${bp.desktop}) {
      display: none;
    }
  }

  .main-navigation__title {
    font-family: 'Lobster';
    background-color: var(--cl-primary);
    background-image: linear-gradient(0deg, #0062E0, #19AFFF);
    background-size: 100%;
    background-repeat: repeat;
    margin: 0;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; 
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    a {
      text-decoration: none;
      color: var(--text-main);
    }
  }
`

type MainNavigationProps = {
  sideDrawer?: boolean
}

/**
 * Renders side-drawer and nav-bar, both of which contain nav-links
 * @param props
 */
const MainNavigation: React.FC<MainNavigationProps> = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = () => {
    setIsDrawerOpen(true)
  }
  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <>
      {/* In order for CSSTransition to work, animating component should be rendered unconditionally */}
      <SideDrawer show={isDrawerOpen} closeDrawer={closeDrawer} />
      <Backdrop show={isDrawerOpen} onClick={closeDrawer} />}
      {/* De-couple Navbar(MainHeader) from its content */}
      <Navbar>
        {/* We can re-use MainHeader wrapping on different components
         */}
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">MyPlace</Link>
        </h1>
        <nav>
          <NavLinks />
        </nav>
      </Navbar>
    </>
  )
}

export default MainNavigation
