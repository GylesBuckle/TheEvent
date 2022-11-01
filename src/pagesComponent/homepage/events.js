import React from 'react';
import { Typography, Grid, useMediaQuery, Button } from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.typography.container,
    paddingTop: '90px',
    zIndex: 1,
  },
  card: {
    boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    background: '#fff',
    padding: '30px 23px',
  },
}));
export default function Events() {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-end"
      className={classes.container}
    >
      <Grid item style={{ width: '100%' }} className={classes.card}></Grid>
    </Grid>
  );
}
