import React, { useContext } from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom'

import { bp } from '../../vars'
import { AuthContext } from '../../context/AuthContext'
import { MdHome, MdAddCircleOutline, MdArrowDropDown } from 'react-icons/md'
import Avatar from '../UIElements/Avatar'

import { ReactComponent as HomeIcon } from '../../image/home-icon.svg'
import { ReactComponent as HomeIconOutline } from '../../image/home-icon-outline.svg'
import { ReactComponent as PlusIcon } from '../../image/plus-icon.svg'
import { ReactComponent as CaretIcon } from '../../image/caret-icon.svg'
import DropdownButton from './DropdownButton'
import NavItem from './NavItem'

const StyledNavLinks = styled.ul<NavLinksProps>`
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  /* hide from mobile navbar */
  /* Only show inside side-drawer on mobile view */
  display: ${(props) => (props.sideDrawer ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  li {
    margin-right: 3px;
  }

  @media (min-width: ${bp.desktop}) {
    display: ${(props) => (props.sideDrawer ? 'none' : 'flex')};
    flex-direction: row;
    .home {
      display: none;
    }
  }

  @media (min-width: 500px) {
    .home {
      display: block;
      position: absolute;
      left: calc(50% - 15px);
    }
  }
`

type NavLinksProps = {
  sideDrawer?: boolean
}

const NavLinks = ({ sideDrawer: sd }: NavLinksProps) => {
  const auth = useContext(AuthContext)
  const { pathname } = useLocation()
  // TODO: add dropdown menu
  // User icon will drop down MyPlace + logout
  // Replace "New Place" with icon (+)
  // https://www.youtube.com/watch?v=IF6k0uZuypA
  // Replace "ALL USERS" with MyPlace logo

  return (
    <StyledNavLinks>
      <NavItem className="home" type="link" to="/" exact>
        {sd ? 'Home' : pathname === '/' ? <HomeIcon /> : <HomeIconOutline />}
      </NavItem>

      {auth.isLoggedIn && (
        <NavItem type="link" to="/places/new">
          {sd ? 'New Place' : <MdAddCircleOutline className="nav-icon" />}
        </NavItem>
      )}
      {!auth.isLoggedIn && (
        <NavItem type="link" to="/auth">
          Sign in
        </NavItem>
      )}
      {auth.isLoggedIn && (
        <DropdownButton icon={<CaretIcon />}>
          <div>
            <NavLink to={`/${auth.userId}/places`}>
              <div className="nav-user">
                <div className="nav-user__avatar">
                  <Avatar
                    src={
                      auth.userImageUrl ||
                      require('../../image/Portrait_Placeholder.png')
                    }
                    alt={auth.userName || ''}
                  />
                </div>
                <div className="nav-user__name">{auth.userName}</div>
              </div>
            </NavLink>
            <button type="button" onClick={auth.logout}>
              Sign out
            </button>
          </div>
        </DropdownButton>
      )}
    </StyledNavLinks>
  )
}

export default NavLinks
