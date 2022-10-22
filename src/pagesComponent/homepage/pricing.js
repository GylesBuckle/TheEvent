import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import {
  Grid,
  Typography,
  Button,
  useTheme,
  Divider,
  Snackbar,
  CircularProgress,
  useMediaQuery,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import DoneIcon from '@material-ui/icons/Done';

import axios from '../../utils/axios';
import { GlobalContext } from '../../context/GlobalContext';
const useStyles = makeStyles((theme) => ({
  headline: {
    fontSize: '68px',
    fontWeight: '500',

    lineHeight: '1.32em',
    color: '#000',
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
  button: {
    ...theme.typography.label,

    borderRadius: '10px',
    fontWeight: 600,
    textTransform: 'none',
    fontSize: '18px',
    padding: '15px 40px',
  },
}));

export default function Pricing() {
  const router = useRouter();
  //const { i18n } = withTranslation('homepage');
  const { t, i18n } = useTranslation();

  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const { user } = useContext(GlobalContext);
  let authenticated = !(user === null || !user.token);

  const lng = i18n.language;
  const [selectedTenure, setSelectedTenure] = useState('month'); //year
  const [plans, setPlans] = useState([]);

  const [loading, setLoading] = useState({
    active: false,
    action: '',
  });

  const [showToast, setShowToast] = useState({
    active: false,
    message: '',
    severity: '',
  });

  const fetchSubcriptions = async () => {
    try {
      setLoading({
        active: true,
        action: 'page',
      });

      const response = await axios.get(`/subcriptions`);
      if (response.data.status === 'success') {
        setPlans(response.data.data.doc);
      } else {
        setShowToast({
          active: true,
          message: response.message,
          severity: 'error',
        });
      }
      setLoading({
        active: false,
        action: '',
      });
    } catch (err) {
      console.log(err);
      setLoading({
        active: false,
        action: '',
      });
      setShowToast({
        active: true,
        message: err.response?.data?.message || 'Failed to Load Products',
        severity: 'error',
      });
    }
  };
  useEffect(() => {
    fetchSubcriptions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowToast({
      active: false,
      message: '',
      severity: '',
    });
  };
  const renderFeatures = (item, features) =>
    features.map((f, i) => (
      <Grid
        key={i}
        container
        alignItems="center"
        spacing={2}
        style={{ marginTop: '0.5em' }}
        wrap="nowrap"
      >
        <Grid item>
          <div
            style={{
              color: item.popular ? theme.palette.common.mainBack : theme.palette.common.mainBack,
              backgroundColor: theme.palette.common.mainFront,
              borderRadius: 50,
              border: 0,
              width: '25px',
              height: '25px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <DoneIcon style={{ width: '20px', height: '20px' }} />
          </div>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            style={{
              fontWeight: '500',
              color: 'rgba(0, 0, 0, 0.8)',
              lineHeight: '42px',
            }}
          >
            {f}
          </Typography>
        </Grid>
      </Grid>
    ));
  return (
    <Grid container direction="column" alignItems="center">
      {/* title */}
      <Grid item>
        <Snackbar open={showToast.active} autoHideDuration={4000} onClose={handleToastClose}>
          <Alert onClose={handleToastClose} severity={showToast.severity}>
            {showToast.message}
          </Alert>
        </Snackbar>
        <Typography
          variant="h1"
          disableGutters
          className={classes.headline}
          align={'center'}
          style={{ whiteSpace: 'break-spaces' }}
          data-aos="fade-up"
          data-aos-duration="2000"
          data-aos-delay
        >
          {t('homepage.pricing.title')}
          <span className={classes.headingLine}>{t('homepage.pricing.title1')}</span>{' '}
        </Typography>
      </Grid>
      {/* monthly/yearly */}
      <Grid
        item
        style={{ marginTop: '3em' }}
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay
      >
        <Grid
          container
          style={{
            border: '2px solid #000',
            padding: '6px',
            borderRadius: '10px',
          }}
        >
          <Grid item>
            <Button
              fullWidth
              className={classes.button}
              style={{
                color:
                  selectedTenure === 'month'
                    ? theme.palette.common.mainFront
                    : theme.palette.common.mainBack,
                backgroundColor:
                  selectedTenure === 'month'
                    ? theme.palette.common.mainBack
                    : theme.palette.common.mainFront,
              }}
              onClick={() => setSelectedTenure('month')}
            >
              {t('plans.monthly')}
            </Button>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              className={classes.button}
              style={{
                color:
                  selectedTenure === 'year'
                    ? theme.palette.common.mainFront
                    : theme.palette.common.mainBack,
                backgroundColor:
                  selectedTenure === 'year'
                    ? theme.palette.common.mainBack
                    : theme.palette.common.mainFront,
              }}
              onClick={() => setSelectedTenure('year')}
            >
              {t('plans.yearly')}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* plans */}
      {loading.active && loading.action === 'page' ? (
        <Grid
          item
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20vh',
          }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <Grid item style={{ marginTop: '3em', width: '100%' }}>
          <Grid container spacing={matchesXS ? 0 : 2} alignItems="center" justifyContent="center">
            {plans.map((item, ind) => (
              <Grid item key={item._id} md={3} sm={4} xs={10}>
                <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay>
                  <Grid
                    container
                    direction="column"
                    style={{
                      border: item.popular ? '2px solid #000' : '1px solid #ececec',
                      borderRadius: '15px',
                      transition: 'all 0.3s ease-in-out',
                      padding: '35px 35px 35px',
                      //marginTop: item.popular ? '-30px' : undefined,
                      //transform: item.popular ? 'scaleY(1.05)' : undefined,
                    }}
                  >
                    {/* name */}
                    <Grid
                      item
                      style={{
                        marginTop: '1.2em',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          fontWeight: '500',
                          fontSize: '24px',
                          background: item.popular ? 'rgb(227, 248, 239)' : 'rgb(255, 236, 236)',
                          padding: '6px 13px',
                          display: 'inline-block',
                        }}
                        align="center"
                      >
                        {item.name}
                      </Typography>
                    </Grid>
                    {/* for price */}
                    <Grid item style={{ marginTop: '1.2em' }}>
                      <Typography variant="h3" align="center">
                        $
                        {item.lifeTime === true
                          ? item.lifeTimePrice
                          : selectedTenure === 'month'
                          ? item.monthlyPrice
                          : item.yearlyPrice * 12}
                        <span
                          style={{
                            fontSize: '17px',
                            fontWeight: '400',
                          }}
                        >
                          {' /'}
                          {item.lifeTime === true ? 'Life Time' : selectedTenure}
                        </span>
                      </Typography>
                    </Grid>
                    {/* description */}
                    <Grid item style={{ marginTop: '1.2em' }}>
                      <Typography
                        variant="body1"
                        style={{
                          fontWeight: '400',
                          color: '#848199',
                          textTransform: 'uppercase',
                          letterSpacing: '2px',
                        }}
                        align="center"
                      >
                        {lng?.includes('de') ? item.descriptionDE : item.description}
                      </Typography>
                    </Grid>
                    {/* divider */}
                    <Grid item style={{ margin: '0.8em 0', width: '100%' }}>
                      <Divider style={{ width: '100%' }} />
                    </Grid>
                    <Grid item style={{ marginTop: '0.4em' }}>
                      {renderFeatures(item, lng?.includes('de') ? item.featuresDE : item.features)}
                    </Grid>
                    <Grid item style={{ marginTop: '1.5em' }}>
                      <Button
                        fullWidth
                        className={classes.button}
                        style={{
                          color: item.popular
                            ? theme.palette.common.mainFront
                            : theme.palette.common.mainBack,
                          backgroundColor: item.popular ? theme.palette.common.mainBack : '#00ffd0',
                        }}
                        onClick={() => {
                          if (authenticated) {
                            router.push('/plans');
                          } else {
                            router.push('/login');
                          }
                        }}
                      >
                        {lng?.includes('de') ? item.buttonTextDE : item.buttonText}
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            ))}
          </Grid>
          <div id="reviews" />
        </Grid>
      )}
    </Grid>
  );
}
