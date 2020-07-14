import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import PrivateRoute from 'components/common/PrivateRoute'; - define later
import Navbar from 'components/layout/Navbar';
import Footer from 'components/layout/Footer';
import Home from 'components/Home';
import Login from 'components/Login';
import Signup from 'components/Signup';
import Profile from 'components/Profile';
import Jobs from 'components/Jobs';
import Dashboard from 'components/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/jobs" component={Jobs} />
          <Route excat path="/dashboard" component={Dashboard} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
