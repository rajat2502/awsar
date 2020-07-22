import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { getProfile } from 'api';

import Icon from 'components/Icon';

function OrgProfile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    setError(null);
    const data = await getProfile(username, 'Employer');
    if (data.error) setError(data.error.detail);
    else setUserData(data);
    setLoading(false);
  }, [username]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (!localStorage.getItem('token')) return <Redirect to="/login" />;
  if (error) return <div className="m-auto text-3xl font-bold">{error}</div>;
  if (!userData || loading)
    return <div className="m-auto text-3xl font-bold">Loading...</div>;

  console.log(userData);
  if (!localStorage.getItem('token')) return <Redirect to="/login" />;

  return (
    <div className="shadow rounded py-4 px-6 m-auto w-5/6 md:1/5 sm:w-1/2 bg-white">
      <div className="m-auto flex h-40 w-40 border-solid border-4 border-gray-600 rounded-full">
        <img
          src={userData.image}
          alt="user-profile"
          className="border-solid border-2 border-white m-auto rounded-full"
        />
      </div>
      <p className="text-center uppercase text-3xl font-bold text-indigo-600">
        {userData.company_name}
      </p>
      {userData.full_form && (
        <p className="text-center text-lg font-bold text-blue-500">
          {userData.full_form}
        </p>
      )}
      <div className="flex justify-center mx-2 mt-2">
        <div className="w-1/2 font-bold">
          <p>Industry</p>
          <p>Location</p>
          <p>Email</p>
          <p>Org Size</p>
          <p>Org type</p>
          <p>Pan number</p>
        </div>
        <div className="w-1/2">
          <p>{userData.industry}</p>
          <p>{userData.location}</p>
          <a href={`mailto:${userData.email}`} className="block text-blue-500">
            {userData.email}
          </a>
          <p>{userData.company_size}</p>
          <p>{userData.company_type}</p>
          <p>{userData.pan}</p>
        </div>
      </div>
      <div>
        <p className="mt-2 text-blue-600 text-xl">Important Links</p>
        <div className="flex">
          {userData.linkedin && (
            <a
              href={userData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1">
              <Icon name="linkedin" />
            </a>
          )}
          {userData.website && (
            <a
              href={userData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1">
              <Icon name="github" />
            </a>
          )}
          {userData.twitter && (
            <a
              href={userData.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-1">
              <Icon name="twitter-2" />
            </a>
          )}
        </div>
      </div>
      <div>
        <p className="mt-2 text-blue-600 text-xl">Overview</p>
        <p className="text-gray-700">{userData.overview}</p>
      </div>
    </div>
  );
}

export default OrgProfile;
