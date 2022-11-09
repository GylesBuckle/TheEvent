import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
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
  Dialog,
  DialogTitle,
  DialogActions,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';

import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../context/GlobalContext';
import * as moment from 'moment';
import axios from '../../utils/axios';

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

const emptySvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="162"
    height="143"
    fill="none"
    viewBox="0 0 162 143"
  >
    <circle cx="89.924" cy="71.5" r="71.5" fill="#F5F5F5"></circle>
    <rect
      width="3"
      height="10"
      x="112.82"
      y="41.829"
      fill="#999"
      rx="1.5"
      transform="rotate(82.5 112.82 41.83)"
    ></rect>
    <rect
      width="3"
      height="10"
      x="85.424"
      y="25.263"
      fill="#999"
      rx="1.5"
      transform="rotate(-7.5 85.424 25.263)"
    ></rect>
    <rect
      width="3"
      height="10"
      x="103.002"
      y="27.992"
      fill="#999"
      rx="1.5"
      transform="rotate(37.5 103.002 27.992)"
    ></rect>
    <path
      fill="#DDD"
      stroke="#DDD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.367"
      d="M108.199 115.546c-4.922-5.224-13.14-5.872-13.14-5.872l-9.499 9.845s-2.72-29.03 9.499-68.868c2.332 19.444 9.47 50.748 13.14 64.895z"
    ></path>
    <path
      fill="#F9F9F9"
      stroke="#DDD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.367"
      d="M14.331 44.75C.586 88.359 1.248 119.59 1.248 119.59H85.56s11.341-43.278 9.5-68.868c0 0 1.597-6.03-3.685-6.548-5.282-.518-77.043.576-77.043.576z"
    ></path>
    <path
      stroke="#DDD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.367"
      d="M81.876 44.333c.007-.125.007-.25 0-.374a6.046 6.046 0 10-6.031 6.692M39.059 44.333a6.06 6.06 0 10-6.03 6.85 5.757 5.757 0 002.878-.763M64.676 44.074A6.318 6.318 0 0058.674 38a6.765 6.765 0 000 13.443 5.599 5.599 0 003.67-1.44M51.84 44.217a6.045 6.045 0 10-6.002 6.822M18.852 58.783h59.066v6.75H18.851v-6.75zM63.282 112.164l.748-5.685 3.814-29.274.619-4.807M44.11 112.164l.806-6.102 3.699-28.468.676-5.196M30.121 72.398l-5.181 39.766M18.218 80.342h57.628M15.297 97.728h57.627"
    ></path>
    <path
      fill="#F9F9F9"
      d="M61.956 73.765c9.528 4.865 14.12 25.158-2.043 26.511-23.82 1.986-24.957-27.346-4.088-24.597"
    ></path>
    <path
      stroke="#DDD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.734"
      d="M61.956 73.765c9.528 4.865 14.12 25.158-2.043 26.511-23.82 1.986-24.957-27.346-4.088-24.597"
    ></path>
    <path fill="#9A9A9A" d="M45.995 97.728h19.171l2.26-17.386h-19.17l-2.26 17.386z"></path>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.734"
      d="M61.956 73.765c9.528 4.865 14.12 25.158-2.043 26.511-23.82 1.986-24.957-27.346-4.088-24.597"
    ></path>
  </svg>
);
export default function index() {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const { user: globaluser } = useContext(GlobalContext);

  const [loading, setLoading] = useState({
    active: false,
    action: '',
  });
  const [showToast, setShowToast] = useState({
    active: false,
    message: '',
  });

  const [searchPurchasing, setSearchPurchasing] = useState('');
  const [purchasings, setPurchasing] = useState('');
  const [searchEvent, setSearchEvent] = useState('');
  const [events, setEvents] = useState('');
  const [deleteEventDialog, setDeleteEventDialog] = useState({
    active: false,
    event: null,
  });

  const deleteEvent = async (id) => {
    try {
      setLoading({
        active: true,
        action: 'deleteEvent',
      });
      const response = await axios.delete(`/events/${id}`, {
        headers: {
          authorization: 'Bearer ' + globaluser?.token,
        },
      });
      if (response.data.success === true) {
        setEvents((ev) => ev.filter((x) => x._id !== id));
        setDeleteEventDialog({
          active: false,
          event: null,
        });
      } else {
        console.log(response.data.message, 'error');
        setShowToast({
          active: true,
          message: response.data.message,
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
        message: err.response?.data?.message || 'Something went wrong',
      });
    }
  };

  const renderDeleteEventDialog = (
    <Dialog
      open={deleteEventDialog.active}
      onClose={() => {
        setDeleteEventDialog({
          active: false,
          event: null,
        });
      }}
    >
      <DialogTitle>
        <Typography variant="caption"> {t('dashboard.deleteEventDialog.title')} </Typography>
      </DialogTitle>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() =>
            setDeleteEventDialog({
              active: false,
              event: null,
            })
          }
          style={{ textTransform: 'none' }}
        >
          <Typography variant="body2"> {t('dashboard.deleteEventDialog.cancel')}</Typography>
        </Button>
        <Button
          variant="contained"
          disabled={loading.active && loading.action === 'deleteEvent'}
          onClick={() => deleteEvent(deleteEventDialog.event?._id)}
          className={classes.button}
        >
          <Typography
            variant="body2"
            style={{ fontWeight: 'bold', color: theme.palette.common.mainFront }}
          >
            {loading.active && loading.action === 'deleteEvent' ? (
              <CircularProgress size="0.9rem" style={{ color: theme.palette.common.mainFront }} />
            ) : (
              t('dashboard.deleteEventDialog.yes')
            )}
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <Grid container direction="column" className={classes.container}>
      {renderDeleteEventDialog}
      {/* heading */}
      <Grid item style={{ marginTop: '1em' }}>
        <Typography variant="h2" style={{ color: '#9A9A9A' }}>
          {t('dashboard.heading')}
        </Typography>
      </Grid>
      {/* create event */}
      <Grid item style={{ width: '100%', marginTop: '2em' }}>
        <Link href="/create-event">
          <Paper
            elevation={0}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '12px',
              backgroundColor: '#F1F1F1',
              minHeight: matchesSM ? '100px' : '140px',
              cursor: 'pointer',
            }}
          >
            <Typography variant="h5" style={{ color: '#5E5E5E' }}>
              {t('dashboard.newEvent')}
            </Typography>
          </Paper>
        </Link>
      </Grid>
      {/* buyers */}
      <Grid item style={{ width: '100%', marginTop: '2em' }}>
        {/* search */}
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h5">{t('dashboard.buyer')}</Typography>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              placeholder="Search"
              InputProps={{
                classes: {
                  root: classes.input,
                  notchedOutline: classes.inputOutline,
                },
                startAdornment: (
                  <InputAdornment>
                    <Search style={{ fill: 'gray', fontSize: '1.1rem' }} />
                  </InputAdornment>
                ),
              }}
              value={searchPurchasing}
              onChange={(e) => setSearchPurchasing(e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* events */}
      <Grid item style={{ width: '100%', marginTop: '2em' }}>
        {/* search */}
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h5">{t('dashboard.events')}</Typography>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              placeholder="Search"
              InputProps={{
                classes: {
                  root: classes.input,
                  notchedOutline: classes.inputOutline,
                },
                startAdornment: (
                  <InputAdornment>
                    <Search style={{ fill: 'gray', fontSize: '1.1rem' }} />
                  </InputAdornment>
                ),
              }}
              value={searchEvent}
              onChange={(e) => setSearchEvent(e.target.value)}
            />
          </Grid>
        </Grid>
        {/* table */}
        <Grid container>
          {events.length === 0 ? (
            <Grid
              container
              direction="column"
              style={{ minHeight: '300px' }}
              justifyContent="center"
              alignItems="center"
            >
              {emptySvg}
              <Typography
                variant="h2"
                align="center"
                style={{ fontSize: '18px', marginTop: '20px', width: '60%' }}
              >
                {t('homepage.events.noEvent')}
              </Typography>
            </Grid>
          ) : (
            <TableContainer>
              <Table>
                <TableBody>
                  {events.map((ev, i) => (
                    <TableRow
                      key={i}
                      style={{ background: i % 2 === 0 ? 'rgba(13, 19, 88, 0.2)' : '#F8F6FF' }}
                    >
                      <Link href={`/event/${ev._id}`}>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                            {moment(ev.startDate).format('MMMM DD,YYYY')}
                          </Typography>
                        </TableCell>
                      </Link>
                      <Link href={`/event/${ev._id}`}>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: 400 }}>
                            {ev.location} ({moment(ev.startDate, ['HH mm']).format('hh:mm a')} -{' '}
                            {moment(ev.endDate, ['HH mm']).format('hh:mm a')})
                          </Typography>
                        </TableCell>
                      </Link>
                      <Link href={`/event/${ev._id}`}>
                        <TableCell className={classes.tableCell}>
                          <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                            {ev.speakers.map((x) => x.name).join(', ')}
                          </Typography>
                        </TableCell>
                      </Link>
                      <TableCell
                        className={classes.tableCell}
                        width={matchesSM ? undefined : '16%'}
                        align="right"
                      >
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <Link href={`/update/${ev._id}`}>
                            <Button style={{ wrap: false }} className={classes.button}>
                              {t('dashboard.update')}
                            </Button>
                          </Link>
                          <Button
                            style={{ wrap: false, backgroundColor: 'red' }}
                            className={classes.button}
                            onClick={() => {
                              setDeleteEventDialog({
                                active: true,
                                event: ev,
                              });
                            }}
                          >
                            {t('dashboard.delete')}
                          </Button>
                        </div>
                        {((ev.totalTickets - ev.remainingTickets) / ev.totalTickets) * 100 > 50 && (
                          <Typography
                            variant="body2"
                            align="center"
                            style={{
                              alignSelf: 'center',
                              marginTop: '4px',
                              fontWeight: '800',
                              color: '#FF5B21',
                              fontFamily: 'Manrope',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {((ev.totalTickets - ev.remainingTickets) / ev.totalTickets) * 100}%
                            Sold Out
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
