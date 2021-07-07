import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import UserList from '../components/UserList'
import { User } from '../../shared/models/types'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { useRequest } from '../../shared/hooks/useRequest'
import HerokuSpinner from '../components/HerokuSpinner'

type UsersProps = {
  firstPageLoaded: boolean
  setFirstPageLoaded: Dispatch<SetStateAction<boolean>>
}

const Users: React.FC<UsersProps> = ({
  setFirstPageLoaded,
  firstPageLoaded,
}) => {
  const { sendRequest, error, clearError, isLoading } = useRequest()

  const [loadedUsers, setLoadedUsers] = useState<User[] | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const responseData = await sendRequest<{ users: User[] }>(
        `${process.env.REACT_APP_SERVER_URL}/api/users`
      )

      if (responseData) {
        setLoadedUsers(responseData.users)
        setFirstPageLoaded(true)
      }
    }

    fetchUsers()
  }, [sendRequest, setFirstPageLoaded])

  return (
    <React.Fragment>
      <ErrorModal errorText={error} clearModal={clearError} />
      <HerokuSpinner isLoading={!firstPageLoaded} />
      <UserList users={loadedUsers} />
    </React.Fragment>
  )
}

export default Users
