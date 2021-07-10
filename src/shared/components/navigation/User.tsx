import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Avatar from '../UIElements/Avatar'
import { StyledUser } from './navigation-styles'
import userPlaceholder from '../../../shared/image/Portrait_Placeholder.png'

type UserProps = {
  small?: boolean
}

// TODO: DEBUG - User not re-rendering after new user signup with bew userImageURL
const User = ({ small }: UserProps) => {
  const auth = useContext(AuthContext)
  return (
    <StyledUser small={!!small}>
      <div className="user__avatar">
        <Avatar
          src={auth.userImageUrl || userPlaceholder}
          alt={auth.userName || ''}
        />
      </div>
      <section className="user__body">
        <h1>{auth.userName}</h1>
        {small ? null : <p>See your places</p>}
      </section>
    </StyledUser>
  )
}

export default User
