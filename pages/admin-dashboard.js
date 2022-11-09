import React from 'react';
import Dashboard from '../src/pagesComponent/dashboard';
import CheckAuth from '../src/reusable/checkAuth';

export default function adminDashboard() {
  return (
    <CheckAuth adminSuperAdmin>
      <Dashboard />
    </CheckAuth>
  );
}
