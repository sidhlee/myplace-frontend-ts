import React from 'react'
import styled from 'styled-components'
import UserItem from './UserItem'

import { User } from '../../shared/models/types'

const StyledUserList = styled.ul`
  list-style: none;
  max-width: 20rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

type UserListProps = {
  users: User[]
}

const UserList: React.FC<UserListProps> = (props) => {
  if (props.users.length === 0) {
    return (
      <div className="center">
        <h2>No users found.</h2>
      </div>
    )
  }
  return (
    <StyledUserList>
      {props.users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </StyledUserList>
  )
}

export default UserList
