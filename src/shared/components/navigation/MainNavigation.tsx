import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { bp } from '../../styled/vars';

import SideDrawer from './SideDrawer';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import Backdrop from '../UIElements/Backdrop';

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <React.Fragment>
      {/* SideDrawer will be placed here */}
      {/* De-couple Navbar(MainHeader) from its content */}
      {isDrawerOpen && (
        <>
          <SideDrawer>
            <nav style={{ height: '100%' }}>
              <NavLinks isSideDrawer />
            </nav>
          </SideDrawer>
          <Backdrop onClick={closeDrawer} />
        </>
      )}
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
    </React.Fragment>
  );
};

export default MainNavigation;
