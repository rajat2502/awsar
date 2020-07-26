import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';

import { getOrgJobs } from 'api';

import { StyledContainer } from 'components/StyledContainer';

function OrgDashboard({ user }) {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const fetchJobs = useCallback(async () => {
    const jobs = await getOrgJobs(user.username);
    setJobs(jobs);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (!localStorage.getItem('token')) return <Redirect to="/login" />;

  if (loading)
    return (
      <img className="loader" alt="loader" src={require('assets/loader.gif')} />
    );

  console.log(jobs);
  return (
    <StyledContainer className="p-6 bg-white rounded shadow">
      {/* {jobs.length ? (
        jobs.map((job) => <div key={job.id}></div>)
      ) : (
        <p>No Jobs found!</p>
      )} */}
    </StyledContainer>
  );
}

export default OrgDashboard;
