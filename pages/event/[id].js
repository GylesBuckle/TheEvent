import React from 'react';
import EventDetails from '../../src/pagesComponent/eventDetails';
import Loading from '../../src/reusable/loading';
import Error from '../../src/reusable/error';
import axios from '../../src/utils/axios';

export default function EventDetailsPage(props) {
  if (!props.error && !props.event) {
    return <Loading />;
  }
  if (props.error) {
    return <Error message={props.error} />;
  }

  return <EventDetails event={props.event} />;
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
