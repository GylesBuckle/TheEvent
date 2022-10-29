import React from 'react';
import CreateorUpdateEvent from '../../src/pagesComponent/createorUpdateEvent';
import Loading from '../../src/reusable/loading';
import Error from '../../src/reusable/error';
import axios from '../../src/utils/axios';
import CheckAuth from '../../src/reusable/checkAuth';
function Update(props) {
  if (!props.error && !props.event) {
    return <Loading />;
  }
  if (props.error) {
    return <Error message={props.error} />;
  }
  return (
    <CheckAuth adminSuperAdmin>
      <CreateorUpdateEvent edit={true} event={props.event} />
    </CheckAuth>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const result = await axios.get(`/events/${params.id}`);
    if (result.data.success === true) {
      return {
        props: {
          event: result.data.data.doc,
        },
      };
    } else {
      return {
        props: {
          error: result.data.message,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      props: {
        error: err.response?.data?.message ? err.response?.data?.message : err.message,
      },
    };
  }
}

export default Update;
