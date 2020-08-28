import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import User from './User'

const StyledNavUser = styled('li')`
  --size: calc(var(--main-header_height) * 0.8);
  height: var(--size);
  position: relative;
  display: block;
  background: #e7f3ff;
  border-radius: 1.5rem;
  padding: 5px;
  padding-right: 1rem;
  a {
    --size: calc(var(--main-header-height) * 0.66);
    height: var(--size);
    color: var(--cl-primary);
  }
  transition: filter 0.3s ease;
  &:hover {
    transition: none;
    filter: brightness(0.95);
  }
`

type NavUserProps = {
  to: string
  className?: string
}

const NavUser = ({ to, className }: NavUserProps) => {
  return (
    <StyledNavUser className={className}>
      <NavLink to={to}>
        <User small />
      </NavLink>
    </StyledNavUser>
  )
}

export default NavUser
