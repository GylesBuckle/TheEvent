import React, { useState } from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import {
  Grid,
  useMediaQuery,
  Typography,
  Paper,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
  Radio,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useTranslation } from 'react-i18next';
import * as moment from 'moment';
import CheckoutForm from './checkoutForm';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const promise = loadStripe(publicRuntimeConfig.REACT_APP_STRIPE);

import Header from '../../reusable/header';
import testimonials from '../../data/testimonials.json';
const eventData = {
  tags: ['bonus'],
  locationCoordinates: [67.114544, 24.870862],
  sponsors: ['1667001427737-pexels-jd-danny-2385477.jpg', '1667001427739-Untitled-1 copy.png'],
  _id: '635c6c53933557eec0efb3e0',
  name: 'Bonus ',
  description: '<p><strong>Description</strong></p>',
  image: '1667001427732-pexels-julia-sakelli-1532244.jpg',
  startDate: '2022-10-29T07:00:00.000Z',
  endDate: '2022-10-29T07:00:00.000Z',
  totalTickets: 50,
  remainingTickets: 24,
  location: 'Karachi, Sindh, Pakistan',
  venue: 'Venue',
  price: 20,
  address: 'Plot 326 flat korangi crossing Karachi',
  phone: '03182263109',
  email: 'S.m.sami125@gmail.com',
  facebook: 'https://www.facebook.com/m.sami125/',
  twitter: 'https://twitter.com/home',
  insta: '',
  linkdin: '',
  snapchat: '',
  whatsApp: '',
  speakers: [
    {
      _id: '635c79188a7ac4ff6cc0b137',
      image: '1667001427741-template_0.jpg',
      name: 'Speaker K',
      description: 'Des',
      occupation: 'Occupation',
      facebook: 'fff',
      twitter: 'www',
      insta: 'wwww',
      linkdin: 'wwww',
      snapchat: 'wwww',
      whatsApp: 'wwww',
    },
    {
      _id: '635c79188a7ac4ff6cc0b138',
      image: '1667001427743-download.jpg',
      name: 'Ali',
      description: 'Speaker',
      occupation: 'Killer',
      facebook: 'facebook',
      twitter: 'twitter',
      insta: 'insta',
      linkdin: 'lindkin',
      snapchat: 'snapchat',
      whatsApp: 'whsp',
    },
  ],
  schedule: [
    {
      _id: '635c79188a7ac4ff6cc0b139',
      startDate: '2022-10-29T06:00:00.000Z',
      topic: 'topic',
      topicDetails: 'Details',
      speaker: 'Speaker',
    },
    {
      _id: '635c79188a7ac4ff6cc0b13a',
      startDate: '2022-10-29T07:00:00.000Z',
      topic: 'topic',
      topicDetails: 'Details',
      speaker: 'Speaker',
    },
  ],
  __v: 0,
};

const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.typography.container,
  },
  paper: {
    background: '#fff',
    boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
  },
  paperPadding: {
    padding: '0px 16px',
  },
  extraSpace: {
    paddingLeft: '35px',
    paddingRight: '35px',
  },
  input: {
    ...theme.typography.input,
    //fontFamily: 'Poppins',
    fontSize: '16px',
    background: '#F1F1F1',
    color: '#5E5E5E',
    borderRadius: '5px',
    boxShadow: 'none',
    '& ::placeholder': {
      fontWeight: 400,
      color: '#5e5e5e',
      opacity: 1,
      //fontFamily: 'Poppins',
    },
    //marginTop: '5px',
  },
  inputOutline: {
    border: 'none',
  },
  flexContainer: {
    display: 'flex',
    gap: '20px',
  },
}));
export default function index(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [event, setEvent] = useState(props.event);
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    country: '',
    city: '',
    state: '',
    phone: '',
    paymentMethod: 'stripe',
  });
  return (
    <Grid
      container
      direction="column"
      className={classes.container}
      style={{ backgroundColor: '#FAFAFA' }}
    >
      {/* logo */}
      <Grid
        item
        style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      >
        <img
          src={`${publicRuntimeConfig.REACT_APP_ASSET_PREFIX}dev/logo.png`}
          style={{
            width: '270px',
            height: '96px',
          }}
          alt="logo"
        />
      </Grid>
      {/* heading */}
      <Grid
        item
        style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px' }}
      >
        <Typography variant="h5" style={{ lineHeight: '29px' }}>
          {t('checkout.heading')}
        </Typography>
      </Grid>
      {/* items */}
      <Grid item style={{ width: '100%', marginTop: '30px' }}>
        <TableContainer component={Paper} elevation={0} className={classes.paper}>
          <Table>
            <TableHead>
              <TableRow style={{ background: theme.palette.primary.main }}>
                <TableCell style={{ width: '40%' }}>
                  <Typography variant="subtitle2" style={{ color: '#fff', fontWeight: 600 }}>
                    {t('checkout.item')}
                  </Typography>
                </TableCell>
                <TableCell align="center" style={{ width: '30%', verticalAlign: 'top' }}>
                  <Typography variant="subtitle2" style={{ color: '#fff', fontWeight: 600 }}>
                    {t('checkout.price')}
                  </Typography>
                </TableCell>
                <TableCell align="center" style={{ width: '15%', verticalAlign: 'top' }}>
                  <Typography variant="subtitle2" style={{ color: '#fff', fontWeight: 600 }}>
                    {t('checkout.quantity')}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: '15%' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  style={{
                    width: '40%',

                    paddingTop: '25px',
                    paddingBottom: '35px',
                  }}
                  className={classes.extraSpace}
                >
                  <Typography
                    variant="h5"
                    style={{ color: '#000', fontWeight: 700, lineHeight: '31px' }}
                  >
                    {event.name}
                  </Typography>
                  <Typography variant="subtitle2" style={{ color: '#757575', fontWeight: 500 }}>
                    {moment(event.startDate).format('MMMM DD,yyyy')} {event.venue}
                  </Typography>
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    width: '30%',
                    verticalAlign: 'top',
                    paddingTop: '25px',
                    paddingBottom: '35px',
                  }}
                >
                  <Typography variant="h5" style={{ color: '#000', fontWeight: 600 }}>
                    £{event.price}
                  </Typography>
                </TableCell>

                <TableCell
                  align="center"
                  style={{
                    width: '15%',
                    verticalAlign: 'top',
                    paddingTop: '25px',
                    paddingBottom: '35px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '20px',
                    }}
                  >
                    <IconButton
                      style={{
                        padding: 0,
                        height: '100%',
                        filter: 'drop-shadow(0px 4px 44px rgba(0, 0, 0, 0.1))',
                        border: '1px solid #0D1358',
                        borderRadius: '4px',
                      }}
                      disabled={quantity === 1}
                      onClick={() => setQuantity((q) => q - 1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="h5" style={{ color: '#000', fontWeight: 600 }}>
                      {quantity}
                    </Typography>
                    <IconButton
                      style={{
                        padding: 0,
                        height: '100%',
                        filter: 'drop-shadow(0px 4px 44px rgba(0, 0, 0, 0.1))',
                        border: '1px solid #0D1358',
                        borderRadius: '4px',
                      }}
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    width: '15%',
                    verticalAlign: 'top',
                    paddingTop: '25px',
                    paddingBottom: '35px',
                  }}
                >
                  {/* <Typography variant="h5" style={{ color: '#FF0000', fontWeight: 600 }}>
                    {t('checkout.remove')}
                  </Typography> */}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* payment info and testnomail */}
      <Grid item style={{ width: '100%', marginTop: '30px' }}>
        <Grid
          container
          justifyContent="space-between"
          spacing={2}
          component={Paper}
          elevation={0}
          className={[classes.paper].join(' ')}
        >
          {/* payment info  */}
          <Grid item md={6} xs={12}>
            <Typography
              variant="h4"
              className={classes.extraSpace}
              style={{ lineHeight: '41px', marginTop: '25px' }}
            >
              {t('checkout.information')}
            </Typography>
            {/* firstName lastName */}
            <div
              className={[classes.extraSpace, classes.flexContainer].join(' ')}
              style={{ marginTop: '25px' }}
            >
              <TextField
                placeholder={t('checkout.firstName')}
                id="firstName"
                variant="outlined"
                fullWidth
                //size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                  endAdornment: (
                    <InputAdornment>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="none"
                        viewBox="0 0 25 25"
                      >
                        <path
                          stroke="#5D5D5D"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6.865 19.986c0-2.21 2.687-4 6-4 3.314 0 6 1.79 6 4M12.865 12.986a4 4 0 100-8 4 4 0 000 8z"
                        ></path>
                      </svg>
                    </InputAdornment>
                  ),
                }}
                required
                value={data.firstName}
                onChange={(e) => {
                  setData({
                    ...data,
                    firstName: e.target.value,
                  });
                }}
              />
              <TextField
                placeholder={t('checkout.lastName')}
                id="lastName"
                variant="outlined"
                fullWidth
                //size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                  endAdornment: (
                    <InputAdornment>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="none"
                        viewBox="0 0 25 25"
                      >
                        <path
                          stroke="#5D5D5D"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6.865 19.986c0-2.21 2.687-4 6-4 3.314 0 6 1.79 6 4M12.865 12.986a4 4 0 100-8 4 4 0 000 8z"
                        ></path>
                      </svg>
                    </InputAdornment>
                  ),
                }}
                required
                value={data.lastName}
                onChange={(e) => {
                  setData({
                    ...data,
                    lastName: e.target.value,
                  });
                }}
              />
            </div>
            {/* email */}
            <div className={[classes.extraSpace].join(' ')} style={{ marginTop: '25px' }}>
              <TextField
                placeholder={t('checkout.email')}
                id="email"
                variant="outlined"
                fullWidth
                //size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                  endAdornment: (
                    <InputAdornment>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="none"
                        viewBox="0 0 25 25"
                      >
                        <path
                          stroke="#5D5D5D"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20.865 5.802h-16a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1v-12a1 1 0 00-1-1z"
                        ></path>
                        <path
                          stroke="#5D5D5D"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3.865 6.802l9.257 7 8.743-7"
                        ></path>
                      </svg>
                    </InputAdornment>
                  ),
                }}
                required
                value={data.email}
                onChange={(e) => {
                  setData({
                    ...data,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            {/* address */}
            <div className={[classes.extraSpace].join(' ')} style={{ marginTop: '25px' }}>
              <TextField
                placeholder={t('checkout.address')}
                id="address"
                variant="outlined"
                fullWidth
                //size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                  endAdornment: (
                    <InputAdornment>
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.8633 11.6182C13.9679 11.6182 14.8633 10.7227 14.8633 9.61816C14.8633 8.51359 13.9679 7.61816 12.8633 7.61816C11.7587 7.61816 10.8633 8.51359 10.8633 9.61816C10.8633 10.7227 11.7587 11.6182 12.8633 11.6182Z"
                          stroke="#5D5D5D"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.8633 21.6182C12.8633 21.6182 19.8633 16.772 19.8633 10.5412C19.8633 8.70513 19.1258 6.94422 17.813 5.64589C16.5003 4.34756 14.7198 3.61816 12.8633 3.61816C11.0068 3.61816 9.22629 4.34756 7.91353 5.64589C6.60078 6.94422 5.86328 8.70513 5.86328 10.5412C5.86328 16.772 12.8633 21.6182 12.8633 21.6182Z"
                          stroke="#5D5D5D"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </InputAdornment>
                  ),
                }}
                required
                value={data.address}
                onChange={(e) => {
                  setData({
                    ...data,
                    address: e.target.value,
                  });
                }}
              />
            </div>
            {/* city state */}
            <div
              className={[classes.extraSpace, classes.flexContainer].join(' ')}
              style={{ marginTop: '25px' }}
            >
              <TextField
                placeholder={t('checkout.city')}
                id="city"
                variant="outlined"
                fullWidth
                //size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                  endAdornment: (
                    <InputAdornment>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="none"
                        viewBox="0 0 25 25"
                      >
                        <path
                          stroke="#5D5D5D"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.865 6.434l6-3v15l-6 3v-15zM9.865 18.434l6 3v-15l-6-3v15zM3.865 6.434l6-3v15l-6 3v-15z"
                        ></path>
                      </svg>
                    </InputAdornment>
                  ),
                }}
                required
                value={data.city}
                onChange={(e) => {
                  setData({
                    ...data,
                    city: e.target.value,
                  });
                }}
              />
              <TextField
                placeholder={t('checkout.state')}
                id="state"
                variant="outlined"
                fullWidth
                //size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                  endAdornment: (
                    <InputAdornment>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="none"
                        viewBox="0 0 25 25"
                      >
                        <path
                          stroke="#5D5D5D"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.865 6.434l6-3v15l-6 3v-15zM9.865 18.434l6 3v-15l-6-3v15zM3.865 6.434l6-3v15l-6 3v-15z"
                        ></path>
                      </svg>
                    </InputAdornment>
                  ),
                }}
                required
                value={data.state}
                onChange={(e) => {
                  setData({
                    ...data,
                    state: e.target.value,
                  });
                }}
              />
            </div>
            {/* country */}
            <div className={[classes.extraSpace].join(' ')} style={{ marginTop: '25px' }}>
              <TextField
                placeholder={t('checkout.country')}
                id="country"
                variant="outlined"
                fullWidth
                //size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                  endAdornment: (
                    <InputAdornment>
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.8633 21.2501C17.8338 21.2501 21.8633 17.2207 21.8633 12.2501C21.8633 7.27956 17.8338 3.25012 12.8633 3.25012C7.89272 3.25012 3.86328 7.27956 3.86328 12.2501C3.86328 17.2207 7.89272 21.2501 12.8633 21.2501Z"
                          stroke="#5D5D5D"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M3.86328 12.2501H21.8633"
                          stroke="#5D5D5D"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.8633 21.2501C14.5201 21.2501 15.8633 17.2207 15.8633 12.2501C15.8633 7.27956 14.5201 3.25012 12.8633 3.25012C11.2064 3.25012 9.86328 7.27956 9.86328 12.2501C9.86328 17.2207 11.2064 21.2501 12.8633 21.2501Z"
                          stroke="#5D5D5D"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </InputAdornment>
                  ),
                }}
                required
                value={data.country}
                onChange={(e) => {
                  setData({
                    ...data,
                    country: e.target.value,
                  });
                }}
              />
            </div>
            {/* phone */}
            <div className={[classes.extraSpace].join(' ')} style={{ marginTop: '25px' }}>
              <TextField
                placeholder={t('checkout.phone')}
                id="phone"
                variant="outlined"
                fullWidth
                //size="small"
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.inputOutline,
                  },
                  endAdornment: (
                    <InputAdornment>
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.3711 5.2433L9.44257 5.61469V5.61469L10.3711 5.2433ZM11.4253 7.87896L12.3538 7.50757V7.50757L11.4253 7.87896ZM11.1048 9.90211L11.873 10.5423V10.5423L11.1048 9.90211ZM10.5374 10.583L11.3056 11.2232L10.5374 10.583ZM10.6596 13.2776L9.95254 13.9847L10.6596 13.2776ZM12.5767 15.1946L13.2838 14.4875L12.5767 15.1946ZM15.2713 15.3168L14.6311 14.5486L15.2713 15.3168ZM15.9521 14.7494L16.5923 15.5177L16.5923 15.5177L15.9521 14.7494ZM17.9753 14.4289L17.6039 15.3574L17.9753 14.4289ZM20.6109 15.4832L20.9823 14.5547L20.6109 15.4832ZM5.7629 4.98608H8.5141V2.98608H5.7629V4.98608ZM9.44257 5.61469L10.4968 8.25035L12.3538 7.50757L11.2995 4.87191L9.44257 5.61469ZM10.3366 9.26193L9.76919 9.9428L11.3056 11.2232L11.873 10.5423L10.3366 9.26193ZM9.95254 13.9847L11.8696 15.9017L13.2838 14.4875L11.3668 12.5705L9.95254 13.9847ZM15.9115 16.0851L16.5923 15.5177L15.312 13.9812L14.6311 14.5486L15.9115 16.0851ZM17.6039 15.3574L20.2396 16.4117L20.9823 14.5547L18.3467 13.5005L17.6039 15.3574ZM20.8682 17.3401V20.0913H22.8682V17.3401H20.8682ZM19.9734 20.9861C11.631 20.9861 4.86816 14.2232 4.86816 5.88082H2.86816C2.86816 15.3278 10.5265 22.9861 19.9734 22.9861V20.9861ZM20.8682 20.0913C20.8682 20.5855 20.4676 20.9861 19.9734 20.9861V22.9861C21.5721 22.9861 22.8682 21.6901 22.8682 20.0913H20.8682ZM20.2396 16.4117C20.6192 16.5635 20.8682 16.9312 20.8682 17.3401H22.8682C22.8682 16.1134 22.1213 15.0103 20.9823 14.5547L20.2396 16.4117ZM16.5923 15.5177C16.8745 15.2825 17.2629 15.221 17.6039 15.3574L18.3467 13.5005C17.3236 13.0912 16.1585 13.2758 15.3119 13.9812L16.5923 15.5177ZM11.8696 15.9017C12.9667 16.9989 14.7195 17.0784 15.9115 16.0851L14.6311 14.5486C14.2338 14.8797 13.6495 14.8532 13.2838 14.4875L11.8696 15.9017ZM9.76919 9.9428C8.77588 11.1348 8.85538 12.8875 9.95254 13.9847L11.3668 12.5705C11.001 12.2047 10.9745 11.6205 11.3056 11.2232L9.76919 9.9428ZM10.4968 8.25035C10.6333 8.59139 10.5717 8.97976 10.3366 9.26193L11.873 10.5423C12.5785 9.69578 12.763 8.53067 12.3538 7.50757L10.4968 8.25035ZM8.5141 4.98608C8.923 4.98608 9.29071 5.23503 9.44257 5.61469L11.2995 4.87191C10.8439 3.73294 9.74081 2.98608 8.5141 2.98608V4.98608ZM5.7629 2.98608C4.16418 2.98608 2.86816 4.2821 2.86816 5.88082H4.86816C4.86816 5.38667 5.26875 4.98608 5.7629 4.98608V2.98608Z"
                          fill="#5D5D5D"
                        />
                      </svg>
                    </InputAdornment>
                  ),
                }}
                required
                value={data.phone}
                onChange={(e) => {
                  setData({
                    ...data,
                    phone: e.target.value,
                  });
                }}
              />
            </div>
            <div className={[classes.extraSpace].join(' ')} style={{ marginTop: '25px' }}>
              <Typography variant="h5" style={{ color: '#5E5E5E' }}>
                {t('checkout.paymentMethod')}
              </Typography>
              <Paper
                elevation={0}
                className={classes.paperPadding}
                style={{
                  marginTop: '13px',
                  backgroundColor: '#F1F1F1',
                  borderRadius: '12px',
                  paddingTop: '13px',
                  paddingBottom: '13px',
                }}
              >
                <Grid container alignItems="center" style={{ marginTop: '0.5em' }}>
                  <Radio checked={true} color="primary" />{' '}
                  <img
                    src={`${publicRuntimeConfig.REACT_APP_ASSET_PREFIX}dev/Stripe.png`}
                    style={{ width: '8em', height: '3.5em' }}
                  />
                </Grid>
              </Paper>

              <div style={{ marginTop: '25px' }}>
                <Elements stripe={promise}>
                  <ElementsConsumer>
                    {({ elements, stripe }) => (
                      <CheckoutForm
                        //checkoutHandler={props.checkoutHandler}
                        quantity={quantity}
                        data={data}
                        event={event}
                        elements={elements}
                        stripe={stripe}
                      />
                    )}
                  </ElementsConsumer>
                </Elements>
              </div>
            </div>

            {/* place your order */}
            {/* <div className={[classes.extraSpace].join(' ')} style={{ marginTop: '25px' }}>
              <Button fullWidth variant="contained" className={classes.button}>
                {t('checkout.place')}
              </Button>
            </div> */}
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography
              variant="h4"
              className={classes.extraSpace}
              style={{ lineHeight: '41px', marginTop: '25px' }}
            >
              {t('checkout.testimonials')}
            </Typography>
            {testimonials.map((item, i) => (
              <div
                key={i}
                className={classes.extraSpace}
                style={{ marginTop: i === 0 ? '25px' : '25px' }}
              >
                <Paper
                  elevation={0}
                  className={classes.paperPadding}
                  style={{
                    backgroundColor: '#F1F1F1',
                    borderRadius: '12px',
                    paddingTop: '13px',
                    paddingBottom: '13px',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    style={{ lineHeight: '20px', textAlign: 'justify' }}
                  >
                    {item.description}
                  </Typography>
                  <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                    <img
                      src={publicRuntimeConfig.REACT_APP_ASSET_PREFIX + item.profile}
                      style={{ width: '33px', height: '33px', borderRadius: '50%' }}
                    />
                    <div>
                      <Typography
                        variant="subtitle2"
                        style={{ lineHeight: '18px', fontWeight: 700 }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        style={{ fontSize: '10px', fontWeight: 400, color: '#9E9E9E' }}
                      >
                        {item.occupation}
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
