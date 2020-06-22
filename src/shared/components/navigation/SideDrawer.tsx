import React from 'react';
import styled from 'styled-components';

const StyledSideDrawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  max-width: 20em;
  height: 100vh;
  background: var(--cl-primary);
  box-shadow: var(--box-shadow);
  z-index: var(--z-drawer);

  &.slide-in-left-enter {
    transform: translateX(-100%);
  }
  &.slide-in-left-enter-active {
    transition: all 200ms;
    transform: translateX(0);
    opacity: 1;
  }
  &.slide-in-left-exit {
    transform: translateX(0);
    opacity: 1;
  }
  &.slide-in-left-exit-active {
    transition: all 200ms;
    transform: translateX(-100%);
    opacity: 0;
  }
`;
const SideDrawer: React.FC = (props) => {
  return <StyledSideDrawer>{props.children}</StyledSideDrawer>;
};

export default SideDrawer;
