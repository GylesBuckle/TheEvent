import React from 'react';
import { Grid } from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Header from '../../reusable/header';
import Hero from './hero';
import About from './about';
import Events from './events';
import Features from './features';
import Opportunity from './opportunity';
import Testnomials from './testnomials';
import * as moment from 'moment';
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

  console.log(props.events);
  const latestEvent =
    props.events && props.events.length > 0
      ? moment(props.events[0].startDate).format('MMMM DD, YYYY | hh A') + ' UK Time'
      : undefined;

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
        <About latestEvent={latestEvent} />
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <Events events={props.events} latestEvent={latestEvent} />
      </Grid>
      <Grid item style={{ width: '100%', backgroundColor: theme.palette.primary.main }}>
        <Features latestEvent={latestEvent} />
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <Opportunity latestEvent={latestEvent} />
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <Testnomials latestEvent={latestEvent} />
      </Grid>
    </Grid>
  );
}
