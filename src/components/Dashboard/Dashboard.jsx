import React from 'react';
import { Redirect } from 'react-router-dom';

function Dashboard() {
  if (localStorage.getItem('token')) return <Redirect to="/dashboard" />;

  return <div>Dashboard</div>;
}

export default Dashboard;
