import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Grid,
  useMediaQuery,
  Typography,
  TextField,
  CircularProgress,
  Button,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import axios from '../../utils/axios';
import { GlobalContext } from '../../context/GlobalContext';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Welcome from '../../reusable/welcomeCurve';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  pageHeight: {
    minHeight: '100vh',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '60%',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  label: {
    ...theme.typography.label,
  },
  input: {
    ...theme.typography.input,
    borderRadius: '5px',
    boxShadow: 'none',
    marginTop: '9px',
    background: '#fff',
  },
  checkboxLabel: {
    ...theme.typography.label,
    fontSize: '14px',
    fontWeight: 500,
    color: '#2D3748',
  },
  button: {
    ...theme.typography.label,
    color: theme.palette.common.mainFront,
    backgroundColor: theme.palette.common.mainBack,
    borderRadius: '12px',
    fontWeight: 600,
    textTransform: 'none',
    '&:hover': {
      color: theme.palette.common.mainFront,
      backgroundColor: theme.palette.common.mainBack,
    },
  },
}));

export default function Login() {
  const router = useRouter();
  const { t } = useTranslation();

  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { user: globaluser } = useContext(GlobalContext);

  if (globaluser !== null && globaluser.token !== undefined) {
    if (globaluser.roles.includes('User')) {
      router.push('/choose-feature');
    } else {
      router.push('/edit-profile');
    }
  }

  const [loading, setLoading] = useState(false);
  const [foretPasswordSuccess, setForgetPasswordSuccess] = useState(false);

  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [user, setUser] = useState({
    email: {
      value: '',
      error: false,
      errorMessage: '',
    },
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setError({
      status: false,
      message: '',
    });
    if (user.email.value === '') {
      setUser({
        ...user,
        email: {
          value: user.email.value,
          error: true,
          errorMessage: 'Email cannot be empty',
        },
      });
      return;
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email.value
      )
    ) {
      setUser({
        ...user,
        email: {
          value: user.email.value,
          error: true,
          errorMessage: 'Invalid Email',
        },
      });
      return;
    }

    try {
      setLoading(true);
      const result = await axios.post('/users/forgetpassword', {
        email: user.email.value,
      });
      if (result.data.status === 'success') {
        setForgetPasswordSuccess(true);
      } else {
        setError({
          status: true,
          message: result.data.message,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.message);
      setLoading(false);
      setError({
        status: true,
        message: err.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <Grid container alignItems="stretch">
      {!matchesSM && (
        <Grid item md={7} className={classes.pageHeight}>
          <Welcome />
        </Grid>
      )}
      <Grid item md={5} xs={12} className={[classes.pageHeight, classes.flexContainer].join(' ')}>
        <div className={classes.formContainer}>
          <Grid container alignItems={matchesSM ? 'center' : undefined} direction="column">
            <Grid item>
              {!matchesSM ? (
                <img
                  alt="encryption"
                  src="/dev/encryption.png"
                  style={{ width: '42px', height: '42px' }}
                />
              ) : (
                <img height="60" width="150" alt="logo" src="/dev/tappio.png" />
              )}
            </Grid>

            <Grid item>
              <Typography align={matchesSM ? 'center' : 'left'} variant="h4">
                {' '}
                {t('forgetPassword.title')}
              </Typography>
            </Grid>
            <Grid item style={{ marginTop: '0.3em' }}>
              <Typography align={matchesSM ? 'center' : 'left'} variant="subtitle2">
                {' '}
                {t('forgetPassword.description')}{' '}
              </Typography>
            </Grid>

            {/* for email */}
            <Grid item style={{ marginTop: '2em', width: '100%' }}>
              <label htmlFor="email" className={classes.label}>
                {t('forgetPassword.email')}
              </label>
              <TextField
                placeholder={t('forgetPassword.email')}
                id="email"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                }}
                required
                error={user.email.error}
                helperText={user.email.error ? user.email.errorMessage : ''}
                value={user.email.value}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: {
                      value: e.target.value,
                      error: false,
                      errorMessage: '',
                    },
                  })
                }
              />
            </Grid>

            {foretPasswordSuccess && (
              <Grid item style={{ marginTop: '0.5em', width: '100%' }}>
                <Alert severity="success">{t('forgetPassword.success')}</Alert>
              </Grid>
            )}
            {error.status && (
              <Grid item style={{ marginTop: '0.5em', width: '100%' }}>
                <Typography variant="subtitle2" style={{ display: 'flex', alignItems: 'center' }}>
                  {' '}
                  <ErrorOutlineIcon style={{ fill: 'red', marginRight: '4px' }} /> {error.message}
                </Typography>
              </Grid>
            )}
            {/* Send button */}
            <Grid item style={{ marginTop: '2em', width: '100%' }}>
              <Button
                fullWidth
                className={classes.button}
                disabled={loading}
                onClick={SubmitHandler}
              >
                {loading ? (
                  <CircularProgress size="2rem" style={{ color: theme.palette.common.mainFront }} />
                ) : (
                  t('forgetPassword.button')
                )}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
