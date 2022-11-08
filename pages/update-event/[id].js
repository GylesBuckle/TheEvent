import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import CreateorUpdateEvent from '../../src/pagesComponent/createorUpdateEvent';
import Loading from '../../src/reusable/loading';
import Error from '../../src/reusable/error';
import axios from '../../src/utils/axios';
import CheckAuth from '../../src/reusable/checkAuth';
function Update() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [event, setEvent] = useState();

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`/events/${router.query.id}`);
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
    <CheckAuth adminSuperAdmin>
      <CreateorUpdateEvent edit={true} event={event} />
    </CheckAuth>
  );
}

export default Update;
