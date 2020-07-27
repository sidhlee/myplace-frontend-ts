import React, { useContext } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { bp } from '../../vars'
import { AuthContext } from '../../context/AuthContext'
import { MdHome, MdAddCircleOutline, MdArrowDropDown } from 'react-icons/md'
import Avatar from '../UIElements/Avatar'

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
    a,
    button {
      color: var(--text-inverse);
      white-space: nowrap;
    }
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.5em;
      &:hover,
      &:active {
        background: var(--text-accent);
      }
    }
    button {
      font: inherit;
      background: transparent;
      border: 1px solid var(--text-inverse);
      padding: 0.5rem;
      &:hover,
      &:active {
        background: var(--text-accent);
        color: var(--cl-white);
      }
    }
    a:focus,
    button:focus {
      outline: thin dotted;
    }

    .nav-icon {
      width: 30px;
      height: 30px;
      &.dropdown {
        color: var(--cl-white);
      }
    }

    .nav-user {
      display: flex;
      align-items: center;
      &__avatar {
        width: 25px;
        height: 25px;
        margin-right: 5px;
      }
      &__name {
        font-size: 1.2rem;
      }
    }
  }

  @media (min-width: ${bp.desktop}) {
    display: ${(props) => (props.sideDrawer ? 'none' : 'flex')};
    flex-direction: row;
    .home {
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
  // TODO: add dropdown menu
  // User icon will drop down MyPlace + logout
  // Replace "New Place" with icon (+)
  // https://www.youtube.com/watch?v=IF6k0uZuypA
  // Replace "ALL USERS" with MyPlace logo

  return (
    <StyledNavLinks>
      <li className="home">
        <NavLink to="/" exact>
          {sd ? 'Home' : <MdHome className="nav-icon" />}
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
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
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">
            {sd ? 'New Place' : <MdAddCircleOutline className="nav-icon" />}
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">Sign in</NavLink>
        </li>
      )}
      <li>
        <MdArrowDropDown className="nav-icon dropdown" />
      </li>
      {/* {auth.isLoggedIn && (
        <li>
          <button type="button" onClick={auth.logout}>
            Sign out
          </button>
        </li>
      )} */}
    </StyledNavLinks>
  )
}

export default NavLinks
