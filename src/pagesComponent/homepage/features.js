import React from 'react';
import { Typography, Grid, useMediaQuery, Button, Paper } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation, Trans } from 'react-i18next';
import * as websiteInfo from '../../data/websiteInfo';

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
  button: {
    ...theme.typography.button,
    padding: '11px 50px',
    borderRadius: 15,
  },
}));

export default function features() {
  const { t } = useTranslation();
  const featuresArray = [
    t('homepage.features.feature1'),
    t('homepage.features.feature2'),
    t('homepage.features.feature3'),
    t('homepage.features.feature4'),
  ];
  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container direction="column" alignItems="center" className={classes.container}>
      {/* text1 */}
      <Grid item style={{ width: '100%' }}>
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
          {t('homepage.features.text1')}
        </Typography>
      </Grid>
      {/* text2 */}
      <Grid
        item
        style={{
          width: matchesSM ? '100%' : matchesMD ? '70%' : '43%',
          marginTop: matchesSM ? '40px' : '50px',
        }}
      >
        <Typography
          variant="h2"
          align="center"
          style={{
            color: '#FF5B21',
            fontWeight: '800',
            zIndex: 1,
            lineHeight: '53px',
          }}
        >
          {t('homepage.features.text2')}
        </Typography>
      </Grid>
      {/* features */}
      <Grid item style={{ width: '100%', marginTop: matchesSM ? '40px' : '50px' }}>
        <Paper
          elevation={0}
          style={{
            borderRadius: '15px',
            boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.15)',
            padding: '27px 35px',
          }}
        >
          <Grid container spacing={2}>
            {featuresArray.map((f, i) => (
              <Grid item key={i} xs={6} style={{ marginTop: i > 1 ? '30px' : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="47"
                    height="47"
                    fill="none"
                    viewBox="0 0 47 47"
                  >
                    <circle
                      cx="23.711"
                      cy="23.616"
                      r="21.614"
                      stroke="url(#paint0_linear_50_1065)"
                      strokeWidth="3"
                    ></circle>
                    <path
                      stroke="#FB5A23"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M12.711 23.617l6.806 7.012 14.584-15.026"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_50_1065"
                        x1="23.711"
                        x2="23.711"
                        y1="0.503"
                        y2="46.73"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#161B55"></stop>
                        <stop offset="1" stopColor="#FF5B21"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontWeight: '800',
                      zIndex: 1,
                      lineHeight: '29px',
                      width: matchesSM ? '100%' : matchesMD ? '70%' : '60%',
                      //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
                    }}
                  >
                    {f}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
      {/* text3 */}
      <Grid
        item
        style={{
          width: matchesSM ? '100%' : matchesMD ? '98%' : '64%',
          marginTop: matchesSM ? '40px' : '50px',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          style={{
            color: '#fff',
            fontWeight: '600',
            zIndex: 1,
            lineHeight: '42px',
          }}
        >
          {t('homepage.features.text3')}
        </Typography>
      </Grid>
      {/* text4 */}
      <Grid
        item
        style={{
          width: matchesSM ? '100%' : matchesMD ? '70%' : '60%',
          marginTop: matchesSM ? '40px' : '50px',
        }}
      >
        <Typography
          variant="h2"
          align="center"
          style={{
            color: '#FF5B21',
            fontWeight: '800',
            zIndex: 1,
            lineHeight: '53px',
          }}
        >
          {t('homepage.features.text4')}
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
            position: 'relative',
          }}
        >
          <Grid container spacing={2}>
            <Grid item lg={7} sm={8} xs={12}>
              <Grid container direction="column">
                <Typography
                  variant="h5"
                  style={{
                    color: '#000',
                    fontSize: '23px',
                    zIndex: 1,
                    lineHeight: '32px',
                    fontWeight: 700,
                    //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
                  }}
                >
                  <Trans
                    i18nKey="homepage.features.higherPurposeText"
                    values={{ email: websiteInfo.hightPurposeSupportEmail }}
                    components={{
                      a: (
                        <a
                          href={`mailto:${websiteInfo.hightPurposeSupportEmail}`}
                          style={{ color: '#FF5B21', textDecoration: 'none' }}
                        ></a>
                      ),
                    }}
                  />
                </Typography>
                <Grid item>
                  <Button
                    className={classes.button}
                    style={{ marginTop: '33px' }}
                    endIcon={<ChevronRightIcon />}
                  >
                    {t('homepage.hero.button')}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={5} sm={4} xs={12}></Grid>
          </Grid>
          {!matchesSM && (
            <div style={{ position: 'absolute', bottom: '-4.5px', right: '-35px' }}>
              <img src="/dev/featureSection.png" style={{ width: '100%', height: '100%' }} />
            </div>
          )}
        </Paper>
      </Grid>

      <Grid item style={{ width: '100%', marginTop: matchesSM ? '40px' : '50px' }}>
        <Paper
          elevation={0}
          style={{
            borderRadius: '15px',
            boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.15)',
            padding: '27px 35px',
            position: 'relative',
          }}
        >
          <Grid
            container
            direction={matchesSM ? 'column' : 'row'}
            alignItems={matchesSM ? 'center' : 'flex-start'}
          >
            {/* for text */}
            <Grid item md={6}>
              <Typography
                variant="h2"
                align={matchesSM ? 'center' : 'left'}
                style={{
                  fontFamily: 'Manrope',
                  fontSize: '42px',
                  color: theme.palette.primary.main,
                  fontWeight: '800',
                  zIndex: 1,
                  lineHeight: '57px',
                }}
              >
                {t('homepage.features.featuresImageHeadline')}
              </Typography>

              <Typography
                variant="h5"
                align={matchesSM ? 'center' : 'left'}
                style={{
                  marginTop: '34px',
                  fontFamily: 'Manrope',
                  color: '#000',
                  fontWeight: '800',
                  zIndex: 1,
                  lineHeight: '30px',
                }}
              >
                {t('homepage.features.featuresImageText1')}
              </Typography>
              <Typography
                variant="h5"
                align={matchesSM ? 'center' : 'left'}
                style={{
                  marginTop: '28px',
                  fontFamily: 'Manrope',
                  color: '#000',
                  fontWeight: '800',
                  zIndex: 1,
                  lineHeight: '30px',
                }}
              >
                {t('homepage.features.featuresImageText2')}
              </Typography>
              <Typography
                variant="h5"
                align={matchesSM ? 'center' : 'left'}
                style={{
                  marginTop: '28px',
                  fontFamily: 'Manrope',
                  color: '#000',
                  fontWeight: '800',
                  zIndex: 1,
                  lineHeight: '30px',
                }}
              >
                {t('homepage.features.featuresImageText3')}
              </Typography>
              <Typography
                variant="h5"
                align={matchesSM ? 'center' : 'left'}
                style={{
                  marginTop: '28px',
                  fontFamily: 'Manrope',
                  color: '#000',
                  fontWeight: '800',
                  zIndex: 1,
                  lineHeight: '30px',
                }}
              >
                {t('homepage.features.featuresImageText4')}
              </Typography>
              <Typography
                variant="h5"
                align={matchesSM ? 'center' : 'left'}
                style={{
                  marginTop: '28px',
                  fontFamily: 'Manrope',
                  color: '#000',
                  fontWeight: '800',
                  zIndex: 1,
                  lineHeight: '30px',
                }}
              >
                {t('homepage.features.featuresImageText5')}
              </Typography>
              {/* featuresImageFeature1 */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: matchesSM ? 'center' : 'flex-start',
                  gap: '7px',
                  marginTop: '28px',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="23"
                  fill="none"
                  viewBox="0 0 24 23"
                >
                  <circle
                    cx="11.978"
                    cy="11.804"
                    r="10.345"
                    stroke="url(#paint0_linear_50_1094)"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    stroke="#FB5A23"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6.697 11.805l3.268 3.366 7-7.213"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_50_1094"
                      x1="11.978"
                      x2="11.978"
                      y1="0.709"
                      y2="22.9"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#161B55"></stop>
                      <stop offset="1" stopColor="#FF5B21"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: '19px',
                    color: '#000',
                    fontWeight: '800',
                    zIndex: 1,
                    lineHeight: '29px',
                    marginTop: '-3px',

                    //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
                  }}
                >
                  {t('homepage.features.featuresImageFeature1')}
                </Typography>
              </div>
              {/* featuresImageFeature2 */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: matchesSM ? 'center' : 'flex-start',
                  gap: '7px',
                  marginTop: '24px',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="23"
                  fill="none"
                  viewBox="0 0 24 23"
                >
                  <circle
                    cx="11.978"
                    cy="11.804"
                    r="10.345"
                    stroke="url(#paint0_linear_50_1094)"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    stroke="#FB5A23"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6.697 11.805l3.268 3.366 7-7.213"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_50_1094"
                      x1="11.978"
                      x2="11.978"
                      y1="0.709"
                      y2="22.9"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#161B55"></stop>
                      <stop offset="1" stopColor="#FF5B21"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: '19px',
                    color: '#000',
                    fontWeight: '800',
                    zIndex: 1,
                    lineHeight: '29px',
                    marginTop: '-3px',
                    //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
                  }}
                >
                  {t('homepage.features.featuresImageFeature2')}
                </Typography>
              </div>
              {/* featuresImageFeature3 */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: matchesSM ? 'center' : 'flex-start',
                  gap: '7px',
                  marginTop: '24px',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="23"
                  fill="none"
                  viewBox="0 0 24 23"
                >
                  <circle
                    cx="11.978"
                    cy="11.804"
                    r="10.345"
                    stroke="url(#paint0_linear_50_1094)"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    stroke="#FB5A23"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6.697 11.805l3.268 3.366 7-7.213"
                  ></path>
                  <defs>
                    <linearGradient
                      id="paint0_linear_50_1094"
                      x1="11.978"
                      x2="11.978"
                      y1="0.709"
                      y2="22.9"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#161B55"></stop>
                      <stop offset="1" stopColor="#FF5B21"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <Typography
                  variant="subtitle1"
                  style={{
                    fontSize: '19px',
                    color: '#000',
                    fontWeight: '800',
                    zIndex: 1,
                    lineHeight: '29px',
                    marginTop: '-3px',
                    //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
                  }}
                >
                  {t('homepage.features.featuresImageFeature3')}
                </Typography>
              </div>
            </Grid>
            {/* image */}
            <Grid item md={6}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src="/dev/Group.png" style={{ width: '60%', height: '60%' }} />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
