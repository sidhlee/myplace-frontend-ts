import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'

import { config } from '../../vars'

const StyledSideDrawer = styled(animated.aside)`
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  max-width: 20em;
  height: 100vh;
  background: var(--cl-primary);
  box-shadow: var(--box-shadow);
  z-index: var(--z-drawer);
`

type SideDrawerProps = {
  show: boolean
  closeDrawer: () => void
}
const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  const transition = useTransition(props.show, null, {
    from: {
      opacity: 1,
      transform: `translate3d(-100%,0,0)`,
    },
    enter: {
      opacity: 1,
      transform: `translate3d(0,0,0)`,
    },
    leave: {
      opacity: 0,
      transform: `translate3d(-100%,0,0)`,
    },
    config: config.smart,
  })

  const content = (
    <>
      {transition.map(
        ({ item, key, props: transition }) =>
          item && (
            <StyledSideDrawer
              onClick={props.closeDrawer}
              key={key}
              style={transition}
            >
              {props.children}
            </StyledSideDrawer>
          )
      )}
    </>
  )
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook')!)
}

export default SideDrawer
