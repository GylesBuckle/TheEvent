import React from 'react';
import { Typography, Grid, useMediaQuery, Button, Paper } from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.typography.container,
  },
  background: {
    backgroundImage: 'url(/dev/homeHero.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  },
  card: {
    boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    background: '#fff',
    padding: '30px 23px',
  },
  button: {
    ...theme.typography.button,
    padding: '11px 20px',
    borderRadius: 15,
  },
}));
export default function Testnomials() {
  const { t } = useTranslation();

  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container direction="column" alignItems="center" className={classes.background}>
      <div
        style={{
          backgroundColor: 'rgba(93,93,93,.7)',
          width: '100%',
          zIndex: 0,
          position: 'absolute',
          height: '100%',
        }}
      />
      <Grid
        item
        className={classes.container}
        style={{ width: '100%', zIndex: 2, marginTop: '90px' }}
      >
        <Paper elevation={0} className={classes.card}></Paper>
      </Grid>
    </Grid>
  );
}
