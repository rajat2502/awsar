import React from 'react';
import { Redirect } from 'react-router-dom';

function CreateJob() {
  if (localStorage.getItem('token')) return <Redirect to="/dashboard" />;

  return <div>CreateJob</div>;
}

export default CreateJob;
