import React, { useContext } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import { bp } from 'styles'
import { AuthContext } from '../../context/AuthContext'

import { ReactComponent as HomeIcon } from '../../image/home-icon.svg'
import { ReactComponent as HomeIconOutline } from '../../image/home-icon-outline.svg'
import { ReactComponent as PlusIcon } from '../../image/plus-icon.svg'
import { ReactComponent as CaretIcon } from '../../image/caret-icon.svg'
import DropdownButton from './DropdownButton'
import NavItem from './NavItem'
import DropdownMenu from './DropdownMenu'
import NavUser from './NavUser'

const StyledNavLinks = styled.ul<NavLinksProps>`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  li {
    margin-right: 3px;
  }
  .home {
    display: none;
  }

  @media (min-width: ${bp.desktop}) {
    .home {
      display: block;
      position: absolute;
      left: calc(50% - 20px);
    }
  }

  .nav-user {
    display: none;
  }
  @media (min-width: 800px) {
    .nav-user {
      display: block;
    }
  }
`

type NavLinksProps = {
  sideDrawer?: boolean
}

const NavLinks = ({ sideDrawer: sd }: NavLinksProps) => {
  const auth = useContext(AuthContext)
  const { pathname } = useLocation()

  return (
    <StyledNavLinks>
      <NavItem className="home" type="link" to="/" exact>
        {sd ? (
          'Home'
        ) : pathname === '/' ? (
          <HomeIcon style={{ height: 30, width: 30 }} />
        ) : (
          <HomeIconOutline style={{ height: 30, width: 30 }} />
        )}
      </NavItem>
      {auth.isLoggedIn && (
        <NavUser className="nav-user" to={`/${auth.userId}/places`} />
      )}
      {auth.isLoggedIn && (
        <NavItem type="link" to="/places/new" circle>
          {sd ? 'New Place' : <PlusIcon className="nav-icon" />}
        </NavItem>
      )}
      {!auth.isLoggedIn && (
        <NavItem type="link" to="/auth">
          Sign in
        </NavItem>
      )}

      {auth.isLoggedIn && (
        <DropdownButton icon={<CaretIcon />}>
          <DropdownMenu />
        </DropdownButton>
      )}
    </StyledNavLinks>
  )
}

export default NavLinks
