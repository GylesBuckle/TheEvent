import React, { useState } from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Grid,
  useMediaQuery,
  Typography,
  Breadcrumbs,
  Paper,
  Button,
  IconButton,
  Divider,
} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import html_Parser from 'html-react-parser';
import * as moment from 'moment';
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from 'react-share';
import Header from '../../reusable/header';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backgroundFilter: 'blur(3.5px)',
    backgroundImage: 'url(/dev/eventHero.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
  },
  container: {
    ...theme.typography.container,
  },
  innerContainer: {
    marginRight: '50px',
    marginLeft: '50px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '30px',
      marginLeft: '30px',
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginLeft: 0,
    },
  },
  paper: {
    background: '#fff',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
  },
  paperPadding: {
    padding: '0px 16px',
  },
  button: {
    ...theme.typography.button,
    padding: '4px 10px',
  },
}));
export default function index(props) {
  const { t } = useTranslation();
  const router = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [likeEvent, setLikeEvent] = useState(false);
  const [starEvent, setStarEvent] = useState(false);

  const renderDetail = (icon, label, value, url) => (
    <Grid container alignItems="center" spacing={2}>
      {/* for icon */}
      <Grid item>{icon}</Grid>
      {/* for label value */}
      <Grid item>
        <div style={{ borderLeft: '1px solid #DDDDDD', paddingLeft: '20px' }}>
          <Typography variant="caption" style={{ color: '#2C2C2C', fontWeight: 700 }}>
            {label}
          </Typography>
          {url ? (
            <a href={url} target="_blank" style={{ textDecoration: 'none' }}>
              <Typography
                variant="subtitle2"
                style={{ color: '#6D6D6D', fontWeight: 400, marginTop: '-4px' }}
              >
                {value}
              </Typography>
            </a>
          ) : (
            <Typography
              variant="subtitle2"
              style={{ color: '#6D6D6D', fontWeight: 400, marginTop: '-4px' }}
            >
              {value}
            </Typography>
          )}
        </div>
      </Grid>
    </Grid>
  );
  return (
    <Grid
      container
      direction="column"
      style={{
        background: '#FAFAFA',
      }}
    >
      {/* header */}
      <Grid item style={{ width: '100%' }}>
        <Header />
      </Grid>
      {/* hero */}
      <Grid item className={classes.background} style={{ width: '100%', zIndex: 2 }}>
        <div
          style={{
            backgroundColor: 'rgba(93,93,93,.7)',
            width: '100%',
            zIndex: '-1',
            position: 'absolute',
            height: '100%',
          }}
        />
        <div
          className={[classes.container, classes.innerContainer].join(' ')}
          style={{ marginTop: '90px', marginBottom: '90px' }}
        >
          <Typography
            variant="h2"
            style={{
              color: '#fff',
              fontSize: '44px',
              fontWeight: '600',
              zIndex: 2,
              lineHeight: '48px',
              //textShadow: '0px 0px 20px #fff, 0px 0px 20px #fff',
            }}
          >
            {props.event.name}
          </Typography>
          <Breadcrumbs
            separator={<ArrowForwardIosIcon style={{ color: '#D6D6D6', fontSize: '0.8rem' }} />}
            aria-label="breadcrumb"
            style={{ marginTop: '8px' }}
          >
            <Link underline="hover" key="1" href="/">
              <Typography
                variant="subtitle1"
                style={{
                  color: '#D6D6D6',
                  fontSize: '21px',
                  fontWeight: '400',
                  zIndex: 2,
                  lineHeight: '25px',
                  cursor: 'pointer',
                }}
              >
                {t('event.home')}
              </Typography>
            </Link>
            <Link underline="hover" key="2" href="/#events">
              <Typography
                variant="subtitle1"
                style={{
                  color: '#D6D6D6',
                  fontSize: '21px',
                  fontWeight: '400',
                  zIndex: 2,
                  lineHeight: '25px',
                  cursor: 'pointer',
                }}
              >
                {t('event.event')}
              </Typography>
            </Link>
            <Typography
              variant="subtitle1"
              style={{
                color: '#D6D6D6',
                fontSize: '21px',
                fontWeight: '400',
                zIndex: 2,
                lineHeight: '25px',
              }}
            >
              {props.event.name}
            </Typography>
          </Breadcrumbs>
        </div>
      </Grid>
      {/* details */}
      <Grid item className={classes.container} style={{ width: '100%', marginTop: '35px' }}>
        <div className={classes.innerContainer}>
          <Grid container spacing={2}>
            {/* image and description */}
            <Grid item md={7} xs={12} style={{ display: 'flex' }}>
              <Paper
                elevation={0}
                className={classes.paper}
                style={{ width: '100%', height: '100%' }}
              >
                <img
                  src={`${publicRuntimeConfig.REACT_APP_API_URL}/files/events/${props.event.image}`}
                  style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
                  alt={props.event.image}
                />
                {props.event.description && (
                  <Typography
                    variant="subtitle2"
                    style={{
                      zIndex: 1,
                      wordBreak: 'break-word',
                      color: '#747474',
                      fontSize: '17px',
                      fontWeight: 300,
                    }}
                    className={classes.paperPadding}
                  >
                    {html_Parser(
                      props.event.description.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                    )}
                  </Typography>
                )}

                {/* tags */}
                {props.event.tags && props.event.tags.length > 0 && (
                  <div
                    style={{ display: 'flex', gap: '8px', marginTop: '20px' }}
                    className={classes.paperPadding}
                  >
                    {props.event.tags.map((t, i) => (
                      <Button
                        key={i}
                        style={{
                          borderRadius: '6px',
                          fontSize: '16px',
                          fontWeight: 400,
                          //fontFamily: 'Manrope',
                          textTransform: 'uppercase',
                        }}
                        className={classes.button}
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                )}

                {/* share event heading */}

                <div style={{ marginTop: '20px' }} className={classes.paperPadding}>
                  <Typography
                    variant="subtitle2"
                    style={{
                      color: '#2C2C2C',
                      fontSize: '18px',
                      fontWeight: '700',
                      zIndex: 2,
                    }}
                  >
                    {t('event.share')}
                  </Typography>
                </div>

                {/* social media */}
                <div style={{ marginTop: '10px' }} className={classes.paperPadding}>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <FacebookShareButton
                      url={`${publicRuntimeConfig.REACT_APP_URL}/event/${router.query.id}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        fill="none"
                        viewBox="0 0 33 33"
                      >
                        <g clipPath="url(#clip0_32_416)">
                          <rect
                            width="32.027"
                            height="32.027"
                            x="0.767"
                            y="0.485"
                            fill={theme.palette.primary.main}
                            rx="16.014"
                          ></rect>
                          <path
                            fill="#fff"
                            d="M23.014 21.127l.71-4.628h-4.441v-3.003c0-1.267.619-2.502 2.608-2.502h2.02V7.053s-1.832-.313-3.584-.313c-3.659 0-6.049 2.218-6.049 6.23v3.528h-4.065v4.63h4.066v11.19c.816.128 1.65.194 2.502.194.85 0 1.685-.066 2.502-.194v-11.19h3.731z"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_32_416">
                            <rect
                              width="32.027"
                              height="32.027"
                              x="0.767"
                              y="0.485"
                              fill="#fff"
                              rx="16.014"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`${publicRuntimeConfig.REACT_APP_URL}/event/${router.query.id}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        fill="none"
                        viewBox="0 0 33 33"
                      >
                        <rect
                          width="32.027"
                          height="32.027"
                          x="0.263"
                          y="0.485"
                          fill={theme.palette.primary.main}
                          rx="16.014"
                        ></rect>
                        <path
                          fill="#fff"
                          d="M13.347 24.946c7.102 0 10.985-5.885 10.985-10.986 0-.168 0-.336-.008-.496a7.908 7.908 0 001.93-2.002 7.836 7.836 0 01-2.218.609c.8-.48 1.409-1.233 1.697-2.138-.745.44-1.57.76-2.45.937a3.842 3.842 0 00-2.818-1.217c-2.13 0-3.86 1.73-3.86 3.859 0 .304.032.6.104.88a10.953 10.953 0 01-7.958-4.035 3.873 3.873 0 00-.52 1.938c0 1.337.68 2.522 1.72 3.21a3.794 3.794 0 01-1.745-.48v.048a3.865 3.865 0 003.099 3.787 3.847 3.847 0 01-1.746.065 3.855 3.855 0 003.603 2.682A7.76 7.76 0 017.446 23.2a10.757 10.757 0 005.9 1.746z"
                        ></path>
                      </svg>
                    </TwitterShareButton>
                    <InstapaperShareButton
                      url={`${publicRuntimeConfig.REACT_APP_URL}/event/${router.query.id}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        fill="none"
                        viewBox="0 0 33 33"
                      >
                        <g clipPath="url(#clip0_32_420)">
                          <path
                            fill={theme.palette.primary.main}
                            d="M8.793 32.399c-1.905-.087-2.94-.404-3.628-.672-.912-.355-1.562-.778-2.246-1.461a6.022 6.022 0 01-1.461-2.246c-.269-.688-.586-1.723-.672-3.627C.69 22.333.672 21.716.672 16.5c0-5.216.02-5.833.113-7.894.086-1.904.405-2.937.672-3.627a6.092 6.092 0 011.46-2.248 6.03 6.03 0 012.247-1.46C5.852 1 6.887.684 8.792.597c2.06-.094 2.678-.113 7.893-.113 5.216 0 5.833.02 7.893.113 1.905.087 2.938.406 3.628.672a6.046 6.046 0 012.246 1.461c.685.684 1.106 1.335 1.461 2.247.269.688.586 1.723.672 3.627.095 2.061.114 2.678.114 7.894 0 5.214-.02 5.833-.114 7.894-.086 1.904-.405 2.94-.672 3.627-.355.912-.777 1.562-1.46 2.246-.684.683-1.335 1.106-2.247 1.46-.688.27-1.723.586-3.628.673-2.058.094-2.677.113-7.893.113-5.215 0-5.833-.018-7.892-.113z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M13.051 16.385a3.52 3.52 0 117.042 0 3.52 3.52 0 01-7.042 0zm-1.903 0a5.423 5.423 0 1010.847 0 5.423 5.423 0 00-10.847 0m9.794-5.639A1.268 1.268 0 1022.21 9.48a1.268 1.268 0 00-1.268 1.266zm-8.637 14.237c-1.03-.047-1.59-.219-1.962-.364a3.283 3.283 0 01-1.215-.79 3.26 3.26 0 01-.79-1.214c-.145-.372-.317-.931-.363-1.961-.052-1.114-.062-1.448-.062-4.269 0-2.82.011-3.154.062-4.268.047-1.03.22-1.589.363-1.962.192-.493.42-.845.79-1.214.37-.37.721-.6 1.215-.79.372-.146.932-.317 1.962-.364 1.113-.051 1.447-.061 4.267-.061 2.819 0 3.154.01 4.268.061 1.03.047 1.589.22 1.962.364.493.19.845.42 1.214.79.37.37.599.721.79 1.215.145.371.317.931.364 1.961.051 1.114.061 1.448.061 4.268 0 2.821-.01 3.155-.061 4.269-.047 1.03-.22 1.59-.364 1.961-.192.494-.42.845-.79 1.214-.369.37-.721.598-1.214.79-.372.146-.932.317-1.962.364-1.113.051-1.448.061-4.268.061-2.821 0-3.154-.01-4.267-.061m-.088-19.096c-1.124.051-1.893.23-2.564.49a5.184 5.184 0 00-1.87 1.219 5.157 5.157 0 00-1.22 1.87c-.26.672-.438 1.44-.49 2.565-.052 1.126-.064 1.486-.064 4.354 0 2.868.012 3.229.064 4.355.052 1.124.23 1.892.49 2.564.27.694.631 1.284 1.22 1.87a5.19 5.19 0 001.87 1.219c.672.261 1.44.44 2.564.49 1.127.052 1.486.064 4.355.064 2.868 0 3.228-.011 4.354-.063 1.125-.052 1.893-.23 2.564-.491a5.194 5.194 0 001.871-1.218 5.174 5.174 0 001.218-1.872c.261-.67.44-1.439.49-2.563.052-1.127.064-1.486.064-4.355 0-2.868-.012-3.228-.063-4.355-.051-1.124-.23-1.892-.49-2.563a5.195 5.195 0 00-1.219-1.871 5.168 5.168 0 00-1.87-1.219c-.672-.26-1.44-.44-2.564-.49-1.126-.052-1.486-.064-4.354-.064-2.868 0-3.229.012-4.356.064"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_32_420">
                            <path fill="#fff" d="M0.672 0.485H32.699V32.512H0.672z"></path>
                          </clipPath>
                        </defs>
                      </svg>
                    </InstapaperShareButton>
                    <LinkedinShareButton
                      url={`${publicRuntimeConfig.REACT_APP_URL}/event/${router.query.id}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        fill="none"
                        viewBox="0 0 33 33"
                      >
                        <g clipPath="url(#clip0_32_421)">
                          <rect
                            width="32.027"
                            height="32.027"
                            x="0.168"
                            y="0.485"
                            fill={theme.palette.primary.main}
                            rx="16.014"
                          ></rect>
                          <g clipPath="url(#clip1_32_421)">
                            <path
                              fill="#fff"
                              d="M6.84 9.65c0-.601.21-1.097.631-1.488.421-.39.968-.586 1.642-.586.66 0 1.196.192 1.604.577.421.397.632.914.632 1.55 0 .578-.205 1.059-.614 1.443-.42.397-.973.595-1.659.595h-.018c-.66 0-1.196-.198-1.605-.595-.408-.396-.613-.895-.613-1.496zm.235 15.779V13.383h4.003v12.046H7.075zm6.221 0H17.3v-6.727c0-.42.048-.745.144-.974.168-.408.424-.754.766-1.036.343-.283.773-.424 1.29-.424 1.346 0 2.02.907 2.02 2.723v6.438h4.003v-6.907c0-1.78-.421-3.129-1.262-4.048-.842-.92-1.954-1.38-3.337-1.38-1.55 0-2.759.667-3.624 2.002v.036h-.018l.018-.036v-1.713h-4.004c.024.384.036 1.58.036 3.588s-.012 4.827-.036 8.458z"
                            ></path>
                          </g>
                        </g>
                        <defs>
                          <clipPath id="clip0_32_421">
                            <path fill="#fff" d="M0.168 0.485H32.195V32.512H0.168z"></path>
                          </clipPath>
                          <clipPath id="clip1_32_421">
                            <path fill="#fff" d="M6.84 7.157H25.523V25.84H6.84z"></path>
                          </clipPath>
                        </defs>
                      </svg>
                    </LinkedinShareButton>
                    <WhatsappShareButton
                      url={`${publicRuntimeConfig.REACT_APP_URL}/event/${router.query.id}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="33"
                        height="33"
                        fill="none"
                        viewBox="0 0 33 33"
                      >
                        <rect
                          width="32.027"
                          height="32.027"
                          x="0.072"
                          y="0.485"
                          fill={theme.palette.primary.main}
                          rx="16.014"
                        ></rect>
                        <path
                          fill="#fff"
                          d="M6.372 25.813l1.373-4.986a9.534 9.534 0 01-1.29-4.815c0-5.31 4.342-9.626 9.672-9.626a9.622 9.622 0 016.843 2.82 9.523 9.523 0 012.83 6.81c0 5.31-4.343 9.626-9.677 9.626h-.005a9.718 9.718 0 01-4.625-1.172l-5.12 1.343zm5.367-3.084l.292.176a8.092 8.092 0 004.092 1.117h.004c4.43 0 8.04-3.587 8.04-8a7.944 7.944 0 00-2.353-5.661 7.997 7.997 0 00-5.687-2.345c-4.43-.005-8.039 3.582-8.039 7.996a7.94 7.94 0 001.23 4.256l.19.305-.812 2.95 3.043-.794z"
                        ></path>
                        <path
                          fill={theme.palette.primary.main}
                          d="M6.71 25.476l1.327-4.815a9.216 9.216 0 01-1.252-4.645c.005-5.124 4.193-9.293 9.342-9.293a9.3 9.3 0 016.606 2.724 9.214 9.214 0 012.732 6.574c0 5.125-4.193 9.293-9.338 9.293h-.004a9.378 9.378 0 01-4.463-1.13l-4.95 1.292z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M6.372 25.813l1.373-4.986a9.534 9.534 0 01-1.29-4.815c0-5.31 4.342-9.626 9.672-9.626a9.622 9.622 0 016.843 2.82 9.523 9.523 0 012.83 6.81c0 5.31-4.343 9.626-9.677 9.626h-.005a9.718 9.718 0 01-4.625-1.172l-5.12 1.343zm5.367-3.084l.292.176a8.092 8.092 0 004.092 1.117h.004c4.43 0 8.04-3.587 8.04-8a7.944 7.944 0 00-2.353-5.661 7.997 7.997 0 00-5.687-2.345c-4.43-.005-8.039 3.582-8.039 7.996a7.94 7.94 0 001.23 4.256l.19.305-.812 2.95 3.043-.794z"
                        ></path>
                        <path
                          fill="#fff"
                          fillRule="evenodd"
                          d="M13.71 11.986c-.18-.402-.37-.41-.542-.416-.14-.004-.302-.004-.464-.004a.891.891 0 00-.645.3c-.223.24-.844.822-.844 2.008 0 1.182.867 2.327.988 2.489.12.161 1.675 2.668 4.128 3.633 2.041.803 2.459.642 2.9.6.44-.041 1.428-.581 1.632-1.145.2-.563.2-1.043.14-1.145-.06-.101-.223-.161-.464-.281-.242-.12-1.429-.702-1.652-.785-.222-.079-.385-.12-.542.12-.163.24-.627.78-.766.942-.139.161-.283.18-.524.06-.241-.12-1.02-.374-1.944-1.196-.719-.637-1.206-1.427-1.345-1.667s-.014-.369.107-.489c.107-.106.241-.282.362-.42.12-.139.162-.24.24-.402.08-.161.043-.3-.018-.42-.06-.115-.533-1.306-.747-1.782z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </WhatsappShareButton>
                  </div>
                </div>

                <div style={{ marginTop: '15px' }} />
              </Paper>
            </Grid>
            {/* event Details */}
            <Grid
              item
              md={5}
              xs={12}
              style={{
                display: 'flex',

                marginTop: matchesSM ? '20px' : '0px',
              }}
            >
              <Grid container direction="column">
                <Grid item className={classes.paper} style={{ width: '100%' }}>
                  {/* event details */}
                  <Grid
                    container
                    spacing={1}
                    justifyContent="space-between"
                    alignItems="center"
                    className={classes.paperPadding}
                    style={{ marginTop: '18px' }}
                  >
                    <Grid item>
                      <Typography variant="caption" style={{ color: '#2C2C2C', fontWeight: 700 }}>
                        {t('event.eventDetails')}
                      </Typography>
                    </Grid>
                    <Grid item>
                      {/* like */}
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {/* like */}
                        <IconButton
                          onClick={() => setLikeEvent((s) => !s)}
                          size="small"
                          style={{ border: '1px solid #D9D9D9' }}
                        >
                          {likeEvent ? <StarIcon /> : <StarOutlineIcon />}
                        </IconButton>
                        {/* star */}
                        <IconButton
                          onClick={() => setStarEvent((s) => !s)}
                          size="small"
                          style={{ border: '1px solid #D9D9D9' }}
                        >
                          {starEvent ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>
                  {/* divider */}
                  <Divider style={{ marginTop: '18px' }} />
                  {/* startDate */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    {renderDetail(
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="46"
                        height="46"
                        fill="none"
                        viewBox="0 0 46 46"
                      >
                        <path
                          stroke={theme.palette.primary.main}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M8.386 15.772h30M36.51 8.272H10.26c-1.035 0-1.874.84-1.874 1.875v26.25c0 1.036.84 1.875 1.875 1.875h26.25c1.035 0 1.875-.84 1.875-1.875v-26.25c0-1.035-.84-1.875-1.875-1.875z"
                        ></path>
                        <path
                          stroke={theme.palette.primary.main}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M22.917 23.272h-6.563a.469.469 0 00-.468.47v6.562c0 .259.21.468.469.468h6.562c.259 0 .469-.21.469-.468V23.74a.469.469 0 00-.469-.469zM30.886 4.522v3.75M15.886 4.522v3.75"
                        ></path>
                      </svg>,
                      t('event.startDate'),
                      moment(props.event.startDate).format('MMMM DD ,yyyy')
                    )}
                  </div>
                  {/* divider */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    <Divider />
                  </div>
                  {/* endDate */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    {renderDetail(
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="46"
                        height="46"
                        fill="none"
                        viewBox="0 0 46 46"
                      >
                        <path
                          stroke={theme.palette.primary.main}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M8.386 15.772h30M36.51 8.272H10.26c-1.035 0-1.874.84-1.874 1.875v26.25c0 1.036.84 1.875 1.875 1.875h26.25c1.035 0 1.875-.84 1.875-1.875v-26.25c0-1.035-.84-1.875-1.875-1.875z"
                        ></path>
                        <path
                          stroke={theme.palette.primary.main}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M22.917 23.272h-6.563a.469.469 0 00-.468.47v6.562c0 .259.21.468.469.468h6.562c.259 0 .469-.21.469-.468V23.74a.469.469 0 00-.469-.469zM30.886 4.522v3.75M15.886 4.522v3.75"
                        ></path>
                      </svg>,
                      t('event.endDate'),
                      moment(props.event.endDate).format('MMMM DD ,yyyy')
                    )}
                  </div>
                  {/* divider */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    <Divider />
                  </div>
                  {/* time */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    {renderDetail(
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                        fill="none"
                        viewBox="0 0 45 45"
                      >
                        <path
                          stroke="#0D1358"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="3"
                          d="M22.232 39.262c9.113 0 16.5-7.387 16.5-16.5 0-9.112-7.387-16.5-16.5-16.5-9.112 0-16.5 7.388-16.5 16.5 0 9.113 7.388 16.5 16.5 16.5z"
                        ></path>
                        <path
                          stroke="#0D1358"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M22.232 13.596v9.166H31.4"
                        ></path>
                      </svg>,
                      t('event.time'),
                      moment(props.event.startDate).format('hh:mm a')
                    )}
                  </div>
                  {/* divider */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    <Divider />
                  </div>
                  {/* location */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    {renderDetail(
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="46"
                        height="46"
                        fill="none"
                        viewBox="0 0 46 46"
                      >
                        <path
                          stroke={theme.palette.primary.main}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M23.386 21.003a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                        ></path>
                        <path
                          stroke={theme.palette.primary.main}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M23.386 39.753s13.125-9.087 13.125-20.77c0-3.442-1.383-6.744-3.845-9.178a13.2 13.2 0 00-9.28-3.802 13.2 13.2 0 00-9.281 3.802 12.909 12.909 0 00-3.844 9.178c0 11.683 13.125 20.77 13.125 20.77z"
                        ></path>
                      </svg>,
                      t('event.location'),
                      props.event.location,
                      `https://www.google.com/maps/@${props.event.locationCoordinates[0]},${props.event.locationCoordinates[1]}`
                    )}
                  </div>
                  {/* divider */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    <Divider />
                  </div>
                  {/* venue */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    {renderDetail(
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="46"
                        height="46"
                        fill="none"
                        viewBox="0 0 46 46"
                      >
                        <path
                          stroke={theme.palette.primary.main}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M29.01 12.243l11.25-5.625v28.125l-11.25 5.625V12.243zM17.76 34.743l11.25 5.625V12.243L17.76 6.618v28.125zM6.51 12.243l11.25-5.625v28.125L6.51 40.368V12.243z"
                        ></path>
                      </svg>,
                      t('event.venue'),
                      props.event.venue
                    )}
                  </div>
                  {/* divider */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    <Divider />
                  </div>
                  {/* price */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    {renderDetail(
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="46"
                        height="46"
                        fill="none"
                        viewBox="0 0 46 46"
                      >
                        <path
                          stroke="#0D1358"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M37.732 9.983h-30c-1.035 0-1.875.84-1.875 1.875v22.5c0 1.036.84 1.875 1.875 1.875h30c1.036 0 1.875-.84 1.875-1.875v-22.5c0-1.036-.839-1.875-1.875-1.875zM13.357 28.733h7.5M5.857 21.233h33.75M5.857 17.483h33.75"
                        ></path>
                      </svg>,
                      t('event.price'),
                      `$${props.event.price}`
                    )}
                  </div>
                  {/* divider */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    <Divider />
                  </div>
                  {/* address */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    {renderDetail(
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                        fill="none"
                        viewBox="0 0 45 45"
                      >
                        <path
                          stroke={theme.palette.primary.main}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M7.566 39.162V9.828M36.9 29.42c-10.667 8.341-18.667-8.34-29.334 0V8.57c10.667-8.341 18.667 8.34 29.333 0v20.85z"
                        ></path>
                      </svg>,
                      t('event.address'),
                      props.event.address
                    )}
                  </div>
                  {/* divider */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    <Divider />
                  </div>
                  {/* phone */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    {renderDetail(
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="46"
                        height="46"
                        fill="none"
                        viewBox="0 0 46 46"
                      >
                        <path
                          fill={theme.palette.primary.main}
                          d="M18.05 8.09l-1.392.557 1.392-.558zm1.977 4.941l1.393-.557-1.393.557zm-.6 3.794l1.151.96-1.152-.96zM18.361 18.1l1.153.96-1.153-.96zm.23 5.053l-1.061 1.06 1.06-1.06zm3.594 3.594l1.06-1.06-1.06 1.06zm5.052.23l-.96-1.153.96 1.152zm1.277-1.065l.96 1.153-.96-1.152zm3.793-.6l-.557 1.392.557-1.392zm4.942 1.976l.557-1.393-.557 1.393zM9.41 7.232h5.159v-3H9.41v3zm7.248 1.415l1.976 4.941 2.786-1.114-1.977-4.942-2.785 1.115zm1.616 7.217l-1.064 1.277 2.305 1.92 1.063-1.276-2.304-1.92zm-.743 8.35l3.594 3.595 2.122-2.122-3.595-3.594-2.121 2.121zm10.668 3.916l1.276-1.064-1.92-2.305-1.277 1.064 1.92 2.305zm3.552-1.425l4.942 1.977 1.114-2.785-4.942-1.977-1.114 2.785zm6.356 4.066v5.158h3v-5.158h-3zm-2.052 7.211c-15.85 0-28.698-12.848-28.698-28.697h-3c0 17.506 14.192 31.697 31.698 31.697v-3zm2.052-2.053a2.053 2.053 0 01-2.052 2.053v3a5.053 5.053 0 005.052-5.053h-3zm-1.414-7.247a2.25 2.25 0 011.414 2.09h3a5.25 5.25 0 00-3.3-4.875l-1.114 2.785zm-7.218-1.616a2.25 2.25 0 012.276-.36l1.114-2.786a5.25 5.25 0 00-5.31.841l1.92 2.305zm-8.35.743a5.25 5.25 0 007.073.32l-1.92-2.304a2.25 2.25 0 01-3.031-.137l-2.122 2.12zM17.21 17.14a5.25 5.25 0 00.32 7.073l2.122-2.121a2.25 2.25 0 01-.137-3.031l-2.305-1.92zm1.424-3.553a2.25 2.25 0 01-.36 2.277l2.304 1.92a5.25 5.25 0 00.842-5.31l-2.786 1.113zm-4.066-6.356c.92 0 1.748.56 2.09 1.415l2.785-1.115a5.25 5.25 0 00-4.875-3.3v3zm-5.158-3a5.053 5.053 0 00-5.053 5.053h3c0-1.134.92-2.053 2.053-2.053v-3z"
                        ></path>
                      </svg>,
                      t('event.phone'),
                      props.event.phone,
                      `tel:${props.event.phone}`
                    )}
                  </div>
                  {/* divider */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    <Divider />
                  </div>
                  {/* email */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    {renderDetail(
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                        fill="none"
                        viewBox="0 0 45 45"
                      >
                        <path
                          stroke={theme.palette.primary.main}
                          s
                          trokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M36.9 9.89H7.565c-1.013 0-1.834.82-1.834 1.832v22c0 1.013.821 1.834 1.834 1.834h29.333c1.013 0 1.833-.821 1.833-1.834v-22c0-1.012-.82-1.833-1.833-1.833z"
                        ></path>
                        <path
                          stroke={theme.palette.primary.main}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5.732 11.722l16.972 12.834 16.028-12.834"
                        ></path>
                      </svg>,
                      t('event.email'),
                      props.event.email,
                      `mailto:${props.event.email}`
                    )}
                  </div>
                  {/* divider */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    <Divider />
                  </div>
                  {/* remainingTickets */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    {renderDetail(
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="43"
                        height="43"
                        fill="none"
                        viewBox="0 0 43 43"
                      >
                        <g fill={theme.palette.primary.main} clipPath="url(#clip0_32_369)">
                          <path d="M22.914.653c-.18.065-.46.18-.615.254-.156.082-4.16 4.02-8.9 8.744l-8.614 8.605-1.19.025c-1.156.025-1.213.033-1.738.295a2.816 2.816 0 00-1.37 1.403l-.214.46v6.644l.263.533c.32.648.648.985 1.337 1.346.295.147.64.41.78.574.22.279.245.369.245.87 0 .5-.024.59-.254.877-.14.172-.467.418-.722.558-.722.377-1.074.722-1.378 1.329l-.27.557v6.645l.213.46a2.816 2.816 0 001.37 1.402l.55.27h37.652l.55-.27a2.816 2.816 0 001.37-1.403l.212-.459v-6.644l-.27-.55c-.304-.615-.698-1-1.395-1.354-.246-.13-.566-.377-.705-.55-.23-.278-.255-.368-.255-.869 0-.5.025-.59.255-.87.14-.172.443-.41.672-.524.69-.337 1.124-.763 1.428-1.37l.27-.558v-6.644l-.27-.55a2.842 2.842 0 00-2.297-1.6l-.468-.04.246-.501c.214-.443.246-.59.246-1.206 0-1.19-.114-1.362-2.723-3.946-1.624-1.607-2.305-2.231-2.6-2.37-.591-.28-1.436-.312-2.166-.09-.68.204-.91.213-1.304.049-.41-.173-.59-.345-.771-.739-.197-.426-.197-.795.016-1.394.14-.386.164-.624.14-1.116-.058-1.025-.156-1.157-2.6-3.626C25.144.792 24.906.628 23.832.58c-.345-.017-.722.016-.919.074zm2.912 4.364l2.002 2.001-.156.476c-.41 1.296-.197 2.658.599 3.7.951 1.263 2.657 1.862 4.118 1.443.246-.065.541-.147.648-.172.164-.041.467.23 2.19 1.952 1.1 1.1 2.002 2.06 2.002 2.125 0 .066-.361.484-.796.919l-.804.804H29.23l-5.225-5.226-5.233-5.233 2.395-2.396c1.32-1.32 2.46-2.403 2.526-2.403.066 0 1.026.902 2.133 2.01zm-4.47 8.9l4.347 4.348H8.313l4.347-4.348c2.387-2.395 4.348-4.348 4.348-4.348s1.96 1.953 4.348 4.348zm9.72 16.488v9.68h-14.06c-12.674 0-14.077-.016-14.191-.131-.115-.107-.132-.492-.132-2.912v-2.79l.263-.139c1.107-.599 1.837-1.353 2.206-2.289.165-.402.19-.623.19-1.419 0-.795-.025-1.017-.19-1.419-.369-.935-1.099-1.69-2.206-2.288l-.263-.14v-2.764c0-2.461.017-2.781.14-2.92.123-.14.672-.148 14.191-.148h14.052v9.68zm8.548-9.54c.14.123.148.32.148 2.912v2.781l-.263.14c-1.107.598-1.837 1.353-2.207 2.288-.164.402-.188.624-.188 1.42 0 .795.024 1.017.188 1.418.37.936 1.1 1.69 2.207 2.29l.263.139v2.764c0 2.46-.017 2.78-.14 2.92-.123.14-.328.148-3.076.148h-2.937v-19.36h2.929c2.608 0 2.936.017 3.076.14z"></path>
                          <path d="M8.846 25.237v1.23h18.539v-2.46H8.845v1.23zM8.903 28.986c-.033.025-.057.583-.057 1.23v1.174h18.539V28.929h-9.212c-5.07 0-9.245.024-9.27.057zM8.862 35.139l.025 1.213 9.253.025 9.245.017V33.933H8.838l.024 1.206z"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_32_369">
                            <path
                              fill="#fff"
                              d="M0 0H42V42H0z"
                              transform="translate(.232 .546)"
                            ></path>
                          </clipPath>
                        </defs>
                      </svg>,
                      t('event.remainingTickets'),
                      props.event.remainingTickets
                    )}
                  </div>
                  {/* divider */}
                  <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                    <Divider />
                  </div>
                  {/* network */}
                  {(props.event.facebook ||
                    props.event.twitter ||
                    props.event.insta ||
                    props.event.linkdin ||
                    props.event.snapchat ||
                    props.event.whatsApp) && (
                    <div style={{ marginTop: '18px' }} className={classes.paperPadding}>
                      {renderDetail(
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          fill="none"
                          viewBox="0 0 45 45"
                        >
                          <path
                            stroke={theme.palette.primary.main}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M33.232 38.721a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM16.732 24.971l11 5.5M11.232 27.721a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM27.732 13.971l-11 5.5M33.232 16.721a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
                          ></path>
                        </svg>,
                        t('event.network'),
                        <div style={{ display: 'flex', gap: '10px' }}>
                          {props.event.facebook && (
                            <a
                              href={props.event.facebook}
                              target="_blank"
                              style={{ textDecoration: 'none' }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="13"
                                fill="none"
                                viewBox="0 0 33 33"
                              >
                                <g clipPath="url(#clip0_32_416)">
                                  <rect
                                    width="32.027"
                                    height="32.027"
                                    x="0.767"
                                    y="0.485"
                                    fill={theme.palette.primary.main}
                                    rx="16.014"
                                  ></rect>
                                  <path
                                    fill="#fff"
                                    d="M23.014 21.127l.71-4.628h-4.441v-3.003c0-1.267.619-2.502 2.608-2.502h2.02V7.053s-1.832-.313-3.584-.313c-3.659 0-6.049 2.218-6.049 6.23v3.528h-4.065v4.63h4.066v11.19c.816.128 1.65.194 2.502.194.85 0 1.685-.066 2.502-.194v-11.19h3.731z"
                                  ></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_32_416">
                                    <rect
                                      width="32.027"
                                      height="32.027"
                                      x="0.767"
                                      y="0.485"
                                      fill="#fff"
                                      rx="16.014"
                                    ></rect>
                                  </clipPath>
                                </defs>
                              </svg>
                            </a>
                          )}
                          {props.event.twitter && (
                            <a
                              href={props.event.twitter}
                              target="_blank"
                              style={{ textDecoration: 'none' }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="13"
                                fill="none"
                                viewBox="0 0 33 33"
                              >
                                <rect
                                  width="32.027"
                                  height="32.027"
                                  x="0.263"
                                  y="0.485"
                                  fill={theme.palette.primary.main}
                                  rx="16.014"
                                ></rect>
                                <path
                                  fill="#fff"
                                  d="M13.347 24.946c7.102 0 10.985-5.885 10.985-10.986 0-.168 0-.336-.008-.496a7.908 7.908 0 001.93-2.002 7.836 7.836 0 01-2.218.609c.8-.48 1.409-1.233 1.697-2.138-.745.44-1.57.76-2.45.937a3.842 3.842 0 00-2.818-1.217c-2.13 0-3.86 1.73-3.86 3.859 0 .304.032.6.104.88a10.953 10.953 0 01-7.958-4.035 3.873 3.873 0 00-.52 1.938c0 1.337.68 2.522 1.72 3.21a3.794 3.794 0 01-1.745-.48v.048a3.865 3.865 0 003.099 3.787 3.847 3.847 0 01-1.746.065 3.855 3.855 0 003.603 2.682A7.76 7.76 0 017.446 23.2a10.757 10.757 0 005.9 1.746z"
                                ></path>
                              </svg>
                            </a>
                          )}
                          {props.event.insta && (
                            <a
                              href={props.event.insta}
                              target="_blank"
                              style={{ textDecoration: 'none' }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="13"
                                fill="none"
                                viewBox="0 0 33 33"
                              >
                                <g clipPath="url(#clip0_32_420)">
                                  <path
                                    fill={theme.palette.primary.main}
                                    d="M8.793 32.399c-1.905-.087-2.94-.404-3.628-.672-.912-.355-1.562-.778-2.246-1.461a6.022 6.022 0 01-1.461-2.246c-.269-.688-.586-1.723-.672-3.627C.69 22.333.672 21.716.672 16.5c0-5.216.02-5.833.113-7.894.086-1.904.405-2.937.672-3.627a6.092 6.092 0 011.46-2.248 6.03 6.03 0 012.247-1.46C5.852 1 6.887.684 8.792.597c2.06-.094 2.678-.113 7.893-.113 5.216 0 5.833.02 7.893.113 1.905.087 2.938.406 3.628.672a6.046 6.046 0 012.246 1.461c.685.684 1.106 1.335 1.461 2.247.269.688.586 1.723.672 3.627.095 2.061.114 2.678.114 7.894 0 5.214-.02 5.833-.114 7.894-.086 1.904-.405 2.94-.672 3.627-.355.912-.777 1.562-1.46 2.246-.684.683-1.335 1.106-2.247 1.46-.688.27-1.723.586-3.628.673-2.058.094-2.677.113-7.893.113-5.215 0-5.833-.018-7.892-.113z"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    d="M13.051 16.385a3.52 3.52 0 117.042 0 3.52 3.52 0 01-7.042 0zm-1.903 0a5.423 5.423 0 1010.847 0 5.423 5.423 0 00-10.847 0m9.794-5.639A1.268 1.268 0 1022.21 9.48a1.268 1.268 0 00-1.268 1.266zm-8.637 14.237c-1.03-.047-1.59-.219-1.962-.364a3.283 3.283 0 01-1.215-.79 3.26 3.26 0 01-.79-1.214c-.145-.372-.317-.931-.363-1.961-.052-1.114-.062-1.448-.062-4.269 0-2.82.011-3.154.062-4.268.047-1.03.22-1.589.363-1.962.192-.493.42-.845.79-1.214.37-.37.721-.6 1.215-.79.372-.146.932-.317 1.962-.364 1.113-.051 1.447-.061 4.267-.061 2.819 0 3.154.01 4.268.061 1.03.047 1.589.22 1.962.364.493.19.845.42 1.214.79.37.37.599.721.79 1.215.145.371.317.931.364 1.961.051 1.114.061 1.448.061 4.268 0 2.821-.01 3.155-.061 4.269-.047 1.03-.22 1.59-.364 1.961-.192.494-.42.845-.79 1.214-.369.37-.721.598-1.214.79-.372.146-.932.317-1.962.364-1.113.051-1.448.061-4.268.061-2.821 0-3.154-.01-4.267-.061m-.088-19.096c-1.124.051-1.893.23-2.564.49a5.184 5.184 0 00-1.87 1.219 5.157 5.157 0 00-1.22 1.87c-.26.672-.438 1.44-.49 2.565-.052 1.126-.064 1.486-.064 4.354 0 2.868.012 3.229.064 4.355.052 1.124.23 1.892.49 2.564.27.694.631 1.284 1.22 1.87a5.19 5.19 0 001.87 1.219c.672.261 1.44.44 2.564.49 1.127.052 1.486.064 4.355.064 2.868 0 3.228-.011 4.354-.063 1.125-.052 1.893-.23 2.564-.491a5.194 5.194 0 001.871-1.218 5.174 5.174 0 001.218-1.872c.261-.67.44-1.439.49-2.563.052-1.127.064-1.486.064-4.355 0-2.868-.012-3.228-.063-4.355-.051-1.124-.23-1.892-.49-2.563a5.195 5.195 0 00-1.219-1.871 5.168 5.168 0 00-1.87-1.219c-.672-.26-1.44-.44-2.564-.49-1.126-.052-1.486-.064-4.354-.064-2.868 0-3.229.012-4.356.064"
                                  ></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_32_420">
                                    <path fill="#fff" d="M0.672 0.485H32.699V32.512H0.672z"></path>
                                  </clipPath>
                                </defs>
                              </svg>
                            </a>
                          )}
                          {props.event.linkdin && (
                            <a
                              href={props.event.linkdin}
                              target="_blank"
                              style={{ textDecoration: 'none' }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="13"
                                fill="none"
                                viewBox="0 0 33 33"
                              >
                                <g clipPath="url(#clip0_32_421)">
                                  <rect
                                    width="32.027"
                                    height="32.027"
                                    x="0.168"
                                    y="0.485"
                                    fill={theme.palette.primary.main}
                                    rx="16.014"
                                  ></rect>
                                  <g clipPath="url(#clip1_32_421)">
                                    <path
                                      fill="#fff"
                                      d="M6.84 9.65c0-.601.21-1.097.631-1.488.421-.39.968-.586 1.642-.586.66 0 1.196.192 1.604.577.421.397.632.914.632 1.55 0 .578-.205 1.059-.614 1.443-.42.397-.973.595-1.659.595h-.018c-.66 0-1.196-.198-1.605-.595-.408-.396-.613-.895-.613-1.496zm.235 15.779V13.383h4.003v12.046H7.075zm6.221 0H17.3v-6.727c0-.42.048-.745.144-.974.168-.408.424-.754.766-1.036.343-.283.773-.424 1.29-.424 1.346 0 2.02.907 2.02 2.723v6.438h4.003v-6.907c0-1.78-.421-3.129-1.262-4.048-.842-.92-1.954-1.38-3.337-1.38-1.55 0-2.759.667-3.624 2.002v.036h-.018l.018-.036v-1.713h-4.004c.024.384.036 1.58.036 3.588s-.012 4.827-.036 8.458z"
                                    ></path>
                                  </g>
                                </g>
                                <defs>
                                  <clipPath id="clip0_32_421">
                                    <path fill="#fff" d="M0.168 0.485H32.195V32.512H0.168z"></path>
                                  </clipPath>
                                  <clipPath id="clip1_32_421">
                                    <path fill="#fff" d="M6.84 7.157H25.523V25.84H6.84z"></path>
                                  </clipPath>
                                </defs>
                              </svg>
                            </a>
                          )}
                          {props.event.snapchat && (
                            <a
                              href={props.event.snapchat}
                              target="_blank"
                              style={{ textDecoration: 'none' }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="13"
                                fill="none"
                                viewBox="0 0 33 33"
                              >
                                <rect
                                  width="32.027"
                                  height="32.027"
                                  x="0.576"
                                  y="0.485"
                                  fill={theme.palette.primary.main}
                                  rx="16.014"
                                ></rect>
                                <path
                                  fill="#fff"
                                  d="M24.94 21.614c-3.126-1.514-3.625-3.85-3.647-4.024-.026-.21-.057-.375.175-.589.223-.206 1.214-.82 1.49-1.011.454-.318.654-.636.506-1.026-.103-.27-.354-.371-.619-.371-.083 0-.166.01-.248.028-.5.108-.984.358-1.265.426a.443.443 0 01-.103.014c-.15 0-.206-.067-.192-.247.035-.546.11-1.61.023-2.606-.118-1.37-.56-2.048-1.083-2.648-.254-.29-1.43-1.54-3.7-1.54-2.27 0-3.445 1.25-3.697 1.537-.525.6-.966 1.278-1.083 2.647-.086.995-.009 2.06.023 2.607.01.171-.042.246-.192.246a.444.444 0 01-.103-.014c-.28-.067-.765-.317-1.264-.426a1.151 1.151 0 00-.249-.028c-.265 0-.515.104-.619.372-.147.39.052.707.508 1.025.275.192 1.266.805 1.49 1.012.23.213.2.378.174.588-.022.176-.521 2.513-3.648 4.025-.183.088-.494.276.055.58.863.476 1.437.425 1.883.713.379.244.155.77.43.96.339.233 1.34-.017 2.632.41 1.083.357 1.741 1.365 3.663 1.365 1.92 0 2.598-1.013 3.663-1.365 1.29-.427 2.292-.177 2.63-.41.276-.19.052-.716.431-.96.446-.288 1.02-.237 1.883-.713.549-.3.237-.488.054-.577z"
                                ></path>
                                <path
                                  fill={theme.palette.primary.main}
                                  d="M26.301 21.436c-.14-.382-.407-.586-.712-.755a1.783 1.783 0 00-.154-.081c-.091-.047-.184-.092-.276-.14-.95-.503-1.69-1.138-2.204-1.89a4.285 4.285 0 01-.378-.67c-.044-.126-.042-.197-.01-.262a.426.426 0 01.12-.127c.164-.108.332-.217.446-.29.203-.132.364-.237.468-.31.39-.273.662-.562.832-.886a1.762 1.762 0 00.087-1.464c-.258-.679-.899-1.1-1.676-1.1a2.315 2.315 0 00-.615.081c.007-.464-.003-.954-.044-1.437-.147-1.696-.74-2.584-1.36-3.293a5.416 5.416 0 00-1.382-1.113c-.94-.536-2.005-.809-3.166-.809s-2.222.273-3.162.81c-.52.292-.988.668-1.385 1.114-.619.709-1.213 1.6-1.36 3.293-.04.483-.05.975-.044 1.437a2.302 2.302 0 00-.614-.082c-.778 0-1.42.422-1.677 1.101a1.765 1.765 0 00.085 1.466c.17.323.443.613.832.885.104.072.265.177.468.31.11.07.27.175.428.28a.459.459 0 01.137.137c.033.068.034.14-.015.275-.104.23-.228.449-.372.656-.502.736-1.221 1.359-2.14 1.858-.486.258-.992.43-1.205 1.01-.161.438-.056.937.353 1.357.15.156.324.288.516.39.399.22.823.389 1.262.505.091.024.177.062.255.114.15.13.128.327.327.615.1.15.226.278.373.38.417.288.886.306 1.382.325.448.017.957.037 1.537.228.24.08.49.233.78.413.694.427 1.646 1.012 3.238 1.012s2.55-.588 3.25-1.017c.288-.176.536-.328.77-.406.58-.192 1.088-.21 1.536-.228.497-.019.965-.037 1.382-.325.174-.121.32-.28.425-.464.143-.243.14-.413.274-.532a.789.789 0 01.239-.109 5.609 5.609 0 001.28-.51c.203-.109.386-.252.541-.424l.005-.006c.384-.41.48-.895.323-1.322zm-1.415.76c-.863.477-1.437.426-1.883.714-.38.244-.155.77-.43.96-.339.233-1.34-.017-2.631.41-1.066.352-1.746 1.366-3.663 1.366-1.918 0-2.582-1.012-3.665-1.369-1.29-.426-2.292-.176-2.631-.41-.275-.19-.052-.716-.43-.96-.447-.287-1.021-.236-1.884-.71-.55-.304-.237-.491-.054-.58 3.126-1.514 3.625-3.851 3.647-4.024.027-.21.057-.375-.174-.589-.223-.206-1.215-.82-1.49-1.012-.455-.318-.655-.635-.507-1.025.103-.27.355-.371.619-.371.083 0 .167.01.248.027.5.109.984.36 1.264.427a.444.444 0 00.104.014c.15 0 .202-.076.192-.247-.032-.546-.11-1.611-.024-2.607.119-1.369.56-2.047 1.084-2.647.252-.289 1.435-1.539 3.697-1.539s3.448 1.245 3.7 1.533c.525.6.966 1.278 1.083 2.647.087.996.012 2.06-.023 2.607-.012.18.043.246.192.246.035 0 .07-.005.103-.014.281-.067.766-.317 1.265-.426.082-.018.165-.027.249-.028.265 0 .515.104.619.372.147.39-.052.707-.508 1.025-.274.192-1.265.805-1.489 1.012-.232.213-.201.378-.174.588.022.176.52 2.514 3.647 4.025.185.092.497.28-.053.586z"
                                ></path>
                              </svg>
                            </a>
                          )}
                          {props.event.whatsApp && (
                            <a
                              href={props.event.whatsApp}
                              target="_blank"
                              style={{ textDecoration: 'none' }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="13"
                                fill="none"
                                viewBox="0 0 33 33"
                              >
                                <rect
                                  width="32.027"
                                  height="32.027"
                                  x="0.072"
                                  y="0.485"
                                  fill={theme.palette.primary.main}
                                  rx="16.014"
                                ></rect>
                                <path
                                  fill="#fff"
                                  d="M6.372 25.813l1.373-4.986a9.534 9.534 0 01-1.29-4.815c0-5.31 4.342-9.626 9.672-9.626a9.622 9.622 0 016.843 2.82 9.523 9.523 0 012.83 6.81c0 5.31-4.343 9.626-9.677 9.626h-.005a9.718 9.718 0 01-4.625-1.172l-5.12 1.343zm5.367-3.084l.292.176a8.092 8.092 0 004.092 1.117h.004c4.43 0 8.04-3.587 8.04-8a7.944 7.944 0 00-2.353-5.661 7.997 7.997 0 00-5.687-2.345c-4.43-.005-8.039 3.582-8.039 7.996a7.94 7.94 0 001.23 4.256l.19.305-.812 2.95 3.043-.794z"
                                ></path>
                                <path
                                  fill={theme.palette.primary.main}
                                  d="M6.71 25.476l1.327-4.815a9.216 9.216 0 01-1.252-4.645c.005-5.124 4.193-9.293 9.342-9.293a9.3 9.3 0 016.606 2.724 9.214 9.214 0 012.732 6.574c0 5.125-4.193 9.293-9.338 9.293h-.004a9.378 9.378 0 01-4.463-1.13l-4.95 1.292z"
                                ></path>
                                <path
                                  fill="#fff"
                                  d="M6.372 25.813l1.373-4.986a9.534 9.534 0 01-1.29-4.815c0-5.31 4.342-9.626 9.672-9.626a9.622 9.622 0 016.843 2.82 9.523 9.523 0 012.83 6.81c0 5.31-4.343 9.626-9.677 9.626h-.005a9.718 9.718 0 01-4.625-1.172l-5.12 1.343zm5.367-3.084l.292.176a8.092 8.092 0 004.092 1.117h.004c4.43 0 8.04-3.587 8.04-8a7.944 7.944 0 00-2.353-5.661 7.997 7.997 0 00-5.687-2.345c-4.43-.005-8.039 3.582-8.039 7.996a7.94 7.94 0 001.23 4.256l.19.305-.812 2.95 3.043-.794z"
                                ></path>
                                <path
                                  fill="#fff"
                                  fillRule="evenodd"
                                  d="M13.71 11.986c-.18-.402-.37-.41-.542-.416-.14-.004-.302-.004-.464-.004a.891.891 0 00-.645.3c-.223.24-.844.822-.844 2.008 0 1.182.867 2.327.988 2.489.12.161 1.675 2.668 4.128 3.633 2.041.803 2.459.642 2.9.6.44-.041 1.428-.581 1.632-1.145.2-.563.2-1.043.14-1.145-.06-.101-.223-.161-.464-.281-.242-.12-1.429-.702-1.652-.785-.222-.079-.385-.12-.542.12-.163.24-.627.78-.766.942-.139.161-.283.18-.524.06-.241-.12-1.02-.374-1.944-1.196-.719-.637-1.206-1.427-1.345-1.667s-.014-.369.107-.489c.107-.106.241-.282.362-.42.12-.139.162-.24.24-.402.08-.161.043-.3-.018-.42-.06-.115-.533-1.306-.747-1.782z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {/* Button */}
                  <div style={{ marginTop: '28px' }} className={classes.paperPadding}>
                    <Button
                      fullWidth
                      style={{
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        fontSize: '22px',
                      }}
                      className={classes.button}
                    >
                      {t('event.book')}
                    </Button>
                  </div>
                  <div style={{ marginTop: '18px' }} />
                </Grid>
                {props.event.sponsors && props.event.sponsors.length > 0 && (
                  <Grid item className={classes.paper} style={{ width: '100%', marginTop: '20px' }}>
                    <div style={{ marginTop: '18px' }} />
                    <Typography
                      variant="caption"
                      style={{ color: '#2C2C2C', fontWeight: 700 }}
                      className={classes.paperPadding}
                    >
                      {t('event.sponsors')}
                    </Typography>
                    <Divider style={{ marginTop: '18px' }} />
                    <Grid
                      container
                      spacing={2}
                      className={classes.paperPadding}
                      style={{ marginTop: '18px' }}
                    >
                      {props.event.sponsors.map((s) => (
                        <Grid item>
                          <img
                            src={`${publicRuntimeConfig.REACT_APP_API_URL}/files/sponsors/${s}`}
                            style={{
                              width: '228px',
                              height: 'auto',
                              borderRadius: '9px',
                              border: '1px solid #D9D9D9',
                            }}
                            alt={s}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <div style={{ marginTop: '18px' }} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}
