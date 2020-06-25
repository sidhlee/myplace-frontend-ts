import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import MainNavigation from './shared/components/navigation/MainNavigation'
import Users from './users/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import UpdatePlace from './places/pages/UpdatePlace'
import Auth from './users/pages/Auth'

function App() {
  return (
    <Router>
      <MainNavigation />
      <main className="App">
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
          <Route path="/auth">
            <Auth />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  )
}

export default App
