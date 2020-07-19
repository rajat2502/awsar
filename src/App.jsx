import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/globalStyles';

// import PrivateRoute from 'components/common/PrivateRoute'; - define later
import Navbar from 'components/layout/Navbar';
import Footer from 'components/layout/Footer';
import Home from 'components/Home';
import Login from 'components/Login';
import Signup from 'components/Signup';
import Profile from 'components/Profile';
import Jobs from 'components/Jobs';
import Dashboard from 'components/Dashboard';
import Error404 from 'components/Error404';

function App() {
  return (
    <ThemeProvider theme={{}}>
      <div className="App">
        <GlobalStyles />
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/jobs" component={Jobs} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route component={Error404} />
          </Switch>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
