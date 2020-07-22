import React from 'react';
import { Redirect } from 'react-router-dom';

function CreateJob() {
  if (!localStorage.getItem('token')) return <Redirect to="/login" />;

  return <div>CreateJob</div>;
}

export default CreateJob;
