import React from 'react';

import CheckAuth from '../../src/reusable/checkAuth';
import Checkout from '../../src/pagesComponent/checkout/';
export default function CheckoutPage() {
  return (
    <CheckAuth>
      <Checkout />
    </CheckAuth>
  );
}
