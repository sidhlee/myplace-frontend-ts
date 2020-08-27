import React, { useState } from 'react'

import NavItem from './NavItem'

type DropdownButtonProps = {
  children: React.ReactNode
  icon: React.ReactNode
}

const DropdownButton = ({ icon, children }: DropdownButtonProps) => {
  const [open, set] = useState(false)
  return (
    <NavItem type="button" onClick={() => set(!open)}>
      {icon}
      {open && children}
    </NavItem>
  )
}

export default DropdownButton
