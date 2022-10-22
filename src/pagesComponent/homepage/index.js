import React from 'react';
import { Grid } from '@material-ui/core';
import Header from './header';
import Landing from './landing';
import { makeStyles } from '@material-ui/core/styles';
import Firms from './firms';
import Services from './services';
// import Portal from "./portal";
import Reviews from './reviews';
import Footer from './footer';
import Pricing from './pricing';
import Download from './download';

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
        <Header {...props} />
      </Grid>
      <Grid
        item
        style={{ background: '#fff', width: '100%' }}
        // style={{ marginTop: '0.5em' }}
        className={classes.paddingContainer}
        id="home"
      >
        <Landing {...props} />
      </Grid>
      <Grid
        item
        container
        className={classes.paddingContainer}
        style={{ background: '#fff', marginTop: '0.5em', width: '100%' }}
        id="features"
      >
        <Firms />
      </Grid>
      {/* <Grid
        item
        className={classes.paddingContainer}
        style={{ background: "#fff", marginTop: "0.5em" }}
      >
        <Portal />
      </Grid> */}
      {/* connect with us */}
      <Grid
        item
        className={classes.paddingContainer}
        style={{ background: '#fff', marginTop: '2em' }}
      >
        <Services />
      </Grid>

      {/* pricing */}
      <Grid
        item
        className={classes.paddingContainer}
        style={{ background: '#fff', paddingTop: '2em', width: '100%' }}
      >
        <Pricing />
      </Grid>
      {/* revview */}
      <Grid
        item
        className={classes.paddingContainer}
        style={{ background: '#fff', marginTop: '2em', width: '100%' }}
      >
        <Reviews />
      </Grid>
      <Grid
        item
        className={classes.paddingContainer}
        style={{ background: '#fff', marginTop: '2em', width: '100%' }}
      >
        <Download />
      </Grid>
      {/* Foter */}
      <Grid
        item
        className={classes.paddingContainer}
        style={{ background: '#fff', marginTop: '2em' }}
      >
        <Footer />
      </Grid>
    </Grid>
  );
}
