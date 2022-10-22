import React, { useContext } from 'react';
import { Grid, Typography, useTheme, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useTranslation } from 'react-i18next';
import DownloadButton from '../../reusable/downloadButton';
import { GlobalContext } from '../../context/GlobalContext';

const useStyles = makeStyles((theme) => ({
  headline: {
    fontSize: '68px',
    fontWeight: '500',

    lineHeight: '1.32em',

    marginTop: 10,
    [theme.breakpoints.down('sm')]: {
      fontSize: '40px',
    },
  },
  headingLine: {
    position: 'relative',
    display: 'inline-block',
    zIndex: 10,
    '&:before': {
      content: "''",
      width: '100%',
      height: '13px',
      backgroundColor: '#00FFD0',
      position: 'absolute',
      left: 0,
      bottom: '10px',
      zIndex: '-1',
      [theme.breakpoints.down('sm')]: {
        bottom: '5px',
        height: '8px',
      },
    },
  },
}));
export default function Download() {
  const { t } = useTranslation();
  const classes = useStyles();

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useContext(GlobalContext);
  let authenticated = !(user === null || !user.token);
  return (
    <Grid container direction="column" alignItems="center" style={{ position: 'relative' }}>
      {!matchesSM && (
        <div
          style={{
            position: 'absolute',
            left: '10%',
            top: '18%',
            animation: 'jumpTwo 6s infinite linear',
          }}
        >
          <img src="/dev/curve3.svg" alt="curve3" />
        </div>
      )}
      {!matchesSM && (
        <div
          style={{
            position: 'absolute',
            right: '9%',
            top: '54%',
            animation: 'jumpTwo 6s infinite linear',
          }}
        >
          <img src="/dev/curve4.svg" alt="curve4" />
        </div>
      )}
      {/* title */}
      <Grid item style={{ width: '100%' }}>
        <Grid container justifyContent="center">
          <Typography
            variant="h1"
            disableGutters
            className={classes.headline}
            align={'center'}
            style={{ width: matchesSM ? '100%' : '50%', color: '#000', opacity: 1 }}
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-delay
          >
            <span className={classes.headingLine}>{t('homepage.customer.title1')}</span>{' '}
            {t('homepage.customer.title')}
          </Typography>
        </Grid>
      </Grid>

      {/* description */}
      <Grid item style={{ marginTop: '1em' }}>
        <Typography
          variant="body1"
          disableGutters
          align={'center'}
          style={{
            lineHeight: '1.5em',
            fontSize: '24px',
            color: '#2f2f2f',
            fontWeight: 300,
            opacity: 1,
          }}
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay
        >
          {t('homepage.customer.description')}
        </Typography>
      </Grid>

      {/* button */}
      <Grid
        item
        style={{ marginTop: '2em', marginBottom: '3em', opacity: 1 }}
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay
      >
        <DownloadButton endIcon style={{ padding: '8px 51px' }} />
      </Grid>
    </Grid>
  );
}
