import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import Loading from './loading';
import { Typography } from '@material-ui/core';
import { GlobalContext } from '../context/GlobalContext';
import Header from '../reusable/header';
import WarningIcon from '@material-ui/icons/Warning';
export default function CheckAuth(props) {
  const router = useRouter();
  const { user } = useContext(GlobalContext);
  const [showAuth, setShowAuth] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    //console.log(props.user, props.userToken, '------------');
    if (user === null || !user.token) {
      router.push('/login');
      return;
    }
    if (props.userOnly) {
      if (!user?.roles.some((item) => item === 'User')) {
        setNotFound(true);
        setShowAuth(false);
        return;
      }
    }

    if (props.adminOnly) {
      if (!user?.roles.some((item) => item === 'Admin')) {
        setNotFound(true);
        setShowAuth(false);
        return;
      }
    }
    if (props.superAdminOnly) {
      if (!user?.roles.some((item) => item === 'Admin')) {
        setNotFound(true);
        setShowAuth(false);
        return;
      }
    }
    setShowAuth(false);
  }, []);

  return showAuth ? (
    <Loading />
  ) : notFound ? (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
      }}
    >
      <WarningIcon style={{ fontSize: '15rem' }} />
      <Typography variant="h1" align="center">
        Resource not found
      </Typography>
      <Link href="/">
        <span
          style={{
            fontFamily: 'Montserrat',
            fontSize: '14px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            background: '#000',
            display: 'inline-block',
            padding: '15px 30px',
            borderRadius: '40px',
            color: '#fff',
            fontWeight: 700,
            WebkitBoxShadow: '0px 4px 15px -5px #000',
            boxShadow: '0px 4px 15px -5px #000',
            marginTop: '10px',
            cursor: 'pointer',
          }}
        >
          {' '}
          Go To Homepage
        </span>
      </Link>
    </div>
  ) : (
    <>
      {!props.custom && <Header />}

      {props.children}
    </>
  );
}
