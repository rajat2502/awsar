import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from 'components/Commom/PrivateRoute';
import Home from 'components/Home';
import Profile from 'components/Profile/Profile';
import Jobs from 'components/Jobs/index/';
import Login from 'components/Login/Login';
import Signup from 'components/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
