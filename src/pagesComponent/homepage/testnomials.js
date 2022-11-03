import React from 'react';
import { Typography, Grid, useMediaQuery, Button, Paper, CardMedia } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation, Trans } from 'react-i18next';
const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.typography.container,
  },
  background: {
    backgroundImage: 'url(/dev/homeHero.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  },
  paper: {
    boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    background: '#fff',
    padding: '30px 23px',
  },
  button: {
    ...theme.typography.button,
    padding: '11px 20px',
    borderRadius: 10,
    backgroundColor: '#FF5B21',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '15px',
    position: 'relative',
    [theme.breakpoints.down('1080')]: {
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    },
  },
  card: {
    position: 'relative',
    cursor: 'default',
    width: '100%',
    boxShadow: '0 10px 30px -15px rgba(2,12,27,0.7)',
    padding: '13px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    transition: 'all 0.25s cubic-bezier(0.645,0.045,0.355,1)',
    '&:hover': {
      transform: 'translateY(-7px)',
    },
  },
}));
export default function Testnomials() {
  const { t } = useTranslation();
  const cards = [
    {
      img: '/dev/card1.png',
      heading: t('homepage.testnomials.card1Heading'),
      text: t('homepage.testnomials.card1Text'),
    },
    {
      img: '/dev/card2.png',
      heading: t('homepage.testnomials.card2Heading'),
      text: t('homepage.testnomials.card2Text'),
    },
    {
      img: '/dev/card3.png',
      heading: t('homepage.testnomials.card3Heading'),
      text: t('homepage.testnomials.card3Text'),
    },
  ];
  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container direction="column" alignItems="center" className={classes.background}>
      <div
        style={{
          backgroundColor: 'rgba(93,93,93,.7)',
          width: '100%',
          zIndex: 0,
          position: 'absolute',
          height: '100%',
        }}
      />
      {/* card */}
      <Grid
        item
        className={classes.container}
        style={{ width: '100%', zIndex: 2, marginTop: '90px' }}
      >
        <Paper elevation={0} className={classes.paper}>
          <Grid container direction={matchesSM ? 'column' : 'row'} alignItems="center" spacing={3}>
            {/* profile */}
            <Grid item>
              <div style={{ padding: '30px 25px', position: 'relative', zIndex: 2 }}>
                {/* top left svg */}
                <div style={{ position: 'absolute', zIndex: '-1', left: '-5px', top: '30px' }}>
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
                    src="/dev/testnomials.png"
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
                <div
                  style={{ position: 'absolute', zIndex: '-1', bottom: '-18px', right: '-16px' }}
                >
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
                variant="h6"
                style={{
                  display: 'block',
                  color: '#1B1C31',
                  fontSize: '25px',
                  lineHeight: '41px',
                  letterSpacing: '-2%',
                  width: matchesSM ? '100%' : matchesMD ? '90%' : '80%',
                }}
              >
                {t('homepage.testnomials.testnomialsText1')}
              </Typography>
              <Typography
                variant="h6"
                style={{
                  display: 'block',
                  color: '#1B1C31',
                  fontSize: '25px',
                  lineHeight: '41px',
                  letterSpacing: '-2%',
                  marginTop: '40px',
                  width: matchesSM ? '100%' : matchesMD ? '90%' : '80%',
                }}
              >
                {t('homepage.testnomials.testnomialsText2')}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {/* heading */}
      <Grid
        item
        className={classes.container}
        style={{
          zIndex: 2,
          width: '100%',
          marginTop: matchesSM ? '40px' : '50px',
        }}
      >
        <Typography
          variant="h1"
          align="center"
          style={{
            color: '#fff',
            fontWeight: '800',
            zIndex: 1,
            lineHeight: '41px',
          }}
        >
          <Trans
            i18nKey="homepage.testnomials.testnomialsHeading"
            components={{
              span: <span style={{ color: '#FF5B21' }}></span>,
            }}
          />
        </Typography>
      </Grid>
      {/* cards */}
      <Grid
        item
        className={classes.container}
        style={{ marginTop: matchesSM ? '30px' : '50px', width: '100%' }}
      >
        <Grid container spacing={3}>
          {cards.map((c, i) => (
            <Grid item key={i} sm={4} xs={12} style={{ display: 'flex' }}>
              <Grid container direction="column" className={classes.card}>
                {/* img */}
                <Grid item style={{ width: '100%' }}>
                  <CardMedia
                    component="img"
                    style={{ borderRadius: '4px' }}
                    height="240"
                    image={c.img}
                    alt="green iguana"
                  />
                </Grid>
                {/* heading */}
                <Grid item style={{ width: '100%', marginTop: '10px' }}>
                  <Typography
                    variant="h5"
                    style={{
                      color: '#000',
                      fontWeight: '800',
                      zIndex: 1,
                      lineHeight: '29px',
                    }}
                  >
                    {c.heading}
                  </Typography>
                </Grid>
                {/* text */}
                <Grid item style={{ width: '100%', marginTop: '10px' }}>
                  <Typography
                    variant="subtitle1"
                    style={{
                      color: '#000',
                      fontWeight: '700',
                      zIndex: 1,
                      lineHeight: '29px',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {c.text}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* button */}
      <Grid item style={{ marginBottom: '90px', marginTop: matchesSM ? '20px' : '30px' }}>
        <Button
          className={classes.button}
          style={{ marginTop: '33px' }}
          endIcon={<ChevronRightIcon />}
        >
          {t('homepage.hero.button')}
        </Button>
      </Grid>
    </Grid>
  );
}
