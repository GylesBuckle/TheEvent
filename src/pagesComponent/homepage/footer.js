import {
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Divider,
  Snackbar,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useTranslation, Trans } from 'react-i18next';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import axios from '../../utils/axios';

const useStyles = makeStyles((theme) => ({
  footerHeading: {
    fontWeight: 400,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: 'rgba(0, 0, 0, 0.8)',
  },
  footerItem: {
    transition: 'all 0.3s ease-in-out',
    color: '#000',
  },
  button: {
    ...theme.typography.label,
    color: theme.palette.common.mainFront,
    backgroundColor: theme.palette.common.mainBack,
    borderRadius: '7px',
    fontWeight: 500,
    minHeight: '40px',
    fontSize: '16px',
    textTransform: 'none',
    padding: '10px 40px',

    '&:hover': {
      color: theme.palette.common.mainFront,
      backgroundColor: theme.palette.common.mainBack,
    },
  },
  inputRoot: {
    outline: 0,
    borderRadius: '7px',
    background: '#fff',
  },
  input: {
    '&::placeholder': {
      color: '#000',
    },
  },
  notchedOutlined: {
    border: '1px solid #000',
  },
  inputAdornedEnd: {
    padding: '9px',
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
export default function Footer() {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({
    active: false,
    message: '',
    severity: '',
  });

  const routes = [
    { name: t('homepage.header.1'), link: '#home', activeIndex: 0 },
    {
      name: t('homepage.header.2'),
      link: '#features',
      activeIndex: 1,
    },
    { name: t('homepage.header.3'), link: '#benefits', activeIndex: 2 },
    { name: t('homepage.header.4'), link: '#pricing', activeIndex: 3 },
    { name: t('homepage.header.5'), link: '#reviews', activeIndex: 4 },
  ];
  const legal = [
    {
      name: t('homepage.footer.legal1'),
      link: 'https://tappio.de/impressum/',
      activeIndex: 0,
    },
    {
      name: t('homepage.footer.legal2'),
      link: 'https://tappio.de/agb/',
      activeIndex: 2,
    },
    {
      name: t('homepage.footer.legal3'),
      link: 'https://tappio.de/datenschutzerklaerung/',
      activeIndex: 3,
    },
    {
      name: t('homepage.footer.legal4'),
      link: 'https://status.tappio.me/',
      activeIndex: 4,
    },
    {
      name: t('homepage.footer.legal5'),
      link: 'https://feedback.tappio.me/',
      activeIndex: 5,
    },
  ];
  const data = {
    // whatsApp: '',
    facebook: 'https://www.facebook.com/tappio.de',
    instagram: 'https://www.instagram.com/tappio.me/',
    linkedin: 'https://www.linkedin.com/company/tappio',
    // telegram: 'https://tappio.me/',
  };

  const SubmitHandler = async () => {
    if (email === '') {
      setShowToast({
        active: true,
        message: 'Email cannot be empty',
        severity: 'error',
      });

      return;
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setShowToast({
        active: true,
        message: 'Invalid Email',
        severity: 'error',
      });

      return;
    }

    try {
      setLoading(true);
      const result = await axios.post('/users/subcribe', {
        email: email,
      });

      if (result.data.status === 'success') {
        setShowToast({
          active: true,
          message: t('homepage.footer.success'),
          severity: 'success',
        });
        setEmail('');
      } else {
        setShowToast({
          active: true,
          message: result.data.message,
          severity: 'error',
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setShowToast({
        active: true,
        message: 'Something went wrong',
        severity: 'error',
      });
    }
  };

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
  return (
    <Grid container direction="column">
      <Snackbar open={showToast.active} autoHideDuration={4000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity={showToast.severity}>
          {showToast.message}
        </Alert>
      </Snackbar>
      <Grid item>
        <Grid container justifyContent="center" spacing={matchesSM ? 0 : 2}>
          <Grid item md={3} xs={12} className={matchesSM ? classes.flex : ''}>
            <img
              src="/dev/tappio.png"
              style={{
                width: '141px',
                height: '52px',
                //marginLeft: matchesXS ? 0 : "2em",
                display: 'flex',
                opacity: 1,
              }}
              alt="tappio Logo"
              data-aos="fade-up"
              data-aos-duration="2000"
            />
          </Grid>
          {/* Links */}
          <Grid item md={3} xs={12}>
            <Grid container direction="column" alignItems={matchesSM ? 'center' : 'flex-start'}>
              <Typography
                variant="subtitle1"
                data-aos="fade-up"
                data-aos-duration="2000"
                className={classes.footerHeading}
                style={{ marginTop: matchesSM ? '1em' : 0, opacity: 1 }}
              >
                {t('homepage.footer.nav1')}
              </Typography>
              {routes.map((item, i) => (
                <Typography
                  key={i}
                  style={{
                    marginTop: i === 0 ? '25px' : '6px',
                    textDecoration: 'none',
                    opacity: 1,
                  }}
                  variant="subtitle1"
                  className={classes.footerItem}
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  component={'a'}
                  href={item.link}
                >
                  {item.name}
                </Typography>
              ))}
            </Grid>
          </Grid>
          {/* Legal */}
          <Grid item md={3} xs={12}>
            <Grid container direction="column" alignItems={matchesSM ? 'center' : 'flex-start'}>
              <Typography
                variant="subtitle1"
                data-aos="fade-up"
                data-aos-duration="2000"
                className={classes.footerHeading}
                style={{ marginTop: matchesSM ? '1em' : 0, opacity: 1 }}
              >
                {t('homepage.footer.nav2')}
              </Typography>
              {legal.map((item, i) => (
                <Typography
                  key={i}
                  style={{
                    marginTop: i === 0 ? '25px' : '6px',
                    textDecoration: 'none',
                    opacity: 1,
                  }}
                  variant="subtitle1"
                  className={classes.footerItem}
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  component={'a'}
                  href={item.link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {item.name}
                </Typography>
              ))}
            </Grid>
          </Grid>
          {/* newsletter */}
          <Grid item md={3} xs={12}>
            <Grid container direction="column" alignItems={matchesSM ? 'center' : 'flex-start'}>
              <Typography
                variant="subtitle1"
                align={matchesSM ? 'center' : 'left'}
                className={classes.footerHeading}
                data-aos="fade-up"
                data-aos-duration="2000"
                style={{ marginTop: matchesSM ? '1em' : 0, opacity: 1 }}
              >
                {t('homepage.footer.nav3')}
              </Typography>

              <Typography
                variant="subtitle1"
                align={matchesSM ? 'center' : 'left'}
                style={{ marginTop: '25px', opacity: 1 }}
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <Trans
                  i18nKey="homepage.footer.text1" // optional -> fallbacks to defaults if not provided
                  components={{
                    span: <span style={{ textDecoration: 'underline' }} />,
                  }}
                />

                <Grid
                  item
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  style={{ marginTop: '10px', width: '100%', opacity: 1 }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={t('homepage.footer.inputPlaceholder')}
                    InputProps={{
                      classes: {
                        root: classes.inputRoot,
                        notchedOutline: classes.notchedOutlined,
                        adornedEnd: classes.inputAdornedEnd,
                        inputAdornedEnd: classes.inputAdornedEnd,
                        input: classes.input,
                      },
                      endAdornment: (
                        <Button
                          size={matchesSM ? 'small' : 'medium'}
                          variant="contained"
                          className={classes.button}
                          onClick={SubmitHandler}
                          disabled={loading}
                        >
                          {t('homepage.footer.submit')}{' '}
                          <CircularProgress
                            style={{
                              fontSize: '0.3rem',
                              color: theme.palette.common.mainFront,
                            }}
                          />
                        </Button>
                      ),
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item style={{ marginTop: '10px', width: '100%' }}>
                  <Typography
                    variant="body2"
                    align={matchesSM ? 'center' : 'left'}
                    style={{ color: '#878787', lineHeight: '2em', opacity: 1 }}
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  >
                    {t('homepage.footer.text2')}
                  </Typography>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        style={{ margin: '2em 0', opacity: 1 }}
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <Divider style={{ width: '100%' }} />
      </Grid>
      <Grid item>
        <Grid container direction={matchesSM ? 'column' : 'row'} alignItems="center">
          <Grid item>
            <Grid container alignItems="center" spacing={matchesSM ? 0 : 2}>
              <Typography
                align={matchesSM ? 'center' : 'left'}
                variant="body1"
                style={{ fontSize: matchesSM ? '15px' : '18px' }}
              >
                <a
                  href="https://tappio.de/agb/"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{
                    color: '#8B8B8B',

                    textDecoration: 'none',
                    marginRight: '20px',
                  }}
                >
                  {t('homepage.footer.terms')}
                </a>
              </Typography>
              <Typography
                align={matchesSM ? 'center' : 'left'}
                variant="body1"
                style={{ fontSize: matchesSM ? '15px' : '18px' }}
              >
                <a
                  href="https://tappio.de/faqs/"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{
                    color: '#8B8B8B',

                    textDecoration: 'none',
                  }}
                >
                  {t('homepage.footer.contact')}
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              margin: matchesSM ? '20px 0' : 0,
            }}
          >
            <Typography
              variant="body1"
              align={matchesSM ? 'center' : 'left'}
              style={{
                fontSize: matchesSM ? '15px' : ' 18px',
                color: '#8B8B8B',
              }}
            >
              {t('homepage.footer.copyRight')}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container spacing={matchesSM ? 0 : 2} alignItems="center" justifyContent="center">
              {/* <Grid item>
                <a
                  href={`https://api.whatsapp.com/send?phone=${data.whatsApp}`}
                  className={classes.iconBox}
                >
                  <WhatsappIcon fontSize="small" style={{ fill: '#000' }} />
                </a>
              </Grid> */}
              <Grid item>
                <a
                  href={data.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.iconBox}
                >
                  <FacebookIcon fontSize="small" style={{ fill: '#000' }} />
                </a>
              </Grid>
              <Grid item>
                <a
                  href={data.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.iconBox}
                >
                  <InstagramIcon fontSize="small" style={{ fill: '#000' }} />
                </a>
              </Grid>

              <Grid item>
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.iconBox}
                >
                  <LinkedInIcon fontSize="small" style={{ fill: '#000' }} />
                </a>
              </Grid>
              {/* <Grid item>
                <a
                  href={data.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.iconBox}
                >
                  <TelegramIcon fontSize="small" style={{ fill: '#000' }} />
                </a>
              </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
