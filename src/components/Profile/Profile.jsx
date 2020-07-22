import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { getProfile } from 'api';

function Profile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDetails = getProfile(username, 'Employee');
    setUserData(userDetails);
  }, [username]);

  if (localStorage.getItem('token')) return <Redirect to="/dashboard" />;

  return <div>Profile</div>;
}

export default Profile;
