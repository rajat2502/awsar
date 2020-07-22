import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { getProfile } from 'api';

function OrgProfile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log(username);
    const userDetails = getProfile(username, 'Employee');
    setUserData(userDetails);
  }, [username]);

  if (!localStorage.getItem('token')) return <Redirect to="/login" />;

  return <div>OrgProfile</div>;
}

export default OrgProfile;
