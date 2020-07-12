import React from 'react';

import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const Navbar = (props) => {
  const logout = () => {
    props.logout();
  };

  return (
    <div>
      <div>
        <img
          src="https://i.ibb.co/1rBQ1fr/1200px-Seal-of-Uttarakhand-svg.png"
          alt="govt. logo"
        />
        <h2>
          GOVERNMENT OF UTTARAKHAND <br />
          <small>NATIONAL WEB PORTAL FOR JOBS</small>
        </h2>
      </div>

      <div>
        <Link to="/">
          <img src="https://i.ibb.co/FD0qzzT/awsar.png" alt="Awsar Logo" />
        </Link>
        <Link to="/alljobs">Jobs</Link>
        <Link to="/">Organizations</Link>
      </div>

      <input id="nav" type="checkbox" />
      <label htmlFor="nav" />

      <nav>
        <ul>
          <li>
            <Link to="/postresume">
              <button>Post Resume</button>
            </Link>
          </li>
          <li>
            <Link to="/hire">
              <button>Post Job</button>
            </Link>
          </li>
          <li>
            <button onClick={logout} style={{ margin: '5px 8px' }}>
              Logout
            </button>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
