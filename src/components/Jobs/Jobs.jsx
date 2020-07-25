import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { getAllJobs } from 'api';

import { StyledContainer } from 'components/StyledContainer';

function Jobs() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const getJobs = useCallback(async () => {
    const allJobs = await getAllJobs();
    setJobs(allJobs);
    setLoading(false);
  }, [setJobs, setLoading]);

  useEffect(() => {
    getJobs();
  });

  if (!localStorage.getItem('token')) return <Redirect to="/login" />;

  if (loading)
    return (
      <img className="loader" alt="loader" src={require('assets/loader.gif')} />
    );

  return (
    <StyledContainer>
      <div className="cards-grid">
        <div className="left-card">
          <div className="grid-card">
            <p className="text-center text-lg text-blue-600">Filter Jobs</p>
          </div>
        </div>
        <div className="right-card">
          <div className="grid-card">
            <h1>Available Jobs</h1>
            {jobs.length ? (
              jobs.map((job) => (
                <Link key={job.id} to={`/job/${job.id}`}>
                  <div className="job">
                    <p className="job-main">
                      <span className="title">{job.title}</span>,{' '}
                      <span>{job.location}</span> -{' '}
                      <span>{job.company_name}</span>
                    </p>
                    <p className="text-gray-900 flex justify-between flex-wrap">
                      <span>Salary: {job.salary} (per year)</span>
                      <span>Vacancies: {job.vacancies}</span>
                      <span>Category: {job.category}</span>
                    </p>
                    <p className="job-desc">
                      {job.description.length > 200
                        ? `${job.description.substring(0, 200)}...`
                        : job.description}
                    </p>
                    <button>Apply Now</button>
                  </div>
                </Link>
              ))
            ) : (
              <h1>No Jobs found :-(</h1>
            )}
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}

export default Jobs;
