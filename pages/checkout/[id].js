import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import CheckAuth from '../../src/reusable/checkAuth';
import Checkout from '../../src/pagesComponent/checkout/';
import Loading from '../../src/reusable/loading';
import Error from '../../src/reusable/error';
import axios from '../../src/utils/axios';
import { GlobalContext } from '../../src/context/GlobalContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { user: globaluser } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [event, setEvent] = useState();

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`/events/${router.query.id}`, {
        headers: {
          authorization: 'Bearer ' + globaluser?.token,
        },
      });
      if (result.data.success === true) {
        setEvent(result.data.data.doc);
      } else {
        setError({
          status: true,
          message: result.data.message,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError({
        status: true,
        message: err.response?.data?.message || 'Fail to fetch Event',
      });
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error.status) {
    return <Error message={error.message} />;
  }
  return (
    <CheckAuth>
      <Checkout event={event} />
    </CheckAuth>
  );
}
