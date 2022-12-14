import React, { useState, useContext } from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Grid,
  useMediaQuery,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Alert } from '@material-ui/lab';
import axios from '../../utils/axios';
import { GlobalContext } from '../../context/GlobalContext';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import GoogleAuth from '../../reusable/googleAuth';
import * as websiteInfo from '../../data/websiteInfo';
import Loading from '../../reusable/loading';

const useStyles = makeStyles((theme) => ({
  pageHeight: {
    ...theme.typography.authBackground,
  },
  card: {
    background: '#fff',
    border: '3px solid #fff',
    borderRadius: '29px',
    boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.05)',
    padding: '50px 28px',
    [theme.breakpoints.down('sm')]: {
      padding: '30px 20px',
    },
  },
  label: {
    ...theme.typography.label,
  },
  input: {
    ...theme.typography.input,
    background: '#F1F1F1',
    borderRadius: '5px',
    boxShadow: 'none',
    marginTop: '5px',
  },
  inputOutline: {
    border: 'none',
  },
  checkboxLabel: {
    ...theme.typography.label,
    fontSize: '14px',
    fontWeight: 500,
    color: '#848199',
  },
  button: {
    ...theme.typography.button,
  },
}));

export default function Login() {
  const router = useRouter();
  const { t } = useTranslation();

  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { setAuth, user: globaluser } = useContext(GlobalContext);

  if (
    globaluser !== null &&
    globaluser.token !== undefined &&
    (globaluser.roles.includes('Super Admin') || globaluser.roles.includes('Admin'))
  ) {
    router.push('/admin-dashboard');
    //return <Loading />;
  }
  if (globaluser !== null && globaluser.token !== undefined && globaluser.roles.includes('User')) {
    router.push('/');
    //return <Loading />;
  }

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
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
    password: {
      value: '',
      error: false,
      errorMessage: '',
    },
    rememberMe: {
      value: false,
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
    if (user.password.value === '') {
      setUser({
        ...user,
        password: {
          value: user.password.value,
          error: true,
          errorMessage: 'Password cannot be empty',
        },
      });
      return;
    }
    try {
      setLoading(true);
      const result = await axios.post('/users/login', {
        email: user.email.value,
        password: user.password.value,
      });

      if (result.data.success === true) {
        if (user.rememberMe.value) {
          await localStorage.setItem(websiteInfo.tokenKey, result.data.token);
        }
        setAuth({ ...result.data.data.user, token: result.data.token });
        if (
          result.data.data.user.roles.includes('Super Admin') ||
          result.data.data.user.roles.includes('Admin')
        ) {
          router.push('/admin-dashboard');
        } else {
          router.push('/');
        }
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
        message: err.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <Grid container className={classes.pageHeight} justifyContent="center" alignItems="center">
      <Grid item md={5} xs={10} className={classes.card}>
        <Grid container direction="column" alignItems={'center'}>
          <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              style={{ width: '50%', height: '50%' }}
              alt="logo"
              src={`${publicRuntimeConfig.REACT_APP_ASSET_PREFIX}dev/logo.png`}
            />
          </Grid>

          {/* <Grid item style={{ marginTop: '0.2em', width: '100%' }}>
            <Typography align={matchesSM ? 'center' : 'left'} variant="h5">
              {' '}
              {t('signin.title')}
            </Typography>
          </Grid> */}
          {/* for email */}
          <Grid item style={{ marginTop: '1em', width: '100%' }}>
            <label htmlFor="email" className={classes.label}>
              {t('signin.email')}
            </label>
            <TextField
              placeholder={t('signin.email')}
              id="email"
              variant="outlined"
              fullWidth
              //size="small"
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
          {/* for password */}
          <Grid item style={{ marginTop: '1em', width: '100%' }}>
            <label htmlFor="password" className={classes.label}>
              {t('signin.password')}
            </label>
            <TextField
              type={showPassword ? 'text' : 'password'}
              placeholder={t('signin.password')}
              id="password"
              variant="outlined"
              fullWidth
              // size="small"
              InputProps={{
                classes: {
                  root: classes.input,
                  notchedOutline: classes.inputOutline,
                },
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      onClick={() => setShowPassword((p) => !p)}
                      style={{ background: 'transparent' }}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
              error={user.password.error}
              helperText={user.password.error ? user.password.errorMessage : ''}
              value={user.password.value}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: {
                    value: e.target.value,
                    error: false,
                    errorMessage: '',
                  },
                })
              }
            />
          </Grid>
          {/* Forgot password */}
          <Grid item style={{ marginTop: '0.7em', width: '100%' }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  label={t('signin.rememberMe')}
                  classes={{
                    label: classes.checkboxLabel,
                  }}
                  control={
                    <Checkbox
                      size="small"
                      checked={user.rememberMe.value}
                      color="primary"
                      onChange={(e) =>
                        setUser({
                          ...user,
                          rememberMe: {
                            value: e.target.checked,
                          },
                        })
                      }
                    />
                  }
                />
              </Grid>
              <Grid item>
                <Link href="/forgetPassword" style={{ textDecoration: 'none' }}>
                  <Typography
                    variant="h4"
                    style={{ color: '#848199', cursor: 'pointer' }}
                    className={classes.checkboxLabel}
                  >
                    {t('signin.forgetPassword')}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          {error.status && (
            <Grid item style={{ marginTop: '1em', width: '100%' }}>
              <Alert severity="warning">{error.message}</Alert>
            </Grid>
          )}
          {/* Login button */}
          <Grid item style={{ marginTop: '0.5em', width: '100%' }}>
            <Button fullWidth className={classes.button} disabled={loading} onClick={SubmitHandler}>
              {loading && (
                <CircularProgress size="2rem" color="secondary" style={{ marginRight: '20px' }} />
              )}{' '}
              {t('signin.button')}
            </Button>
          </Grid>
          {/* signIn with other account */}
          <Grid item style={{ marginTop: '1.2em', width: '100%' }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item style={{ flex: 1 }}>
                <div
                  style={{
                    height: '2px',
                    background: 'linear-gradient(89.98deg, #000000 0.98%, rgba(0, 0, 0, 0) 98.07%)',
                    opacity: 0.3,
                    transform: ' matrix(-1, 0, 0, 1, 0, 0)',
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  style={{ color: 'rgba(0, 0, 0, 0.5)' }}
                  className={classes.checkboxLabel}
                >
                  {t('signin.otherAccount')}
                </Typography>
              </Grid>
              <Grid item style={{ flex: 1 }}>
                <div
                  style={{
                    height: '2px',
                    background: 'linear-gradient(89.98deg, #000000 0.98%, rgba(0, 0, 0, 0) 98.07%)',
                    opacity: 0.3,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ marginTop: '1em', width: '100%' }}>
            <GoogleAuth />
          </Grid>

          {/* dont have account */}
          <Grid item style={{ marginTop: '1.2em' }}>
            <Typography
              style={{
                fontFamily: 'Roboto',
                color: '#616161',
                fontWeight: '300',
              }}
              align="center"
              variant="subtitle2"
            >
              {t('signin.account')}{' '}
              <Link href="/signup">
                <a
                  style={{
                    textDecoration: 'none',
                    color: '#2d2d2d',
                    fontWeight: '600',
                  }}
                >
                  {t('signin.join')}
                </a>
              </Link>{' '}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
