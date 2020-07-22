import React from 'react';
import { Redirect } from 'react-router-dom';

function Jobs() {
  if (!localStorage.getItem('token')) return <Redirect to="/login" />;

  return <div>Jobs</div>;
}

export default Jobs;
