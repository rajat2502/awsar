import React from 'react';
import { Link } from 'react-router-dom';

import Icon from 'components/Icon';

import './styles/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="main-footer">
        <div>
          <div className="flex my-4">
            <Link to="/">
              <img
                src="https://i.ibb.co/F8xjMks/uttrakhand-logo.png"
                className="awsar-logo"
                alt="uttarakhand government logo"
              />
            </Link>
            <Link to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Emblem_of_India_%28Tira%E1%B9%85g%C4%81%29.svg"
                alt="website-logo"
                className="footer-logo"
              />
            </Link>
          </div>
          <div className="flex">
            <Link to="/">
              <Icon name="instagram" />
            </Link>

            <Link to="/">
              <Icon name="facebook" />
            </Link>

            <Link to="/">
              <Icon name="twitter" />
            </Link>
          </div>
        </div>
        <div className="footer-links">
          <Link to="/postresume">Post Resume</Link>
          <Link to="/">Find Organization</Link>
          <Link to="/jobs">Find a Job</Link>
          <Link to="/hire">Post Job</Link>
        </div>
      </div>
      <div className="copyright-bar bg-blue-600">
        <h6 className="text-sm">@2020 Team Alpha. All Rights Reserved.</h6>
        <div>
          <Link to="/">About us</Link>
          <Link to="/">Contact us</Link>
          <Link to="/jobs">Jobs</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
