import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, useParams, Link, useHistory } from 'react-router-dom';

import { getJob, applyJob } from 'api';

function Job({ user }) {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState({});
  const [pending, setPending] = useState(false);

  const applyToJob = async () => {
    setPending(true);
    await applyJob({ user: user.username, job: id });
    setPending(false);
    history.push('/dashboard');
  };

  const fetchJob = useCallback(async () => {
    const job = await getJob(id);
    setJob(job);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  if (!localStorage.getItem('token')) return <Redirect to="/login" />;

  if (loading)
    return (
      <img className="loader" alt="loader" src={require('assets/loader.gif')} />
    );

  return (
    <div className="my-6 shadow rounded p-6 m-auto w-5/6 sm:w-1/2 bg-white">
      <p className="text-blue-600 text-2xl font-bold text-center">
        {job.title}
      </p>
      <div className="mt-2 text-gray-700 text-sm">
        <p>
          Company Name:{' '}
          <Link
            to={`org/${job.company_name}`}
            className="font-bold text-blue-600 hover:underline">
            {job.company_name}
          </Link>
        </p>
        <p>
          Job ID: <span className="font-bold">{id}</span>
        </p>
        <p>
          Salary:{' '}
          <span className="font-bold">{job.salary} (₹) (per month)</span>
        </p>
        <p>
          Age Limit:{' '}
          <span className="font-bold">{job.age_limit.match(/\d+/)[0]}</span>
        </p>
        <p>
          Min. Qualification:{' '}
          <span className="font-bold">{job.qualification}</span>
        </p>
        <p>
          Number of Vacancies:{' '}
          <span className="font-bold">{job.vacancies}</span>
        </p>
        <p>
          Job Type: <span className="font-bold">{job.type}</span>
        </p>
        <p>
          Job Category: <span className="font-bold">{job.category}</span>
        </p>
        <p>
          Min. Experience Required:{' '}
          <span className="font-bold">{job.experience} (years)</span>
        </p>
        <p>
          Last date to apply:{' '}
          <span className="font-bold">{job.last_date.substring(0, 10)}</span>
        </p>
        <p>
          Last updated on:{' '}
          <span className="font-bold">{job.updated_at.substring(0, 10)}</span>
        </p>
        <p>
          Description: <span className="text-gray-800">{job.summary}</span>
        </p>
        {job.job_for_women && (
          <button className="rounded-sm text-white px-1 bg-pink-600 border border-pink-600">
            Jobs for Women
          </button>
        )}
        {job.job_for_disabled && (
          <button className="rounded-sm text-white px-1 bg-green-600 border border-green-600">
            Jobs for Disabled
          </button>
        )}
      </div>
      <button
        onClick={applyToJob}
        className="mt-2 w-full rounded-sm text-white py-1 px-4 bg-blue-600 border border-blue-600"
        style={pending ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
        disabled={pending}>
        {pending ? 'Applying to the Job...' : 'Apply to Job'}
      </button>
    </div>
  );
}

export default Job;
