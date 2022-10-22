import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';

import { Alert } from '@material-ui/lab';

import axios from '../../utils/axios';
import Loading from '../../reusable/loading';
import { GlobalContext } from '../../context/GlobalContext';

export default function AppleLogin() {
  // const router = useHistory();

  const { setAuth } = useContext(GlobalContext);

  const [message, setMessage] = useState({
    status: false,
    error: false,
    message: '',
  });

  useEffect(() => {
    const verify = async () => {
      try {
        const code = new URLSearchParams(window.location.search).get('code');

        const result = await axios.post(`/users/externalLogin`, {
          token: code,
          method: 'apple',
        });
        if (result.data.status === 'success') {
          await localStorage.setItem('tappio-jwt', result.data.token);

          setAuth({ ...result.data.data.user, token: result.data.token });
        } else {
          setMessage({
            status: true,
            error: true,
            message: result.message,
          });
        }
      } catch (err) {
        console.log(err.response.data.message);
        setMessage({
          status: true,
          error: true,
          message: err?.response?.data?.message || 'Something went wrong',
        });
      }
    };
    verify();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (message.error) {
    return (
      <div
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Alert severity={message.error ? 'error' : 'success'}>
          {message.message}{' '}
          <Link href="/login">
            <a style={{ textDecoration: 'none' }}>Login</a>
          </Link>
        </Alert>
      </div>
    );
  }
  return <Loading />;
}
