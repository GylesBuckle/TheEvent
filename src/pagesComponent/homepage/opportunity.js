import React from 'react';
import { Typography, Grid, useMediaQuery, Button, Paper } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.typography.container,
    paddingTop: '90px',
    paddingBottom: '90px',
    zIndex: 1,
  },
  card: {
    boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    background: '#fff',
    padding: '30px 23px',
  },
  button: {
    ...theme.typography.button,
    padding: '11px 50px',
    borderRadius: 15,
  },
}));
export default function opportunity() {
  const { t } = useTranslation();

  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container direction="column" alignItems="center" className={classes.container}>
      {/* text 1 2*/}
      <Grid item style={{ width: '100%' }}>
        <Typography
          variant="h5"
          align="center"
          style={{
            color: '#010101',
            fontWeight: '700',
            zIndex: 1,
            lineHeight: '36px',
            //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
          }}
        >
          {t('homepage.opportunity.text1')}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          style={{
            color: '#010101',
            fontWeight: '700',
            zIndex: 1,
            lineHeight: '36px',
            //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
          }}
        >
          {t('homepage.opportunity.text2')}
        </Typography>
      </Grid>
      {/* text 3 4 */}
      <Grid
        item
        style={{ width: matchesSM ? '100%' : matchesMD ? '90%' : '70%', marginTop: '37px' }}
      >
        <Typography
          variant="h2"
          align="center"
          style={{
            color: '#FF5B21',
            fontWeight: '700',
            zIndex: 1,
            lineHeight: '53px',

            //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
          }}
        >
          {t('homepage.opportunity.text3')}
        </Typography>
        <Typography
          variant="h2"
          align="center"
          style={{
            color: '#FF5B21',
            fontWeight: '700',
            zIndex: 1,
            lineHeight: '53px',

            //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
          }}
        >
          {t('homepage.opportunity.text4')}
        </Typography>
      </Grid>
      {/* text5 */}
      <Grid
        item
        style={{ width: matchesSM ? '100%' : matchesMD ? '80%' : '50%', marginTop: '37px' }}
      >
        <Typography
          variant="h5"
          align="center"
          style={{
            color: '#010101',
            fontWeight: '700',
            zIndex: 1,
            lineHeight: '36px',
            //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
          }}
        >
          {t('homepage.opportunity.text5')}
        </Typography>
      </Grid>

      {/* text6 7 8 */}
      <Grid item style={{ width: '100%', marginTop: '70px' }}>
        <Typography
          variant="h5"
          style={{
            color: '#000',
            fontWeight: '700',
            zIndex: 1,
            lineHeight: '33px',
            borderLeft: '5px solid #0D1358',
            paddingLeft: '50px',
            paddingTop: '10px',
            paddingBottom: '10px',
            whiteSpace: 'pre-line',
          }}
        >
          {t('homepage.opportunity.text6')}
        </Typography>
        <Typography
          variant="h5"
          style={{
            color: '#000',
            fontWeight: '700',
            zIndex: 1,
            lineHeight: '33px',
            borderLeft: '5px solid #0D1358',
            paddingLeft: '50px',
            paddingTop: '10px',
            paddingBottom: '10px',
            whiteSpace: 'pre-line',
            marginTop: '28px',
          }}
        >
          {t('homepage.opportunity.text7')}
        </Typography>
        <Typography
          variant="h5"
          style={{
            color: '#000',
            fontWeight: '700',
            zIndex: 1,
            lineHeight: '33px',
            borderLeft: '5px solid #0D1358',
            paddingLeft: '50px',
            paddingTop: '10px',
            paddingBottom: '10px',
            whiteSpace: 'pre-line',
            marginTop: '28px',
          }}
        >
          {t('homepage.opportunity.text8')}
        </Typography>
      </Grid>
    </Grid>
  );
}
