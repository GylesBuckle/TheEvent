import { Tooltip } from '@material-ui/core';
import React from 'react';

export default function Popup(props) {
  return (
    <Tooltip title={props.children} placement="top-start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
        style={{ ...props.style }}
      >
        <path
          fill="#000"
          d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14.546A6.553 6.553 0 011.455 8 6.553 6.553 0 018 1.455 6.553 6.553 0 0114.546 8 6.553 6.553 0 018 14.546z"
        ></path>
        <path
          fill="#000"
          d="M8 3.394a.97.97 0 000 1.94.97.97 0 000-1.94zM8 6.788a.727.727 0 00-.727.727v4.364a.727.727 0 001.455 0V7.515a.727.727 0 00-.727-.727z"
        ></path>
      </svg>
    </Tooltip>
  );
}
