import React, { useState, useCallback } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { AuthContext } from './shared/context/AuthContext'

import MainNavigation from './shared/components/navigation/MainNavigation'
import Users from './users/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './users/pages/Auth'
import { SkeletonTheme } from 'react-loading-skeleton'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  // If callback is passed down to change the local state,
  // they should be wrapped inside useCallback to prevent infinite loop
  const login = useCallback((uid) => {
    setIsLoggedIn(true)
    setUserId(uid)
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  const route = isLoggedIn ? (
    <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/places">
        <UserPlaces />
      </Route>
      <Route path="/places/new">
        <NewPlace />
      </Route>
      <Route path="/places/:placeId">
        <UpdatePlace />
      </Route>
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/places">
        <UserPlaces />
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  )

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        login,
        logout,
      }}
    >
      <Router>
        <MainNavigation />
        <SkeletonTheme color="#f5f5f5" highlightColor="#eee">
          <main className="App">{route}</main>
        </SkeletonTheme>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
