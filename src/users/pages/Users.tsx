import React, { useEffect, useState } from 'react'
import UserList from '../components/UserList'
import { User } from '../../shared/models/types'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { useRequest } from '../../shared/hooks/useRequest'

const Users: React.FC = (props) => {
  const { sendRequest, error, clearError } = useRequest()

  const [loadedUsers, setLoadedUsers] = useState<User[] | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      // simulate Heroku spinning up from sleep
      await new Promise((resolve) => setTimeout(resolve, 5000))
      const responseData = await sendRequest<{ users: User[] }>(
        `${process.env.REACT_APP_SERVER_URL}/api/users`
      )
      if (responseData) {
        setLoadedUsers(responseData.users)
      }
    }

    fetchUsers()
  }, [sendRequest])

  return (
    <React.Fragment>
      <ErrorModal errorText={error} clearModal={clearError} />
      <UserList users={loadedUsers} />
    </React.Fragment>
  )
}

export default Users
