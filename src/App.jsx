import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from 'styles/globalStyles';

import PrivateRoute from 'components/common/PrivateRoute';
import Navbar from 'components/layout/Navbar';
import Footer from 'components/layout/Footer';
import Home from 'components/Home';
import Login from 'components/Login';
import Signup from 'components/Signup';
import Profile from 'components/Profile';
import Jobs from 'components/Jobs';
import CreateJob from 'components/CreateJob';
import CreateProfile from 'components/CreateProfile';
import Dashboard from 'components/Dashboard';
import Error404 from 'components/Error404';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user'));
    console.log(userDetails);
    if (userDetails) setUser(userDetails);
  }, []);

  return (
    <ThemeProvider theme={{}}>
      <div className="App">
        <GlobalStyles />
        <Router>
          <Navbar user={user} setUser={setUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login user={user} setUser={setUser} {...props} />
              )}
            />
            <Route
              exact
              path="/signup"
              render={(props) => <Signup setUser={setUser} {...props} />}
            />
            <PrivateRoute
              exact
              path="/createProfile"
              render={(props) => <CreateProfile user={user} {...props} />}
            />
            <PrivateRoute exact path="/profile/:username" component={Profile} />
            <PrivateRoute exact path="/createJob" component={CreateJob} />
            <PrivateRoute exact path="/jobs" component={Jobs} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route component={Error404} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
