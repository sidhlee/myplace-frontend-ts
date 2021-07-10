import { useContext } from 'react'

import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { StyledDropdownMenu, DropdownMenuItem } from './navigation-styles'
import { ReactComponent as SignoutIcon } from '../../image/logout-icon.svg'
import User from './User'

type DropdownMenuProps = {}

const DropdownMenu = (props: DropdownMenuProps) => {
  const auth = useContext(AuthContext)
  return (
    <StyledDropdownMenu>
      <DropdownMenuItem>
        <NavLink to={`/${auth.userId}/places`}>
          <User />
        </NavLink>
      </DropdownMenuItem>
      <hr />
      <DropdownMenuItem>
        <button type="button" onClick={auth.logout}>
          <span className="icon">
            <SignoutIcon />
          </span>
          Sign Out
        </button>
      </DropdownMenuItem>
    </StyledDropdownMenu>
  )
}

export default DropdownMenu
