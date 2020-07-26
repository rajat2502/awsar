import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link, useParams } from 'react-router-dom';

import { getJobApplicants } from 'api';

import { StyledContainer } from 'components/StyledContainer';

const status = ['Shortlisted', 'Selected', 'Rejected', 'Ineligible'];
function JobApplicants({ user }) {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobApplicants = useCallback(async () => {
    const applicants = await getJobApplicants(id);
    console.log(applicants);
    setApplicants(applicants);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchJobApplicants();
  }, [fetchJobApplicants]);

  if (!localStorage.getItem('token')) return <Redirect to="/login" />;

  if (user.role === 'Employee')
    return (
      <div className="text-red-600 text-3xl font-bold m-auto">
        Please login as a Government organization to access this route.
      </div>
    );

  if (loading)
    return (
      <img className="loader" alt="loader" src={require('assets/loader.gif')} />
    );

  return (
    <StyledContainer>
      <h1>Applications for this Job</h1>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="w-1/6">Name</th>
            <th className="w-1/6">Email</th>
            <th className="w-1/6">Gender</th>
            <th className="w-1/6">Age</th>
            <th className="w-1/6">Phone Number</th>
            <th className="w-1/6">Status</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((ap) => (
            <tr>
              <td>
                <Link to={`/profile/${ap.employee.user}`}>
                  {ap.employee.first_name} {ap.employee.last_name}
                </Link>
              </td>
              <td>
                <a href={`mailto:${ap.employee.email}`}>{ap.employee.email}</a>
              </td>
              <td className="capitalize">{ap.employee.gender}</td>
              <td>
                {Math.floor(
                  (new Date() - new Date(ap.employee.dob)) / 31536000000,
                )}
              </td>
              <td>
                <a href={`tel:${ap.employee}`}>{ap.employee.phone_number}</a>
              </td>
              <td>
                <span className={`relative status ${ap.status}`}>
                  {ap.status}{' '}
                  <ul
                    className="change-status opacity-1 text-left text-sm absolute px-4 py-1 bg-white shadow-md rounded"
                    style={{ top: 30 }}>
                    {status.map((s) => (
                      <li className={s}>{s}</li>
                    ))}
                  </ul>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledContainer>
  );
}

export default JobApplicants;
