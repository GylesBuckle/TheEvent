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

import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import axios from '../../utils/axios';
import { GlobalContext } from '../../context/GlobalContext';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
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
    fontSize: '12px',
    fontWeight: 500,
    color: '#2D3748',
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
  const { user: globaluser } = useContext(GlobalContext);

  if (globaluser !== null && globaluser.token !== undefined) {
    router.push('/');
  }

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [user, setUser] = useState({
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
    if (user.password.value === '') {
      setUser({
        ...user,
        password: {
          value: user.password.value,
          error: true,
          errorMessage: t('resetPassword.emptyPassword'),
        },
      });
      return;
    }
    if (user.confirmPassword.value === '') {
      setUser({
        ...user,
        confirmPassword: {
          value: user.confirmPassword.value,
          error: true,
          errorMessage: t('resetPassword.emptyPassword'),
        },
      });
      return;
    }
    if (user.password.value !== user.confirmPassword.value) {
      setError({
        active: true,
        message: t('resetPassword.passwordMatch'),
      });
      return;
    }

    try {
      setLoading(true);
      const result = await axios.post(`/users/resetPassword/${router.query.token}`, {
        password: user.password.value,
      });
      if (result.data.success === true) {
        router.push('/login');
      } else {
        setError({
          status: true,
          message: result.message,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err?.response?.data?.message);
      setLoading(false);
      setError({
        status: true,
        message: err.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <Grid container className={classes.pageHeight} justifyContent="center" alignItems="center">
      <Grid item md={5} xs={12} className={classes.card}>
        <Grid container alignItems={'center'} direction="column">
          <Grid item>
            <img style={{ width: '100%', height: '100%' }} alt="logo" src="/dev/logo.png" />
          </Grid>

          <Grid item>
            <Typography align={matchesSM ? 'center' : 'left'} variant="h4">
              {' '}
              {t('resetPassword.title')}
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: '0.3em' }}>
            <Typography align={matchesSM ? 'center' : 'left'} variant="subtitle2">
              {t('resetPassword.description')}
            </Typography>
          </Grid>

          {/* for password */}
          <Grid item style={{ marginTop: '1em', width: '100%' }}>
            <label htmlFor="new-password" className={classes.label}>
              {t('resetPassword.newPassword')}
            </label>
            <TextField
              type="password"
              placeholder={t('resetPassword.newPassword')}
              id="new-password"
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
          {/* for confirm password */}
          <Grid item style={{ marginTop: '1em', width: '100%' }}>
            <label htmlFor="password" className={classes.label}>
              {t('resetPassword.confirmPassword')}
            </label>
            <TextField
              type="password"
              placeholder={t('resetPassword.confirmPassword')}
              id="password"
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
            <Grid item style={{ marginTop: '0.8em', width: '100%' }}>
              <Typography variant="subtitle2" style={{ display: 'flex', alignItems: 'center' }}>
                {' '}
                <ErrorOutlineIcon style={{ fill: 'red', marginRight: '4px' }} /> {error.message}
              </Typography>
            </Grid>
          )}
          {/* Send button */}
          <Grid item style={{ marginTop: '2em', width: '100%' }}>
            <Button fullWidth className={classes.button} disabled={loading} onClick={SubmitHandler}>
              {loading && (
                <CircularProgress size="2rem" style={{ color: theme.palette.secondary.main }} />
              )}{' '}
              {t('resetPassword.button')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
