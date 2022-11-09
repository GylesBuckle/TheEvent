import React from 'react';
import CheckAuth from '../src/reusable/checkAuth';
import Purchasing from '../src/pagesComponent/purchasing';
export default function Purchase() {
  return (
    <CheckAuth>
      <Purchasing />
    </CheckAuth>
  );
}
