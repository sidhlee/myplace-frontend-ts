import { createContext } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  userId: null | string
  userName: null | string
  userImageUrl: null | string
  login: (
    userId: string,
    userName: string,
    userImageUrl: string,
    token: string,
    expirationDate?: Date
  ) => void
  logout: () => void
  token: string | null
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
  userName: null,
  userImageUrl: null,
  login: () => {},
  logout: () => {},
  token: null,
})
