import React from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import Link from 'next/link';
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
    padding: '11px 20px',
    borderRadius: 15,
  },
}));
export default function opportunity(props) {
  const { t } = useTranslation();

  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container direction="column" alignItems="center" className={classes.container}>
      {/* text 1 2*/}
      <Grid item style={{ width: '100%' }}>
        {/* <Typography
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
        </Typography> */}
        {/* <Typography
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
        </Typography> */}
      </Grid>
      {/* text 3 4 */}
      <Grid
        item
        style={{
          width: matchesSM ? '100%' : matchesMD ? '90%' : '67%',
          //marginTop: '37px'
        }}
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
        {/* <Typography
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
        </Typography> */}
      </Grid>
      {/* text5 */}
      <Grid
        item
        style={{ width: matchesSM ? '100%' : matchesMD ? '80%' : '45%', marginTop: '7px' }}
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
      {/* get My tickets */}
      <Grid item style={{ width: '100%', marginTop: matchesSM ? '40px' : '50px' }}>
        <Paper
          elevation={0}
          style={{
            borderRadius: '15px',
            boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.15)',

            padding: '27px 35px',
            boxSizing: 'border-box',
            paddingLeft: '60px',
            position: 'relative',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <img
              src={`${publicRuntimeConfig.REACT_APP_ASSET_PREFIX}dev/border.png`}
              style={{ width: '100%', height: '100%', borderRadius: '15px' }}
            />
          </div>
          {/* {!matchesSM && (
            <div style={{ position: 'absolute', bottom: '-4.5px', left: '-35px', width: 'auto' }}>
              <img
                src={`${publicRuntimeConfig.REACT_APP_ASSET_PREFIX}dev/opportunity-women.png`}
                style={{ width: '60%', height: '60%' }}
              />
            </div>
          )} */}
          <Grid container spacing={2}>
            <Grid item lg={6} md={8} sm={12} xs={12}>
              <Grid container alignItems={matchesSM ? 'center' : 'left'} direction="column">
                <Typography
                  variant="h5"
                  align={matchesSM ? 'center' : 'left'}
                  style={{
                    color: '#000',
                    fontSize: '23px',
                    zIndex: 1,
                    lineHeight: '32px',
                    fontWeight: 900,
                    whiteSpace: 'pre-line',
                    //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
                  }}
                >
                  {t('homepage.opportunity.cardText')}
                </Typography>
                <Grid item>
                  <Link href="/#events">
                    <Button
                      className={classes.button}
                      style={{ marginTop: '33px' }}
                      endIcon={<ChevronRightIcon />}
                    >
                      {t('homepage.hero.button')}
                    </Button>
                  </Link>
                </Grid>
                {props.latestEvent && (
                  <Grid item style={{ marginTop: '6px', position: 'relative' }}>
                    <Typography
                      variant="h5"
                      style={{
                        color: '#FF5B21',
                        fontSize: '14px',
                        letterSpacing: '-2%',
                      }}
                    >
                      {t('common.nextEvent')} {props.latestEvent}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          {!matchesSM && (
            <div
              style={{
                position: 'absolute',
                bottom: '0.5px',
                right: 0,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <img
                src={`${publicRuntimeConfig.REACT_APP_ASSET_PREFIX}dev/opportunity-men.png`}
                style={{ width: '60%', height: '60%' }}
              />
            </div>
          )}
        </Paper>
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
