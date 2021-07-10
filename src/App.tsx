import React from 'react'
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
import { useAuth } from './shared/hooks/useAuth'
import { useState } from 'react'
import ProtectedRoute from './shared/components/navigation/ProtectedRoutes'

function App() {
  const { userId, userName, userImageUrl, token, login, logout } = useAuth()
  // For showing spinner while heroku server is spinning up
  const [firstPageLoaded, setFirstPageLoaded] = useState(false)

  const isLoggedIn = !!token

  const route = (
    <Switch>
      <Route path="/" exact>
        <Users
          firstPageLoaded={firstPageLoaded}
          setFirstPageLoaded={setFirstPageLoaded}
        />
      </Route>
      <Route path="/:userId/places">
        <UserPlaces />
      </Route>
      <ProtectedRoute authenticated={isLoggedIn} path="/places/new" exact>
        <NewPlace />
      </ProtectedRoute>
      <ProtectedRoute authenticated={isLoggedIn} path="/places/:placeId">
        <UpdatePlace />
      </ProtectedRoute>
      {isLoggedIn ? null : (
        <Route path="/auth">
          <Auth />
        </Route>
      )}
      <Redirect to="/" />
    </Switch>
  )

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userId,
        userName,
        userImageUrl,
        login,
        logout,
        token,
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
