import React, { useState, useEffect } from 'react';

import { courses } from 'utils/courses';
import { StyledContainer } from 'components/StyledContainer';

function Courses() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setTimeout(() => setLoading(false), 1500);

    return () => {
      clearInterval(interval);
    };
  }, [setLoading]);

  if (loading)
    return (
      <img className="loader" alt="loader" src={require('assets/loader.gif')} />
    );

  return (
    <StyledContainer>
      <h1>Job Oriented Courses</h1>
      <p className="mx-3 mb-1 font-bold text-gray-800 text-sm">
        Total Results: {courses.edges.length} courses
      </p>
      <div>
        {courses.edges.map(({ node: n }) => (
          <div className="course" key={n.id}>
            <a
              href={`https://swayam.gov.in/${n.url}`}
              target="_blank"
              rel="noopener noreferrer">
              <img src={n.coursePictureUrl} alt={n.title} />
              <p className="title">
                {n.title.substring(0, 20)}
                {n.title.length > 20 ? '...' : ''}
              </p>
              <p className="instructor">
                <span>Instructor:</span>{' '}
                {n.explorerInstructorName.substring(0, 15)}
                {n.explorerInstructorName > 15 ? '...' : ''}
              </p>
              <p className="institute">
                <span>Institute:</span> {n.instructorInstitute.substring(0, 45)}
              </p>
              {n.category[0] && n.category[0].name && (
                <p className="category">
                  <span>Category:</span> {n.category[0].name.substring(0, 15)}
                </p>
              )}
              <p>
                <span>Duration:</span> {n.weeks} weeks
              </p>
              <p className="font-bold mt-1 text-center text-gray-800 text-xs">
                ({`From ${n.startDate.substring(0, 10)}`}
                {n.endDate && <span> to {n.endDate.substring(0, 10)}</span>})
              </p>
            </a>
          </div>
        ))}
      </div>
    </StyledContainer>
  );
}

export default Courses;
