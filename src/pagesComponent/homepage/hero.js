import React from 'react';
import { Typography, Grid, useMediaQuery, Button, CardMedia } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation, Trans } from 'react-i18next';

import * as websiteInfo from '../../data/websiteInfo';
const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.typography.container,
  },
  background: {
    backgroundImage: 'url(/dev/homeHero.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '87vh',
    position: 'relative',
  },
  button: {
    ...theme.typography.button,
    padding: '12px 23px',
    fontWeight: '500',
  },
}));
export default function Hero() {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('1600'));

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-end"
      className={classes.background}
    >
      <div
        style={{
          backgroundColor: 'rgba(93,93,93,.7)',
          width: '100%',
          zIndex: 0,
          position: 'absolute',
          height: '100%',
        }}
      />
      {/* text1 */}
      <Grid
        item
        className={classes.container}
        style={{ width: '100%', marginTop: matchesSM ? '30px' : '50px' }}
      >
        <Typography
          variant="h4"
          align="center"
          style={{
            color: '#fff',
            fontWeight: '800',
            zIndex: 1,
            lineHeight: '36px',
            //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
          }}
        >
          {t('homepage.hero.text1')}
        </Typography>
      </Grid>
      {/* text2 */}
      <Grid
        item
        className={classes.container}
        style={{ width: matchesSM ? '100%' : '70%', marginTop: '32px' }}
      >
        <Typography
          variant="h2"
          align="center"
          style={{
            color: '#fff',
            fontWeight: '800',
            zIndex: 1,
            lineHeight: '47px',
            //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
          }}
        >
          <Trans
            i18nKey="homepage.hero.text2"
            components={{
              span: <span style={{ color: '#7B86FF' }}></span>,
            }}
          />
        </Typography>
      </Grid>
      {/* images */}
      <Grid item style={{ width: '100%', zIndex: 2 }}>
        <Grid container justifyContent="space-between">
          {/* left man */}
          <Grid item>
            <img style={{ width: '100%', height: '100%' }} src="/dev/heroMan.png" />
          </Grid>
          <Grid item style={{ flex: 1, zIndex: 2, marginRight: '-30px' }}>
            <Grid container direction="column" alignItems="center" style={{ paddingTop: '55px' }}>
              {/* for video */}
              <Grid item style={{ width: '100%' }}>
                <CardMedia
                  component="iframe"
                  src={websiteInfo.heroPageVideo}
                  style={{
                    width: '100%',
                    minHeight: '310px',
                    height: 'auto',

                    borderRadius: '5px',
                  }}
                />
              </Grid>
              {/* text3 */}
              <Grid
                item
                style={{ width: matchesSM ? '100%' : matchesMD ? '90%' : '58%', marginTop: '22px' }}
              >
                <Typography
                  variant="h5"
                  align="center"
                  style={{
                    color: '#fff',
                    fontSize: '23px',
                    zIndex: 1,
                    lineHeight: '32px',
                    fontWeight: 500,
                    //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
                  }}
                >
                  {t('homepage.hero.text3')}
                </Typography>
              </Grid>
              {/* button */}
              <Grid item style={{ marginTop: '27px', marginBottom: '8px' }}>
                <Button className={classes.button} endIcon={<ChevronRightIcon />}>
                  {t('homepage.hero.button')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* right woman */}
          <Grid item>
            <img style={{ width: '100%', height: '100%', zIndex: 1 }} src="/dev/heroWomen.png" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
