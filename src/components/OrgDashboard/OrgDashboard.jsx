import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { getOrgJobs } from 'api';

import Icon from 'components/Icon';
import { StyledContainer } from 'components/StyledContainer';

function OrgDashboard({ user }) {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const categories = jobs
    .map((j) => j.category)
    .reduce(function (a, b) {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, []);

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
    <StyledContainer className="p-6">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:1/2 md:w-1/4">
          <div className="flex text-xl justify-center items-center text-gray-800 flex-col font-bold bg-white my-2 mx-4 sm:mx-2 p-6 shadow rounded">
            <Icon name="verified" />
            <p>Verified Account</p>
          </div>{' '}
        </div>
        <div className="relative w-full sm:1/2 md:w-1/4">
          <div className="flex text-xl justify-center items-center text-gray-800 flex-col font-bold bg-white my-2 mx-4 sm:mx-2 p-6 shadow rounded">
            <Icon name="job" />
            <p>
              {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Created
            </p>
          </div>
        </div>
        <div className="relative w-full sm:1/2 md:w-1/4">
          <div className="flex text-xl justify-center items-center text-gray-800 flex-col font-bold bg-white my-2 mx-4 sm:mx-2 p-6 shadow rounded">
            <Icon name="people" />
            <p>121 Applicants</p>
          </div>
        </div>
        <div className="relative w-full sm:1/2 md:w-1/4">
          <div className="flex text-xl justify-center items-center text-gray-800 flex-col font-bold bg-white my-2 mx-4 sm:mx-2 p-6 shadow rounded">
            <Icon name="categories" />
            <p>
              {categories.length}{' '}
              {categories.length === 1 ? 'Category' : 'Categories'} Covered
            </p>
          </div>{' '}
        </div>
      </div>

      <h1 className="mt-2 text-xl text-blue-600 text-center">
        Jobs by <span className="uppercase">{user.username}</span>
      </h1>
      {jobs.length ? (
        <div className="flex flex-col sm:flex-row">
          {jobs.map((job) => (
            <Link
              to={`job/applicants/${job.id}`}
              key={job.id}
              className="relative w-full sm:1/2 md:w-1/3">
              <div className="text-gray-800 bg-white mx-4 my-2 sm:m-2 p-6 shadow rounded">
                <p className="text-lg font-bold text-center text-blue-600">
                  {job.title}
                </p>
                <div className="mt-1 text-sm">
                  <p>
                    <span className="font-bold">Number of Applicants: </span>
                    {110}
                  </p>
                  <p>
                    <span className="font-bold">Vacancies: </span>
                    {job.vacancies}
                  </p>
                  <p>
                    <span className="font-bold">Location: </span>
                    {job.location}
                  </p>
                  <p>
                    <span className="font-bold">Salary: </span>
                    {job.salary} (₹) (per month)
                  </p>
                  {job.job_for_women || job.job_for_disabled ? (
                    <div className="mt-1">
                      {job.job_for_women && (
                        <button className="women-job">Jobs for Women</button>
                      )}
                      {job.job_for_disabled && (
                        <button className="disabled-job">
                          Jobs for Disabled
                        </button>
                      )}
                    </div>
                  ) : (
                    <button className="general">General</button>
                  )}
                  <Link
                    to={`/updateJob/${job.id}`}
                    title="Edit Job"
                    className="transition ease-in duration-100 absolute bg-gray-700 hover:bg-gray-900 rounded-full h-8 w-8 flex items-center justify-center"
                    style={{ top: 20, right: 20 }}>
                    <Icon name="edit" />
                  </Link>
                  <Link
                    to={`job/${job.id}`}
                    className="block transition duration-150 ease-in-out rounded mt-1 py-1 px-2 border border-blue-600 text-center bg-blue-600 text-white hover:bg-white hover:text-blue-600">
                    See Job Details
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <>
          <p>No Jobs found!</p>
          <p>
            Click{' '}
            <Link to="/createJob" className="underline">
              here
            </Link>{' '}
            to create a Job
          </p>
        </>
      )}
    </StyledContainer>
  );
}

export default OrgDashboard;
