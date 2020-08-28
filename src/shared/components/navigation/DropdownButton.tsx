import React, { useState } from 'react'

import NavItem from './NavItem'
import { DropdownBackdrop } from './navigation-styles'

type DropdownButtonProps = {
  children: React.ReactNode
  icon: React.ReactNode
}

const DropdownButton = ({ icon, children }: DropdownButtonProps) => {
  const [open, set] = useState(false)
  return (
    <>
      <NavItem type="button" circle onClick={() => set(!open)}>
        {icon}
      </NavItem>
      {open && (
        <DropdownBackdrop onClick={() => set(false)}>
          {children}
        </DropdownBackdrop>
      )}
    </>
  )
}

export default DropdownButton
