import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { getEmployeeJobs } from 'api';

import { StyledContainer } from 'components/StyledContainer';

function EmployeeDashboard({ user }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployeeJobs = useCallback(async () => {
    const jobs = await getEmployeeJobs(user.username);
    setJobs(jobs);
    setLoading(false);
  }, [user.username]);

  useEffect(() => {
    fetchEmployeeJobs();
  }, [fetchEmployeeJobs]);

  if (!localStorage.getItem('token')) return <Redirect to="/login" />;

  if (loading)
    return (
      <img className="loader" alt="loader" src={require('assets/loader.gif')} />
    );

  return (
    <StyledContainer>
      {!jobs.length ? (
        <h1>
          You have not applied for any Jobs yet. Visit{' '}
          <Link to="/jobs">Jobs</Link> to get started.
        </h1>
      ) : (
        <>
          <h1>My Applications</h1>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Organization</th>
                <th>Job Type</th>
                <th>Applied On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr>
                  <td>{j.job.title}</td>
                  <td>
                    <Link to={`/org/${j.job.company_name}`}>
                      {j.job.company_name}
                    </Link>
                  </td>
                  <td>{j.job.type}</td>
                  <td>{j.applied_at.substring(0, 10)}</td>
                  <td>
                    <span className={`status ${j.status}`}>{j.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{' '}
        </>
      )}
    </StyledContainer>
  );
}

export default EmployeeDashboard;
