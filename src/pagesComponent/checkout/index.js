import React, { useState } from 'react';

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
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useTranslation } from 'react-i18next';
import * as moment from 'moment';
import Header from '../../reusable/header';

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
}));
export default function index() {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [event, setEvent] = useState(eventData);
  const [quantity, setQuantity] = useState(1);

  return (
    <Grid
      container
      direction="column"
      className={classes.container}
      style={{ backgroundColor: '#FAFAFA' }}
    >
      {/* logo */}
      <Grid item style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img
          src="/dev/logo.png"
          style={{
            width: '330px',
            height: '136px',
          }}
          alt="logo"
        />
      </Grid>
      {/* heading */}
      <Grid
        item
        style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}
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
                    paddingLeft: '35px',
                    paddingTop: '25px',
                    paddingBottom: '35px',
                  }}
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
                    ${event.price}
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
                  <Typography variant="h5" style={{ color: '#FF0000', fontWeight: 600 }}>
                    {t('checkout.remove')}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
