import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import PrivateRoute from 'components/Commom/PrivateRoute';
import Home from 'components/Home';
import Profile from 'components/Profile';
import Jobs from 'components/Jobs';
import Login from 'components/Login';
import Signup from 'components/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
