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

const eventsData = [
  {
    tags: ['bonus'],
    locationCoordinates: [67.114544, 24.870862],
    sponsors: ['1667001427737-pexels-jd-danny-2385477.jpg', '1667001427739-Untitled-1 copy.png'],
    _id: '635c6c53933557eec0efb3e0',
    name: 'Bonus ',
    description: '<p><strong>Description</strong></p>',
    image: '1667001427732-pexels-julia-sakelli-1532244.jpg',
    startDate: '2022-10-29T07:00:00.000Z',
    endDate: '2022-10-29T07:00:00.000Z',
    location: 'Karachi, Sindh, Pakistan',
    venue: 'Venue',
    price: 20,
    address: 'Plot 326 flat korangi crossing Karachi',
    phone: '03182263109',
    email: 'S.m.sami125@gmail.com',
    facebook: '',
    twitter: '',
    insta: '',
    linkdin: '',
    snapchat: '',
    whatsApp: '',
    speakers: [
      {
        _id: '635c79188a7ac4ff6cc0b137',
        image: '1667001427741-template_0.jpg',
        name: 'Speaker K',
        description: 'Des',
        occupation: 'Occupation',
        facebook: 'fff',
        twitter: 'www',
        insta: 'wwww',
        linkdin: 'wwww',
        snapchat: 'wwww',
        whatsApp: 'wwww',
      },
      {
        _id: '635c79188a7ac4ff6cc0b138',
        image: '1667001427743-download.jpg',
        name: 'Ali',
        description: 'Speaker',
        occupation: 'Killer',
        facebook: 'facebook',
        twitter: 'twitter',
        insta: 'insta',
        linkdin: 'lindkin',
        snapchat: 'snapchat',
        whatsApp: 'whsp',
      },
    ],
    schedule: [
      {
        _id: '635c79188a7ac4ff6cc0b139',
        startDate: '2022-10-29T06:00:00.000Z',
        topic: 'topic',
        topicDetails: 'Details',
        speaker: 'Speaker',
      },
      {
        _id: '635c79188a7ac4ff6cc0b13a',
        startDate: '2022-10-29T07:00:00.000Z',
        topic: 'topic',
        topicDetails: 'Details',
        speaker: 'Speaker',
      },
    ],
    __v: 0,
  },
];
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
      <Grid item style={{ width: '100%' }} className={classes.card}>
        {/* photo */}
        <Grid container alignItems="center" justifyContent={matchesSM ? 'center' : 'space-between'}>
          {/* heading */}
          <Grid item>
            <Typography
              variant="h2"
              style={{
                fontWeight: '600',
                color: '#FF5B21',
                fontSize: matchesSM ? '32px' : '42px',
                lineHeight: '41px',
                letterSpacing: '-2%',
              }}
            >
              {t('homepage.events.heading')}
            </Typography>
          </Grid>
          {/* images */}
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 4,
                      width: '90px',
                      height: '90px',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '50%',
                      zIndex: '-1',
                    }}
                  />
                  <img src="/dev/event1.png" style={{ width: '100%', height: '100%' }} />
                </div>
              </Grid>
              <Grid item>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '5px',
                      left: '3px',
                      width: '90px',
                      height: '90px',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '50%',
                      zIndex: '-1',
                    }}
                  />
                  <img src="/dev/event2.png" style={{ width: '100%', height: '100%' }} />
                </div>
              </Grid>
              <Grid item>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 4,
                      width: '90px',
                      height: '90px',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '50%',
                      zIndex: '-1',
                    }}
                  />
                  <img src="/dev/event3.png" style={{ width: '100%', height: '100%' }} />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* for events */}
        <Grid container direction="column" style={{ marginTop: '20px' }}>
          <Grid item></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
