import { createContext } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  userId: null | string
  login: (uid: string, token: string) => void
  logout: () => void
  token: string | null
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
  token: null,
})
