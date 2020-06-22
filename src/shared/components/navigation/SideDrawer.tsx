import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const StyledSideDrawer = styled.aside`
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

type SideDrawerProps = {
  show: boolean;
  closeDrawer: () => void;
};
const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <StyledSideDrawer onClick={props.closeDrawer}>
        {props.children}
      </StyledSideDrawer>
    </CSSTransition>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById('drawer-hook')!
  );
};

export default SideDrawer;
