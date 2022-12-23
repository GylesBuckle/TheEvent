import React from 'react';
import Link from 'next/link';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { Typography, Grid, useMediaQuery, Button } from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.typography.container,
    paddingTop: '70px',
    zIndex: 1,
  },
  card: {
    boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    background: '#fff',
    padding: '16px 30px 16px 30px',
    fontSize: '30px',
    fontWeight: 800,
  },
  button: {
    ...theme.typography.button,
    padding: '11px 20px',
    borderRadius: 10,
    backgroundColor: '#FF5B21',
  },
}));
export default function about() {
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
      className={classes.container}
    >
      <Grid item style={{ width: matchesSM ? '100%' : '55%' }}>
        <Typography
          variant="h3"
          align="center"
          style={{
            //fontSize: '24px',
            fontWeight: '900',
            zIndex: 1,
            lineHeight: '54px',
            //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
          }}
        >
          {t('homepage.about.heading')}
        </Typography>
      </Grid>
      <Grid item style={{ width: '100%', marginTop: '30px' }} className={classes.card}>
        <Grid container direction={matchesSM ? 'column' : 'row'} alignItems="center" spacing={3}>
          {/* profile */}
          <Grid item>
            <div style={{ padding: '30px 25px', position: 'relative', zIndex: 2 }}>
              {/* top left svg */}
              <div style={{ position: 'absolute', zIndex: '-1', left: '-5px', top: '-2px' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="66"
                  height="67"
                  fill="none"
                  viewBox="0 0 66 67"
                  style={{ zIndex: 2 }}
                >
                  <path
                    fill="#0D1358"
                    d="M24.25.618A23.385 23.385 0 00.863 24.003H24.25V.618zM41.788 19.618a23.385 23.385 0 00-23.385 23.385h23.385V19.618z"
                  ></path>
                </svg>
              </div>
              {/* top right dots */}
              <div style={{ position: 'absolute', zIndex: '-1', right: '-5px', top: '13px' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  fill="none"
                  viewBox="0 0 100 100"
                >
                  <g fill="#C4C4C4" opacity="0.3">
                    <path d="M.607.089h2.68v2.68H.607V.088zM16.684.089h2.68v2.68h-2.68V.088zM32.762.089h2.68v2.68h-2.68V.088zM48.84.089h2.679v2.68h-2.68V.088zM64.916.089h2.68v2.68h-2.68V.088zM80.994.089h2.68v2.68h-2.68V.088zM97.071.089h2.68v2.68h-2.68V.088zM.607 16.166h2.68v2.68H.607v-2.68zM16.684 16.166h2.68v2.68h-2.68v-2.68zM32.762 16.166h2.68v2.68h-2.68v-2.68zM48.84 16.166h2.679v2.68h-2.68v-2.68zM64.916 16.166h2.68v2.68h-2.68v-2.68zM80.994 16.166h2.68v2.68h-2.68v-2.68zM97.071 16.166h2.68v2.68h-2.68v-2.68zM.607 32.243h2.68v2.68H.607v-2.68zM16.684 32.243h2.68v2.68h-2.68v-2.68zM32.762 32.243h2.68v2.68h-2.68v-2.68zM48.84 32.243h2.679v2.68h-2.68v-2.68zM64.916 32.243h2.68v2.68h-2.68v-2.68zM80.994 32.243h2.68v2.68h-2.68v-2.68zM97.071 32.243h2.68v2.68h-2.68v-2.68zM.607 48.32h2.68V51H.607v-2.68zM16.684 48.32h2.68V51h-2.68v-2.68zM32.762 48.32h2.68V51h-2.68v-2.68zM48.84 48.32h2.679V51h-2.68v-2.68zM64.916 48.32h2.68V51h-2.68v-2.68zM80.994 48.32h2.68V51h-2.68v-2.68zM97.071 48.32h2.68V51h-2.68v-2.68zM.607 64.398h2.68v2.68H.607v-2.68zM16.684 64.398h2.68v2.68h-2.68v-2.68zM32.762 64.398h2.68v2.68h-2.68v-2.68zM48.84 64.398h2.679v2.68h-2.68v-2.68zM64.916 64.398h2.68v2.68h-2.68v-2.68zM80.994 64.398h2.68v2.68h-2.68v-2.68zM97.071 64.398h2.68v2.68h-2.68v-2.68zM.607 80.475h2.68v2.68H.607v-2.68zM16.684 80.475h2.68v2.68h-2.68v-2.68zM32.762 80.475h2.68v2.68h-2.68v-2.68zM48.84 80.475h2.679v2.68h-2.68v-2.68zM64.916 80.475h2.68v2.68h-2.68v-2.68zM80.994 80.475h2.68v2.68h-2.68v-2.68zM97.071 80.475h2.68v2.68h-2.68v-2.68zM.607 96.553h2.68v2.68H.607v-2.68zM16.684 96.553h2.68v2.68h-2.68v-2.68zM32.762 96.553h2.68v2.68h-2.68v-2.68zM48.84 96.553h2.679v2.68h-2.68v-2.68zM64.916 96.553h2.68v2.68h-2.68v-2.68zM80.994 96.553h2.68v2.68h-2.68v-2.68zM97.071 96.553h2.68v2.68h-2.68v-2.68z"></path>
                  </g>
                </svg>
              </div>
              <div
                style={{
                  zIndex: 2,
                  width: '100%',
                  height: '100%',
                  maxWidth: '270px',
                  maxHeight: '320px',
                }}
              >
                <img
                  src={`${publicRuntimeConfig.REACT_APP_ASSET_PREFIX}dev/homepageAbout.png`}
                  style={{ width: '100%', height: '100%', maxWidth: '270px', maxHeight: '320px' }}
                />
              </div>
              {/* bottom left line */}
              <div style={{ position: 'absolute', zIndex: '-1', bottom: '2px', left: '33%' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="86"
                  height="14"
                  fill="none"
                  viewBox="0 0 86 14"
                >
                  <path
                    stroke="#E0E0E0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.673 9.926l7.368-6.699 6.7 6.699 5.694-5.694 5.694 5.694 5.694-5.694 5.694 5.694 5.694-5.694 5.694 5.694 5.694-5.694 5.694 5.694 5.694-5.694 5.694 5.694 5.694-5.694"
                  ></path>
                  <circle
                    cx="81.375"
                    cy="4.567"
                    r="3.019"
                    fill="#0D1358"
                    stroke="#fff"
                    strokeWidth="2"
                  ></circle>
                  <circle
                    cx="5.008"
                    cy="9.926"
                    r="3.019"
                    fill="#0D1358"
                    stroke="#fff"
                    strokeWidth="2"
                  ></circle>
                </svg>
              </div>
              {/* bottom right svg */}
              <div style={{ position: 'absolute', zIndex: '-1', bottom: '-18px', right: '-16px' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="90"
                  height="90"
                  fill="none"
                  viewBox="0 0 90 90"
                >
                  <path
                    fill="#0D1358"
                    d="M.408 89.654A89.43 89.43 0 0089.838.224H.408v89.43z"
                  ></path>
                </svg>
              </div>
            </div>
          </Grid>
          {/* text */}
          <Grid item style={{ flex: 1 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="28"
              fill="none"
              viewBox="0 0 32 28"
              style={{ display: 'block', marginBottom: '20px' }}
            >
              <path
                fill="#0D1358"
                d="M31.815.884l-.783 5.623c-1.564-.132-2.835.131-3.813.79-.978.624-1.663 1.545-2.054 2.761-.358 1.184-.424 2.565-.195 4.143h6.845v13.417h-13.3V14.202c0-4.736 1.092-8.32 3.276-10.753C23.975.983 27.317.128 31.815.884zm-17.7 0l-.783 5.623c-1.564-.132-2.836.131-3.814.79-.978.624-1.662 1.545-2.053 2.761-.359 1.184-.424 2.565-.196 4.143h6.846v13.417H.815V14.202c0-4.736 1.092-8.32 3.276-10.753C6.275.983 9.616.128 14.115.884z"
              ></path>
            </svg>
            <Typography
              variant="h5"
              style={{
                display: 'block',
                color: '#1B1C31',
                fontSize: '25px',
                lineHeight: '41px',
                letterSpacing: '-2%',
                width: matchesSM ? '100%' : matchesMD ? '90%' : '70%',
              }}
            >
              {t('homepage.about.text')}
            </Typography>
            <Typography
              variant="h5"
              style={{
                display: 'block',
                color: '#1B1C31',
                fontSize: '25px',
                lineHeight: '41px',
                letterSpacing: '-2%',
                width: matchesSM ? '100%' : matchesMD ? '90%' : '68%',
              }}
            >
              {t('homepage.about.text1')}
            </Typography>
            <Typography
              variant="h5"
              style={{
                display: 'block',
                color: '#1B1C31',
                fontSize: '25px',
                lineHeight: '41px',
                letterSpacing: '-2%',
                width: matchesSM ? '100%' : matchesMD ? '90%' : '68%',
              }}
            >
              {t('homepage.about.text2')}
            </Typography>
            <Typography
              variant="h5"
              style={{
                display: 'block',
                color: '#1B1C31',
                fontSize: '25px',
                lineHeight: '41px',
                letterSpacing: '-2%',
                width: matchesSM ? '100%' : matchesMD ? '90%' : '68%',
              }}
            >
              {t('homepage.about.text3')}
            </Typography>
            <Typography
              variant="h5"
              style={{
                display: 'block',
                color: '#1B1C31',
                fontSize: '25px',
                lineHeight: '41px',
                letterSpacing: '-2%',
                width: matchesSM ? '100%' : matchesMD ? '90%' : '68%',
              }}
            >
              {t('homepage.about.text4')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: matchesSM ? '20px' : '30px' }}>
        <Link href="/#events">
          <Button className={classes.button}>{t('homepage.about.button')}</Button>
        </Link>
      </Grid>
    </Grid>
  );
}
