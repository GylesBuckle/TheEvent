import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Alert } from '@material-ui/lab';

import axios from '../../utils/axios';
import Loading from '../../reusable/loading';
import { useTranslation } from 'react-i18next';

export default function VerifyUser() {
  const { t } = useTranslation();
  const router = useRouter();

  const [message, setMessage] = useState({
    status: false,
    error: false,
    message: '',
  });

  useEffect(() => {
    const verify = async () => {
      try {
        const result = await axios.post('/users/verifyEmail/' + router.query.token);

        setMessage({
          status: true,
          error: false,
          message: result.data.message,
        });
        setTimeout(() => {
          router.push('/login');
        }, [1500]);
      } catch (err) {
        console.log(err.response.data.message);
        setMessage({
          status: true,
          error: true,
          message: err?.response?.data?.message || 'Something went wrong',
        });
      }
    };
    if (router.query.token) verify();
  }, [router.query.token]); // eslint-disable-line react-hooks/exhaustive-deps

  if (message.status) {
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
            <a style={{ textDecoration: 'none' }}>{t('signup.login')}</a>
          </Link>
        </Alert>
      </div>
    );
  }
  return <Loading />;
}
