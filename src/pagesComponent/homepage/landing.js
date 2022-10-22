import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import { Grid, Typography, useTheme, useMediaQuery, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../context/GlobalContext';

const useStyles = makeStyles((theme) => ({
  headingLine: {
    position: 'relative',
    zIndex: 10,
    '&:before': {
      content: "''",
      width: '100%',
      height: '15px',
      backgroundColor: '#00FFD0',
      position: 'absolute',
      left: 0,
      bottom: '30px',
      zIndex: '-1',
      [theme.breakpoints.down('sm')]: {
        bottom: '10px',
        height: '10px',
      },
    },
  },
  button: {
    ...theme.typography.label,
    color: theme.palette.common.mainFront,
    backgroundColor: theme.palette.common.mainBack,
    borderRadius: '7px',
    fontWeight: 400,
    minHeight: '60px',
    fontSize: '1.1rem',
    textTransform: 'none',
    minWidth: '170px',
    [theme.breakpoints.down('sm')]: {
      minHeight: '50px',
      fontSize: '0.8rem',
      minWidth: '120px',
    },
    '&:hover': {
      color: '#2d2d2d',
      backgroundColor: '#00FFD0',
    },
  },
  inputRoot: {
    outline: 0,
    borderRadius: '7px',
    background: '#f4f4f4',
    fontSize: '18px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  notchedOutlined: {
    border: 'none',
    outline: 0,
  },
  inputAdornedEnd: {
    padding: '9px',
  },
  mainImage: {
    animation: 'jumpTwo 6s infinite linear',
  },
}));
export default function Landing(props) {
  const router = useRouter();
  const { t } = useTranslation();
  const classes = useStyles();
  const { user } = useContext(GlobalContext);
  let authenticated = !(user === null || !user.token);

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');

  return (
    <Grid
      container
      direction={matchesSM ? 'column-reverse' : 'row'}
      alignItems="center"
      justify="space-between"
    >
      {/* for text */}
      <Grid item md={6} xs={12}>
        <Grid container alignItems={matchesSM ? 'center' : 'flex-start'} direction="column">
          <Grid item style={{ width: !matchesSM ? '85%' : '100%' }}>
            <Typography
              variant="h1"
              disableGutters
              style={{
                fontSize: matchesSM ? '40px' : '100px',
                fontWeight: '700',
                lineHeight: '1.15em',
                marginTop: matchesSM ? '1em' : 0,
                color: '#000',
              }}
              align={matchesSM ? 'center' : 'left'}
            >
              <span className={classes.headingLine}>{t('homepage.landing.heading1')}</span>
              {t('homepage.landing.heading')}
            </Typography>
          </Grid>
          <Grid item style={{ width: !matchesSM ? '85%' : '100%', marginTop: '1em' }}>
            <Typography
              variant="body1"
              disableGutters
              align={matchesSM ? 'center' : 'left'}
              style={{
                lineHeight: '1.5em',
                fontSize: matchesSM ? '20px' : '24px',
                color: '#2f2f2f',
                fontWeight: 300,
              }}
            >
              {t('homepage.landing.description')}
            </Typography>
          </Grid>
          {props.loadingAuth === false && !authenticated && (
            <Grid item style={{ width: !matchesSM ? '85%' : '100%', marginTop: '1em' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="you@yourAwsomeEmail.com"
                InputProps={{
                  classes: {
                    root: classes.inputRoot,
                    notchedOutline: classes.notchedOutlined,
                    adornedEnd: classes.inputAdornedEnd,
                    inputAdornedEnd: classes.inputAdornedEnd,
                  },
                  endAdornment: (
                    <Button
                      size={matchesSM ? 'small' : 'medium'}
                      variant="contained"
                      className={classes.button}
                      onClick={() => router.push('/signup?email=' + email)}
                    >
                      {t('homepage.landing.tryforFree')}
                    </Button>
                  ),
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          )}
          <Grid item style={{ width: !matchesSM ? '85%' : '100%', marginTop: '1em' }}>
            <Typography
              variant="body1"
              disableGutters
              align={matchesSM ? 'center' : 'left'}
              style={{
                lineHeight: '25px',
                fontSize: '16px',
                color: '#878787',
                fontWeight: 300,
              }}
            >
              {t('homepage.landing.for')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* for img */}
      <Grid item md={6} xs={12}>
        <img
          src="/dev/tappiofbm.png"
          alt="tappiofbm.png"
          className={classes.mainImage}
          style={{ width: '100%', height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
