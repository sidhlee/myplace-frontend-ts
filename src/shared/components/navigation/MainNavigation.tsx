import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { bp } from '../../styled/vars';

import MainHeader from './MainHeader';

const StyledMainNavigation = styled.div<MainNavigationProps>`
  /* display: ${(props) => (props.sideDrawer ? 'block' : 'none')};
  height: 100%;
  @media (min-width: ${bp.desktop}) {
    display: block;
  } */
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
    margin: 0;
    a {
      text-decoration: none;
      color: var(--cl-white);
    }
  }
`;

type MainNavigationProps = {
  sideDrawer?: boolean;
};

/**
 * Renders side-drawer and nav-bar, both of which contain nav-links
 * @param props
 */
const MainNavigation: React.FC<MainNavigationProps> = (props) => {
  return (
    <StyledMainNavigation>
      {/* SideDrawer will be placed here */}
      {/* De-couple Navbar(MainHeader) from its content */}
      <MainHeader>
        {/* We can re-use MainHeader wrapping on different components
         */}
        <button className="main-navigation__menu-btn">
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">MyPlace</Link>
        </h1>
        <nav>NavLinks</nav>
      </MainHeader>
    </StyledMainNavigation>
  );
};

export default MainNavigation;
