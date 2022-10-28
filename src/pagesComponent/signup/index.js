import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Grid,
  useMediaQuery,
  Typography,
  TextField,
  CircularProgress,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import axios from '../../utils/axios';
import { GlobalContext } from '../../context/GlobalContext';

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
    color: '#000',
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
    fontSize: '12px',
    fontWeight: 500,
    color: '#848199',
  },
  button: {
    ...theme.typography.button,
  },

  description: {
    ...theme.typography.label,
    fontSize: '14px',
    fontWeight: 400,
    color: '#8692A6',
  },
}));

export default function Login() {
  const router = useRouter();

  const classes = useStyles();
  const { t } = useTranslation();

  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { user: globaluser } = useContext(GlobalContext);

  if (globaluser !== null && globaluser.token !== undefined) {
    router.push('/');
  }

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });

  const [user, setUser] = useState({
    firstName: {
      value: '',
      error: false,
      errorMessage: '',
    },
    lastName: {
      value: '',
      error: false,
      errorMessage: '',
    },
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
    confirmPassword: {
      value: '',
      error: false,
      errorMessage: '',
    },
  });

  const SubmitHandler = async () => {
    setError({
      status: false,
      message: '',
    });
    if (user.firstName.value === '') {
      setUser({
        ...user,
        firstName: {
          value: user.firstName.value,
          error: true,
          errorMessage: t('signup.emptyUsername'),
        },
      });
      return;
    }
    if (user.email.value === '') {
      setUser({
        ...user,
        email: {
          value: user.email.value,
          error: true,
          errorMessage: t('signup.emptyEmail'),
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
          errorMessage: t('signup.invalidEmail'),
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
          errorMessage: t('signup.emptyPassword'),
        },
      });
      return;
    }
    if (user.password.value !== user.confirmPassword.value) {
      setError({
        status: true,
        message: t('resetPassword.passwordMatch'),
      });
      return;
    }
    try {
      setLoading(true);
      const result = await axios.post('/users/signup', {
        firstName: user.firstName.value,
        lastName: user.lastName.value,
        email: user.email.value,
        password: user.password.value,
      });
      if (result.data.success === true) {
        router.push('/login');
        setError({
          status: false,
          message: '',
        });
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

  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get('email');

    if (email) {
      setUser({
        ...user,
        email: {
          value: email,
          error: false,
          errorMessage: '',
        },
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid container className={classes.pageHeight} justifyContent="center" alignItems="center">
      <Grid item md={5} xs={12} className={classes.card}>
        <Grid container direction="column" alignItems={'center'}>
          <Grid item>
            <img style={{ width: '100%', height: '100%' }} alt="logo" src="/dev/logo.png" />
          </Grid>

          {/* for name */}
          <Grid item style={{ marginTop: '1em', width: '100%' }}>
            <Grid container spacing={2}>
              {/* firstname */}
              <Grid item xs={6}>
                <label htmlFor="firstName" className={classes.label}>
                  {t('signup.firstName')}
                </label>
                <TextField
                  placeholder={t('signup.firstName')}
                  id="firstName"
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
                  error={user.firstName.error}
                  helperText={user.firstName.error ? user.firstName.errorMessage : ''}
                  value={user.firstName.value}
                  onChange={(e) => {
                    if (/^\S*$/.test(e.target.value)) {
                      setUser({
                        ...user,
                        firstName: {
                          value: e.target.value,
                          error: false,
                          errorMessage: '',
                        },
                      });
                    }
                  }}
                />
              </Grid>
              {/* lastName */}
              <Grid item xs={6}>
                <label htmlFor="lastName" className={classes.label}>
                  {t('signup.lastName')}
                </label>
                <TextField
                  placeholder={t('signup.lastName')}
                  id="lastName"
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
                  error={user.lastName.error}
                  helperText={user.lastName.error ? user.lastName.errorMessage : ''}
                  value={user.lastName.value}
                  onChange={(e) => {
                    if (/^\S*$/.test(e.target.value)) {
                      setUser({
                        ...user,
                        lastName: {
                          value: e.target.value,
                          error: false,
                          errorMessage: '',
                        },
                      });
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* for email */}
          <Grid item style={{ marginTop: '1em', width: '100%' }}>
            <label htmlFor="email" className={classes.label}>
              {t('signup.email')}
            </label>
            <TextField
              placeholder={t('signup.email')}
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
          {/* for password */}
          <Grid item style={{ marginTop: '1em', width: '100%' }}>
            <label htmlFor="email" className={classes.label}>
              {t('signup.password')}
            </label>
            <TextField
              type={showPassword ? 'text' : 'password'}
              placeholder={t('signup.password')}
              id="password"
              variant="outlined"
              fullWidth
              size="small"
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
          {/* for confirmPassword */}
          <Grid item style={{ marginTop: '1em', width: '100%' }}>
            <label htmlFor="email" className={classes.label}>
              {t('signup.confirmPassword')}
            </label>
            <TextField
              type={showPassword ? 'text' : 'password'}
              placeholder={t('signup.confirmPassword')}
              id="confirmPassword"
              variant="outlined"
              fullWidth
              size="small"
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
              error={user.confirmPassword.error}
              helperText={user.confirmPassword.error ? user.confirmPassword.errorMessage : ''}
              value={user.confirmPassword.value}
              onChange={(e) =>
                setUser({
                  ...user,
                  confirmPassword: {
                    value: e.target.value,
                    error: false,
                    errorMessage: '',
                  },
                })
              }
            />
          </Grid>

          {error.status && (
            <Grid item style={{ marginTop: '1em', width: '100%' }}>
              <Typography variant="subtitle2" style={{ display: 'flex', alignItems: 'center' }}>
                {' '}
                <ErrorOutlineIcon style={{ fill: 'red', marginRight: '4px' }} /> {error.message}
              </Typography>
            </Grid>
          )}

          {/* Signup button */}

          <Grid item style={{ marginTop: '1.5em', width: '100%' }}>
            <Button fullWidth className={classes.button} disabled={loading} onClick={SubmitHandler}>
              {loading ? (
                <CircularProgress size="2rem" color="secondary" style={{ marginRight: '20px' }} />
              ) : (
                t('signup.button')
              )}
            </Button>
          </Grid>

          {/* signIn with other account */}
          <Grid item style={{ marginTop: '1em', width: '100%' }}>
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
                  {t('signup.otherAccount')}
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
          {/* already have account */}
          <Grid item style={{ marginTop: '1em', width: '100%' }}>
            <Typography
              style={{
                fontFamily: 'Roboto',
                color: '#616161',
                fontWeight: '300',
              }}
              align="center"
              variant="subtitle2"
            >
              {t('signup.alreadyAccount')}{' '}
              <Link href="/login">
                <a
                  style={{
                    textDecoration: 'none',
                    color: '#2d2d2d',
                    fontWeight: '600',
                  }}
                >
                  {t('signup.signIn')}
                </a>
              </Link>{' '}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
