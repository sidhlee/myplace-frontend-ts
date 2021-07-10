import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import UserList from '../components/UserList'
import { User } from '../../shared/models/types'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { useRequest } from '../../shared/hooks/useRequest'
import HerokuSpinner from '../components/HerokuSpinner'
import { useRef } from 'react'

type UsersProps = {
  firstPageLoaded: boolean
  setFirstPageLoaded: Dispatch<SetStateAction<boolean>>
}

const Users: React.FC<UsersProps> = ({
  setFirstPageLoaded,
  firstPageLoaded,
}) => {
  const [takingTooLong, setTakingTooLong] = useState(false)
  const { sendRequest, error, clearError } = useRequest()
  const [loadedUsers, setLoadedUsers] = useState<User[] | null>(null)
  const timeoutRef = useRef<number | undefined>()

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

  useEffect(() => {
    if (!firstPageLoaded) {
      timeoutRef.current = setTimeout(() => {
        setTakingTooLong(true)
      }, 1000)
    }

    return () => clearTimeout(timeoutRef.current)
  }, [firstPageLoaded])

  return (
    <React.Fragment>
      <ErrorModal errorText={error} clearModal={clearError} />
      <HerokuSpinner isLoading={!firstPageLoaded && takingTooLong} />
      <UserList users={loadedUsers} />
    </React.Fragment>
  )
}

export default Users
