import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { bp } from '../../styled/vars';

const StyledNavLinks = styled.ul<NavLinksProps>`
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  /* hide from mobile navbar */
  /* Only show inside side-drawer on mobile view */
  display: ${(props) => (props.isSideDrawer ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  li {
    margin: 1em;
    a,
    button {
      color: var(--text-inverse);
      white-space: nowrap;
    }
    a {
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
  }

  @media (min-width: ${bp.desktop}) {
    display: flex;
    flex-direction: row;
  }
`;

type NavLinksProps = {
  isSideDrawer?: boolean;
};

const NavLinks: React.FC<NavLinksProps> = (props) => {
  return (
    <StyledNavLinks>
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/place">My Place</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">Add Place</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Authenticate</NavLink>
      </li>
    </StyledNavLinks>
  );
};

export default NavLinks;
