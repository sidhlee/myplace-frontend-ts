import React from 'react'
import styled from 'styled-components'
import { bp } from '../../styled/vars'

const StyledMainHeader = styled.div`
  width: 100%;
  height: var(--main-header-height);
  background: var(--cl-primary);
  position: fixed;
  z-index: var(--z-navbar);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding: 0 1em;
  @media (min-width: ${bp.desktop}) {
    justify-content: space-between;
    padding: 0 2em;
  }
`
const MainHeader: React.FC = (props) => {
  // To be able to extend the style,
  // you need to attach the passed className prop to a DOM element
  return <StyledMainHeader {...props}>{props.children}</StyledMainHeader>
}

export default MainHeader
