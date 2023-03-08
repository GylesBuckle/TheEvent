import React from "react";
import Homepage from "../src/pagesComponent/homepage";
import axios from "../src/utils/axios";

export default function index(props) {
  return <Homepage events={props.events ? props.events : []} />;
}

export async function getServerSideProps() {
  try {
    const result = await axios.get(`/events/`);
    if (result.data.success === true) {
      return {
        props: {
          events: result.data.data.doc,
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
        error: err.response?.data?.message
          ? err.response?.data?.message
          : err.message,
      },
    };
  }
}
