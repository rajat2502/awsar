import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { getJobsByFilters } from 'api';
import { StyledContainer } from 'components/StyledContainer';

function Home() {
  // const [value, setValue] = useState(0);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (e) => {
    e.preventDefault();
    if (location && title) {
      setError(null);
      setLoading(true);
      const filteredData = await getJobsByFilters(location, title);
      setJobs(filteredData);
      setLoading(false);
    } else setError("Location and Job title can't be empty");
  };

  const fetchJobsAtMount = useCallback(async () => {
    setLoading(true);
    const filteredData = await getJobsByFilters('Delhi', 'Engineer');
    setJobs(filteredData);
    setLoading(false);
  }, []);

  // const onChange = (value) => {
  //   setValue(value);
  // };

  useEffect(() => {
    fetchJobsAtMount();
  }, [fetchJobsAtMount]);

  return (
    <div>
      {/* <Carousel
        value={value}
        onChange={onChange}
        plugins={[
          'arrows',
          'infinite',
          {
            resolve: autoplayPlugin,
            options: {
              interval: 3000,
            },
          },
        ]}
        animationSpeed={1000}>
        <img src={require('assets/slider1.jpg')} alt="Carousel" />
        <img src={require('assets/slider2.jpg')} alt="Carousel" />
        <img src={require('assets/slider3.1.jpg')} alt="Carousel" />
      </Carousel> */}
      <StyledContainer>
        <h1 className="my-4 font-bold text-center text-3xl text-blue-600">
          Find the right Job
        </h1>
        <form
          className="flex flex-col sm:flex-row justify-center"
          onSubmit={fetchJobs}>
          <div className="flex flex-col">
            <label className="mx-1 text-gray-800 font-bold">Location</label>
            <input
              type="text"
              placeholder="Eg: Delhi"
              onChange={(e) => setLocation(e.target.value)}
              className="focus:outline-none focus:shadow-outline mx-1 border border-gray-300 rounded py-2 px-4 leading-normal border-gray-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="mx-1 text-gray-800 font-bold">Job Title</label>
            <input
              type="text"
              placeholder="Eg: Medical Officer"
              onChange={(e) => setTitle(e.target.value)}
              className="focus:outline-none focus:shadow-outline mx-1 border border-gray-300 rounded py-2 px-4 leading-normal border-gray-400"
            />
          </div>
          <button
            type="submit"
            style={{ height: 41, minWidth: 200, marginTop: 28 }}
            className="mx-2 bg-blue-600 hover:bg-blue-800 text-white font-bold py-1 px-4 rounded transition ease-in duration-200"
            disabled={loading}>
            {loading ? 'Searching Jobs...' : 'Search Jobs'}
          </button>
        </form>
        {error && <p className="text-center text-red-600">{error}</p>}
        <br />
        {loading ? (
          <img
            className="loader"
            alt="loader"
            src={require('assets/loader.gif')}
          />
        ) : jobs.length ? (
          <div>
            {jobs.map((job) => (
              <div
                key={job.id}
                className="relative w-full sm:inline-block sm:w-1/2 md:w-1/4 ">
                <div className="text-gray-800 bg-white mx-4 my-2 sm:m-2 p-6 shadow rounded">
                  <p className="text-lg font-bold text-center text-blue-600">
                    {job.title}
                  </p>
                  <div className="mt-1 text-sm">
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
                      to={`job/${job.id}`}
                      className="block transition duration-15 ease-in-out rounded mt-1 py-1 px-2 border border-blue-600 text-center bg-blue-600 text-white hover:bg-white hover:text-blue-600">
                      See Job Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            <Link
              to={'/jobs'}
              style={{ width: 300 }}
              className="mx-auto mt-2 flex justify-center transition duration-15 ease-in-out rounded py-2 px-2 font-bold border border-blue-600 text-center bg-blue-600 text-white hover:bg-blue-700">
              See All Jobs
            </Link>
          </div>
        ) : (
          <p className="text-center text-2xl font-bold">No Jobs found!</p>
        )}
      </StyledContainer>
      <div className="mt-4 p-4 sm:px-24 sm:py-8 bg-white">
        <h1 className="my-2 font-bold text-center text-xl sm:text-3xl text-blue-600">
          Organizations hiring with us
        </h1>
        <img src={require('assets/footer.png')} alt="footer" />
      </div>
    </div>
  );
}

export default Home;
