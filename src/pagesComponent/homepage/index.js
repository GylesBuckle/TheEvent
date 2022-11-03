import React from 'react';
import { Grid } from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from '../../reusable/header';
import Hero from './hero';
import About from './about';
import Events from './events';
import Features from './features';
import Opportunity from './opportunity';

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
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      style={{
        background: '#FAFAFA',
      }}
    >
      <Grid item style={{ width: '100%' }}>
        <Header />
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <Hero />
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <About />
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <Events />
      </Grid>
      <Grid
        item
        style={{ width: '100%', marginTop: '50px', backgroundColor: theme.palette.primary.main }}
      >
        <Features />
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <Opportunity />
      </Grid>
    </Grid>
  );
}
