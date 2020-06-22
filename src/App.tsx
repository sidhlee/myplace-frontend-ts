import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="places/new">
          <NewPlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
