import React from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/Icon';

import './styles/Navbar.css';

const Navbar = ({ user, setUser }) => {
  const print = () => window.print();

  const signOut = () => {
    setUser({});
    localStorage.clear();
  };

  return (
    <div>
      <div className="top-nav bg-gray-300 flex justify-between items-center px-2 py-1">
        <div className="flex items-center">
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
        <div className="flex">
          <button className="mx-2" onClick={print} title="Print this page">
            <Icon name="print" />
          </button>
          <div id="google_translate_element"></div>
        </div>
      </div>

      <header className="bg-white flex items-center justify-between">
        <div className="logo flex items-end text-lg font-bold">
          <Link className="m-1" to="/">
            <img
              src={require('assets/awsar.png')}
              className="h-10"
              alt="Awsar Logo"
            />
          </Link>
          <Link to="/jobs" className="mx-3 text-blue-700 hover:text-blue-800">
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
              <Link to={`/profile/${user.username}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Profile
                </button>
              </Link>
            </li>
            <li className="mx-2">
              <Link to="/createProfile">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Create Profile
                </button>
              </Link>
            </li>
            <li className="ml-2">
              {user.username ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={signOut}>
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
