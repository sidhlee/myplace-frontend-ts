import { createContext } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  userId: null | string
  login: (uid: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
})
