import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from 'styles/globalStyles';

import Navbar from 'components/layout/Navbar';
import Footer from 'components/layout/Footer';
import Home from 'components/Home';
import Login from 'components/Login';
import Signup from 'components/Signup';
import CreateJob from 'components/CreateJob';
import CreateProfile from 'components/CreateProfile';
import Profile from 'components/Profile';
import OrgProfile from 'components/OrgProfile';
import Jobs from 'components/Jobs';
import Job from 'components/Job';
import EmployeeDashboard from 'components/EmployeeDashboard';
import OrgDashboard from 'components/OrgDashboard';
import Error404 from 'components/Error404';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('user'));
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
            <Route
              exact
              path="/createProfile"
              render={(props) => <CreateProfile user={user} {...props} />}
            />
            <Route
              exact
              path="/createJob"
              render={(props) => <CreateJob user={user} {...props} />}
            />
            <Route exact path="/profile/:username" component={Profile} />
            <Route exact path="/org/:username" component={OrgProfile} />
            <Route exact path="/jobs" component={Jobs} />
            <Route
              exact
              path="/job/:id"
              render={(props) => <Job user={user} {...props} />}
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                user.role === 'Employee' ? (
                  <EmployeeDashboard user={user} {...props} />
                ) : (
                  <OrgDashboard user={user} {...props} />
                )
              }
            />
            <Route component={Error404} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
