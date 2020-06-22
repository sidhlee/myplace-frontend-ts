import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import MainNavigation from './shared/components/navigation/MainNavigation';
import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';

function App() {
  return (
    <Router>
      <MainNavigation />
      <main className="App">
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="places/new">
            <NewPlace />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
