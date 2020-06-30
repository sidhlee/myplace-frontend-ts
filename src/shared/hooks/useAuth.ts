import { useState, useEffect, useCallback } from 'react'

export const useAuth = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null
  )

  const login = useCallback(
    (userId: string, token: string, expirationDate?: Date) => {
      setUserId(userId)
      setToken(token)
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 3600 * 1000)
      setTokenExpirationDate(tokenExpirationDate)

      const userData = {
        userId,
        token,
        tokenExpiration: tokenExpirationDate.toISOString(),
      }
      localStorage.setItem('userData', JSON.stringify(userData))
    },
    []
  )

  const logout = useCallback(() => {
    // clear local state
    setUserId(null)
    setToken(null)
    setTokenExpirationDate(null)
    // clear localStorage
    localStorage.removeItem('userData')
  }, [])

  // Auto-login on mount if userId and token is found in localStorage
  // and current Date is before the expiration date
  useEffect(() => {
    const item = localStorage.getItem('userData')
    if (item) {
      const { userId, token, tokenExpiration } = JSON.parse(item)
      const tokenExpirationDate = new Date(tokenExpiration)
      if (userId && token && new Date() < tokenExpirationDate) {
        login(userId, token, tokenExpirationDate)
      }
    }
  }, [login]) // only runs on mount (login never changes)

  // Set timeout for auto-logout
  useEffect(() => {
    let logoutTimer: number | undefined
    // token & tokenExpirationDate exist, recalculate remaining time and re-set the timer
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      // token or tokenExpirationDate doesn't exist -> user logged out
      clearTimeout(logoutTimer)
    }

    return () => {
      // clear timeout on unmount(page reload)
      clearTimeout(logoutTimer)
    }

    // tokenExpirationDate will be a new object with every login & page reload
  }, [token, tokenExpirationDate, logout])

  return { userId, token, login, logout }
}
