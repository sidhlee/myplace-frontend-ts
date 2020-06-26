import React, { useEffect, useState } from 'react'
import UserList from '../components/UserList'
import { User } from '../../shared/models/types'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'

const USERS = [
  {
    id: 'u1',
    name: 'Sid',
    email: 'test@test.com',
    image: 'https://placem.at/people?w=400&random=1',
    places: [],
  },
  {
    id: 'u2',
    name: 'Nayoun',
    email: 'test2@test.com',
    image: 'https://placem.at/people?w=400&random=2',
    places: [],
  },
]

const Users: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadedUsers, setLoadedUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api/user`
        )
        const data = await response.json()
        if (!response.ok) {
          throw Error(data.message)
        }

        setLoadedUsers(data.users)
      } catch (err) {
        console.log(err)
        setError(err.message || 'Something went wrong.🙁 Please try again.')
      }
      setIsLoading(false)
    }
    fetchUsers()
  }, [])

  const clearError = () => {
    setError(null)
  }

  return (
    <React.Fragment>
      <ErrorModal errorText={error} clearModal={clearError} />
      <UserList users={loadedUsers} />
    </React.Fragment>
  )
}

export default Users
