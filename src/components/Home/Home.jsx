import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Link to="/profile/rajat">
      <span>Rajat</span>
    </Link>
  );
}

export default Home;
