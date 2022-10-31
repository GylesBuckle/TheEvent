import React from 'react';
import { Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Header from '../../reusable/header';
import Hero from './hero';
const useStyles = makeStyles((theme) => ({
  paddingContainer: {
    padding: '30px 70px',
    [theme.breakpoints.down('1350')]: {
      padding: '30px 40px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '5px',
    },
  },
}));
export default function Homepage(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      style={{
        background: '#fff',
      }}
    >
      <Grid item style={{ width: '100%' }}>
        <Header />
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <Hero />
      </Grid>
    </Grid>
  );
}
