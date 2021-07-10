import { NavLink } from 'react-router-dom'

import { StyledNavItem } from './navigation-styles'

type NavItemProps = {
  type: 'link' | 'button'
  circle?: boolean
  to?: string
  exact?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

const NavItem = ({
  type,
  circle,
  to,
  exact,
  onClick,
  children,
  className,
}: NavItemProps) => {
  return (
    <StyledNavItem className={className} circle={!!circle}>
      {type === 'link' && to ? (
        <NavLink to={to} exact={exact}>
          {children}
        </NavLink>
      ) : (
        <button onClick={onClick}>{children}</button>
      )}
    </StyledNavItem>
  )
}

export default NavItem
