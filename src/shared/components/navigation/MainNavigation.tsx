import styled from 'styled-components'
import { Link } from 'react-router-dom'

import MainHeader from './MainHeader'
import NavLinks from './NavLinks'

// Extending MainHeader to style the nested components
const Navbar = styled(MainHeader)`
  /* box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1); */
  .main-navigation__title {
    font-family: 'Lobster';
    background-color: var(--cl-primary);
    background-image: linear-gradient(0deg, #0062e0, #19afff);
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
  return (
    <>
      {/* De-couple Navbar(MainHeader) from its content */}
      <Navbar>
        {/* We can re-use MainHeader wrapping on different components
         */}
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
