import React, { useContext } from 'react'
import styled from 'styled-components'

import { AuthContext } from '../../context/AuthContext'
import Avatar from '../UIElements/Avatar'

const StyledUser = styled.div``

type UserProps = {}

const User = (props: UserProps) => {
  const auth = useContext(AuthContext)
  return (
    <StyledUser>
      <Avatar
        src={
          auth.userImageUrl || require('../../image/Portrait_Placeholder.png')
        }
        alt={auth.userName || ''}
      />
    </StyledUser>
  )
}

export default User
