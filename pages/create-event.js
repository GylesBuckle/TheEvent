import React from 'react';
import CreateorUpdateEvent from '../src/pagesComponent/createorUpdateEvent';
import CheckAuth from '../src/reusable/checkAuth';
export default function ForgetPassword() {
  return (
    <CheckAuth adminSuperAdmin>
      <CreateorUpdateEvent />
    </CheckAuth>
  );
}
