import React from 'react';

import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './Navbar.css';

const Navbar = (props) => {
  return (
    <div>
      <div className="bg-gray-400 flex items-center p-2">
        <img
          className="h-10"
          src={require('assets/govt-uk.png')}
          alt="govt. logo"
        />
        <p className="mx-2 text-xl font-medium">
          GOVERNMENT OF UTTARAKHAND
          <span className="text-base"> - NATIONAL WEB PORTAL FOR JOBS</span>
        </p>
      </div>

      <header className="flex items-center justify-between">
        <div className="logo flex items-end text-lg font-bold">
          <Link className="m-1" to="/">
            <img
              src={require('assets/awsar.png')}
              className="h-10"
              alt="Awsar Logo"
            />
          </Link>
          <Link to="/jobs" className="mx-2 text-blue-700 hover:text-blue-800">
            Jobs
          </Link>
          <Link to="/" className="text-blue-700 hover:text-blue-800">
            Organizations
          </Link>
        </div>

        <input id="nav" type="checkbox" />
        <label htmlFor="nav" />
        <nav>
          <ul>
            <li className="mx-2">
              <Link to="/postresume">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Post Resume
                </button>
              </Link>
            </li>
            <li className="mx-2">
              <Link to="/hire">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Post Job
                </button>
              </Link>
            </li>
            <li className="ml-2">
              {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Logout
              </button> */}
              <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Login
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
