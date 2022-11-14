import React from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import Link from 'next/link';
import { useMediaQuery, useTheme } from '@material-ui/core';
export default function Error(props) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
        }}
      >
        <div>
          <h1
            style={{
              fontWeight: '900',
              backgroundImage: `url(${publicRuntimeConfig.REACT_APP_ASSET_PREFIX}dev/error.jpg)`,
              backgroundRepeat: 'repeat',
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '10rem',
              height: matchesSM ? '17rem' : '22rem',
            }}
            id="error"
          >
            Oops!
          </h1>

          <h2
            style={{
              fontFamily: 'Montserrat',
              color: '#000',
              fontSize: '1.5rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              marginTop: '-5em',
            }}
          >
            {props.message}
          </h2>

          <Link href="/">
            <span
              style={{
                cursor: 'pointer',
                fontFamily: 'Montserrat',
                fontSize: '14px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                background: '#0046d5',
                display: 'inline-block',
                padding: '15px 30px',
                borderRadius: '40px',
                color: '#fff',
                fontWeight: 700,
                WebkitBoxShadow: '0px 4px 15px -5px #0046d5',
                boxShadow: '0px 4px 15px -5px #0046d5',
                marginTop: '10px',
              }}
            >
              {' '}
              Go To Homepage
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
