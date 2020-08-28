import React, { useState } from 'react'

import NavItem from './NavItem'

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
      {open && children}
    </>
  )
}

export default DropdownButton
