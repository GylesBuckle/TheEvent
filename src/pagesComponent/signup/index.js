import React, { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Grid,
  useMediaQuery,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Button,
  Paper,
} from '@material-ui/core';
import { useTranslation, Trans } from 'react-i18next';

import axios from '../../utils/axios';
import { GlobalContext } from '../../context/GlobalContext';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Welcome from '../../reusable/welcomeCurve';
import Footer from '../../reusable/footer';

const useStyles = makeStyles((theme) => ({
  pageHeight: {
    minHeight: '100vh',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
  formContainer: {
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },

  input: {
    ...theme.typography.input,
    background: '#fff',
    borderRadius: '5px',
    boxShadow: 'none',
    marginTop: '5px',
  },
  checkboxLabel: {
    ...theme.typography.label,
    fontSize: '12px',
    fontWeight: 500,
    color: '#848199',
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
  paper: {
    boxShadow: '0px 2px 14px 1px rgba(0, 0, 0, 0.06)',
    borderRadius: '6px',
    padding: '1.75em',
    cursor: 'pointer',
    '&:hover': {
      border: `1px solid ${theme.palette.common.blue}`,
      backgroundColor: '#00ffd0',
      '& $arrow': {
        display: 'inline-block',
      },
    },
  },
  arrow: {
    display: 'none',
  },
  label: {
    ...theme.typography.label,
    color: '#000',
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
    router.push('/edit-profile');
  }

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [accountType, setAccountType] = useState(''); //Individual //Business

  const [user, setUser] = useState({
    userName: {
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
    terms: {
      value: false,
    },
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setError({
      status: false,
      message: '',
    });
    if (user.userName.value === '') {
      setUser({
        ...user,
        userName: {
          value: user.userName.value,
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
    if (user.terms.value === false) {
      setError({
        status: true,
        message: t('signup.acceptTerms'),
      });
      return;
    }
    try {
      setLoading(true);
      const result = await axios.post('/users/signup', {
        userName: user.userName.value,
        email: user.email.value,
        password: user.password.value,
        accountType,
      });
      if (result.data.status === 'success') {
        setSignupSuccess(true);
      } else {
        setError({
          status: true,
          message: result.data.message,
        });
        setSignupSuccess(false);
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

  const accountTypeForm = (
    <Grid container direction="column">
      {/* Heading */}
      <Grid item>
        <Typography variant="h4">{t('signup.accountTypeTitle')}</Typography>
      </Grid>
      {/* description */}
      <Grid item style={{ marginTop: '0.3em' }}>
        <Typography variant="subtitle2" style={{ width: '80%' }}>
          {' '}
          {t('signup.accountTypeDescription')}
        </Typography>
      </Grid>
      {/* Individual card */}
      <Grid item style={{ marginTop: '1em' }}>
        <Paper className={classes.paper} onClick={() => setAccountType('Individual')}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={10}>
              <Grid container alignItems="center" wrap="nowrap">
                <Grid item>
                  <img
                    src="/dev/individual.png"
                    alt="polygon1"
                    style={{ width: '42px', height: '42px' }}
                  />
                </Grid>
                <Grid item style={{ marginLeft: '1.75em' }}>
                  <Typography className={classes.label}>{t('signup.individual')}</Typography>
                  {/* <Typography className={classes.description}>
                            Generate key for your individual account
                          </Typography> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.arrow}>
              <ArrowForwardIcon style={{ color: theme.palette.common.blue }} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {/* Business card */}
      <Grid item style={{ marginTop: '1em' }}>
        <Paper className={classes.paper} onClick={() => setAccountType('Business')}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={10}>
              <Grid container alignItems="center" wrap="nowrap">
                <Grid item>
                  <img
                    src="/dev/business.png"
                    alt="polygon1"
                    style={{ width: '42px', height: '42px' }}
                  />
                </Grid>
                <Grid item style={{ marginLeft: '1.75em' }}>
                  <Typography className={classes.label}>{t('signup.business')}</Typography>
                  {/* <Typography className={classes.description}>
                            Generate key for your business account
                          </Typography> */}
                </Grid>
              </Grid>
            </Grid>

            <Grid item className={classes.arrow}>
              <ArrowForwardIcon style={{ color: theme.palette.common.blue }} />
            </Grid>
          </Grid>
        </Paper>
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
  );

  const comingSoon = (
    <Grid container alignItems={matchesSM ? 'center' : undefined} direction="column">
      <Grid item>
        <Typography variant="h4" align="center">
          {t('signup.comingSoonText')}
        </Typography>
      </Grid>
      {/* description */}
      <Grid item style={{ marginTop: '0.3em' }}>
        <Typography variant="subtitle2" align="center">
          {' '}
          {t('signup.comingSoonDescription')}
        </Typography>
      </Grid>
      <Grid item style={{ alignSelf: 'center' }}>
        <Button
          style={{
            textTransform: 'none',
            background: 'transparent',
          }}
          className={classes.label}
          onClick={() => setAccountType('')}
          startIcon={<ArrowForwardIcon style={{ transform: 'rotate(180deg)' }} />}
        >
          {t('signup.back')}
        </Button>
      </Grid>
    </Grid>
  );

  const individualSignupForm = (
    <Grid container alignItems={matchesSM ? 'center' : undefined} direction="column">
      <Grid item>
        {!matchesSM ? (
          // <img
          //   alt="check-mark"
          //   src="/dev/check-mark.png"
          //   style={{ width: '42px', height: '42px' }}
          // />
          <div></div>
        ) : (
          <img height="60" width="150" alt="logo" src="/dev/tappio.png" />
        )}
      </Grid>
      <Grid item>
        <Typography align={matchesSM ? 'center' : 'left'} variant="subtitle2">
          {' '}
          {t('signup.Welcome')}{' '}
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: '0.3em' }}>
        <Typography align={matchesSM ? 'center' : 'left'} variant="h5">
          {' '}
          {t('signup.title')}
        </Typography>
      </Grid>

      {!signupSuccess && (
        <>
          {/* for username */}
          <Grid item style={{ marginTop: '1em', width: '100%' }}>
            <label htmlFor="userName" className={classes.label}>
              {t('signup.userName')}
            </label>
            <TextField
              placeholder={t('signup.userName')}
              id="userName"
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
              error={user.userName.error}
              helperText={user.userName.error ? user.userName.errorMessage : ''}
              value={user.userName.value}
              onChange={(e) => {
                if (/^\S*$/.test(e.target.value)) {
                  setUser({
                    ...user,
                    userName: {
                      value: e.target.value,
                      error: false,
                      errorMessage: '',
                    },
                  });
                }
              }}
            />
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
              type="password"
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
          {/* terms */}
          <Grid item style={{ marginTop: '0.7em', width: '100%' }}>
            <Grid container wrap="nowrap" alignItems="center">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="terms"
                      size="small"
                      checked={user.terms.value}
                      style={{ color: theme.palette.common.mainBack }}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          terms: {
                            value: e.target.checked,
                          },
                        })
                      }
                    />
                  }
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="h4"
                  component={'label'}
                  htmlFor="terms"
                  style={{
                    color: '#2C5282',
                    cursor: 'pointer',
                    paddingLeft: 0,
                  }}
                  className={classes.checkboxLabel}
                >
                  <Trans
                    i18nKey="signup.termsLabel"
                    components={{
                      a1: (
                        <a
                          href="https://tappio.de/agb/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            color: '#000',
                          }}
                        >
                          {''}
                        </a>
                      ),
                      a2: (
                        <a
                          href="https://tappio.de/datenschutzerklaerung/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            color: '#000',
                          }}
                        >
                          {''}
                        </a>
                      ),
                      a3: (
                        <a
                          href="https://tappio.de/impressum/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            color: '#000',
                          }}
                        >
                          {''}
                        </a>
                      ),
                    }}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {error.status && (
            <Grid item style={{ marginTop: '1em', width: '100%' }}>
              <Typography variant="subtitle2" style={{ display: 'flex', alignItems: 'center' }}>
                {' '}
                <ErrorOutlineIcon style={{ fill: 'red', marginRight: '4px' }} /> {error.message}
              </Typography>
            </Grid>
          )}
        </>
      )}
      {signupSuccess && (
        <Grid
          item
          style={{
            marginTop: '1em',
            minHeight: '30vh',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="subtitle2"
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {' '}
            <CheckCircleIcon
              style={{
                fill: theme.palette.common.mainBack,
                marginRight: '4px',
              }}
            />{' '}
            {t('signup.emailConfirmation')}
          </Typography>
        </Grid>
      )}
      {/* Signup button */}
      {!signupSuccess && (
        <Grid item style={{ marginTop: '0.7em', width: '100%' }}>
          <Button fullWidth className={classes.button} disabled={loading} onClick={SubmitHandler}>
            {loading ? (
              <CircularProgress size="2rem" style={{ color: theme.palette.common.mainFront }} />
            ) : (
              t('signup.button')
            )}
          </Button>
        </Grid>
      )}
      <Grid item style={{ alignSelf: 'center' }}>
        {/* <Button
          style={{
            textTransform: "none",
            background: "transparent",
            fontFamily: "Roboto",
          }}
          className={classes.label}
          onClick={() => setAccountType("")}
          startIcon={
            <ArrowForwardIcon style={{ transform: "rotate(180deg)" }} />
          }
        >
          {t("signup.back")}
        </Button> */}
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
            <Typography style={{ color: 'rgba(0, 0, 0, 0.5)' }} className={classes.checkboxLabel}>
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
  );
  const businessAccountTypeForm = individualSignupForm;

  return (
    <Grid container alignItems="stretch">
      {!matchesSM && (
        <Grid item md={7} className={classes.pageHeight}>
          <Welcome />
        </Grid>
      )}
      <Grid item md={5} xs={12} className={[classes.pageHeight].join(' ')}>
        <div className={classes.flexContainer}>
          <div className={classes.formContainer}>
            {accountType === ''
              ? accountTypeForm
              : accountType === 'Individual'
              ? individualSignupForm
              : businessAccountTypeForm}
          </div>
        </div>
        .
        <Footer />
      </Grid>
    </Grid>
  );
}
