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

import PurchasingsComponent from '../purchasing/purchasings';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('./chart'), {
  ssr: false,
});
const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.typography.container,
  },
  paper: {
    boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.1)',
    background: '#FDFDFF',
    borderRadius: '15px',
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
  button: {
    ...theme.typography.button,
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
export default function index(props) {
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
  const [purchasings, setPurchasing] = useState(props.purchasings);
  const [searchEvent, setSearchEvent] = useState('');
  const [events, setEvents] = useState(props.events);
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
          className={classes.button}
        >
          <Typography variant="body2" style={{ color: '#fff' }}>
            {' '}
            {t('dashboard.deleteEventDialog.cancel')}
          </Typography>
        </Button>
        <Button
          variant="contained"
          disabled={loading.active && loading.action === 'deleteEvent'}
          onClick={() => deleteEvent(deleteEventDialog.event?._id)}
          className={classes.button}
        >
          <Typography variant="body2" style={{ fontWeight: 'bold', color: '#fff' }}>
            {loading.active && loading.action === 'deleteEvent' ? (
              <CircularProgress size="0.9rem" style={{ color: '#fff' }} />
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

      {/* chart and today sales */}
      <Grid item style={{ width: '100%', marginTop: '2em' }}>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Chart
              lastWeekSalesGraph={props.chartData.lastWeekSalesGraph}
              lastMonthSalesGraph={props.chartData.lastMonthSalesGraph.map((it) => {
                return {
                  ...it,
                  x: new Date(it.x),
                };
              })}
              lastYearSalesGraph={props.chartData.lastYearSalesGraph}
            />
          </Grid>
          <Grid item md={4} xs={12} style={{ display: 'flex' }}>
            <Grid
              container
              direction="column"
              component={Paper}
              elevation={0}
              className={classes.paper}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              {/* svg */}
              <Grid item className={classes.paperPadding} style={{ marginTop: '10px' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="183"
                  height="163"
                  fill="none"
                  viewBox="0 0 183 163"
                >
                  <g fill="#5D5D5D" clipPath="url(#clip0_119_3907)">
                    <path d="M90.6 1.996c-1.114.818-2.061 1.56-2.099 1.635-.018.075.186.595.465 1.152.464.91.52 1.189.52 2.954 0 1.728-.056 2.08-.502 3.01-2.08 4.44-7.855 5.517-11.384 2.117-.501-.464-.928-.854-.947-.854-.037 0-1.059.724-2.284 1.598l-2.248 1.597.446.873c1.133 2.23 1.059 4.72-.223 6.893-.817 1.393-1.764 2.21-3.324 2.86-2.786 1.171-5.683.614-7.781-1.467l-.817-.817-2.23 1.579c-1.225.873-2.228 1.635-2.228 1.69 0 .056.223.576.52 1.152.446.93.502 1.245.502 2.991 0 1.765-.056 2.063-.52 3.01a7.273 7.273 0 01-3.436 3.363c-1.133.538-1.411.594-3.008.594-1.542 0-1.913-.074-2.88-.52-.612-.279-1.522-.929-2.042-1.43l-.928-.892-2.043 1.467c-1.115.818-2.155 1.561-2.285 1.635-.185.112-.13.353.242 1.078.706 1.356.965 3.102.668 4.551-.315 1.505-.78 2.416-1.894 3.586l-.91.966 25.127 35.28c13.817 19.395 31.46 44.178 39.205 55.065a14291.543 14291.543 0 0014.522 20.38l.446.594 1.17-.538c2.043-.967 4.216-.929 6.277.111.947.464 2.489 1.914 2.675 2.489.074.205.204.372.297.372.111 0 1.225-.743 2.47-1.635l2.284-1.635-.353-.446c-2.823-3.492-1.56-8.88 2.544-10.868 1.003-.483 1.3-.538 2.972-.557 1.727 0 1.95.037 3.083.594 1.133.558 2.581 1.84 3.083 2.731.185.316.39.223 2.488-1.281a128.303 128.303 0 012.359-1.673c.018-.018-.242-.483-.613-1.003-2.192-3.269-1.282-7.765 1.968-9.865 1.43-.91 2.415-1.17 4.29-1.096 1.3.056 1.746.167 2.768.669 1.114.557 2.21 1.505 2.952 2.601.279.39.298.39 2.545-1.208 1.244-.891 2.265-1.709 2.284-1.82 0-.112-.13-.316-.297-.465-.149-.13-.483-.631-.724-1.096-2.173-4.273.39-9.382 5.125-10.236 2.656-.465 5.553.724 6.983 2.879l.539.799 2.321-1.672 2.34-1.653-.613-.911c-.947-1.411-1.244-2.545-1.151-4.421.093-1.951.668-3.27 1.913-4.496.464-.446.835-.873.835-.966 0-.074-4.42-6.335-9.805-13.933a558123.303 558123.303 0 00-54.247-76.226l-15.08-21.179-1.133.557c-1.059.52-1.319.576-3.028.576-1.615 0-1.987-.055-2.878-.483-.557-.26-1.449-.873-1.969-1.337-.538-.483-1.04-.873-1.114-.855-.093 0-1.077.687-2.21 1.486z"></path>
                    <path d="M35.462 11.731c-.52.966-2.025 2.285-3.232 2.843-1.318.594-3.566.761-4.903.353l-.854-.279-1.021 2.36c-.576 1.281-1.06 2.433-1.096 2.563-.037.112.408.539.965.929 2.935 2.062 3.938 5.703 2.433 8.88-1.337 2.88-4.568 4.59-7.558 3.995a18.345 18.345 0 00-1.43-.26c-.26-.02-.576.557-1.43 2.47-.613 1.375-1.096 2.508-1.059 2.527.019 0 .502.316 1.059.687 4.606 3.103 3.993 10.107-1.077 12.355-1.375.613-3.455.761-4.773.353-.502-.149-.929-.26-.966-.223-.037.018-.557 1.17-1.151 2.545-.966 2.174-1.078 2.508-.818 2.675 1.895 1.208 3.065 2.62 3.622 4.44 1.523 4.942-2.786 9.865-7.874 8.992a30.617 30.617 0 00-1.505-.223c-.278-.018-.594.52-1.448 2.49-.613 1.374-1.022 2.526-.929 2.563.52.167 1.95 1.282 2.433 1.895 1.356 1.728 1.969 4.236 1.486 6.131a21.97 21.97 0 00-.242 1.078c-.018.167 13.483 6.149 40.078 17.779 22.062 9.623 40.15 17.482 40.17 17.444.037-.018-11.385-16.125-25.37-35.762L33.53 47.605l1.653-1.189c1.374-.984 1.727-1.337 2.136-2.192.427-.873.482-1.17.39-2.08-.093-.892-.279-1.301-1.245-2.694-.631-.91-1.114-1.728-1.077-1.803.037-.092 2.192-1.69 4.792-3.53l4.717-3.38.39.445c.204.26.761 1.004 1.225 1.672 1.133 1.598 2.08 2.081 3.79 1.97 1.466-.093 2.543-.762 3.212-2.007.371-.706.427-1.04.371-2.08-.055-1.17-.13-1.338-1.17-2.88-.612-.892-1.114-1.69-1.114-1.746 0-.075 1.541-1.227 3.436-2.564 1.894-1.356 3.454-2.508 3.473-2.582.037-.075-2.136-1.078-4.829-2.248-2.674-1.17-7.707-3.363-11.161-4.886-3.473-1.505-6.407-2.75-6.519-2.75-.111 0-.353.297-.538.65zM148.691 60.814c.353.502 3.585 5.035 7.169 10.088 6.129 8.602 7.224 9.977 7.633 9.53.186-.167 2.228-4.83 2.228-5.034 0-.074-.445-.316-.984-.557-1.337-.576-2.656-1.895-3.361-3.382-.706-1.486-.892-3.66-.409-5.016.149-.445.26-.836.242-.854-.112-.093-12.945-5.648-13.038-5.648-.074 0 .168.39.52.873z"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_119_3907">
                      <path fill="#fff" d="M0 0H182V162H0z" transform="translate(.25 .306)"></path>
                    </clipPath>
                  </defs>
                </svg>
              </Grid>
              {/* totalSales */}
              <Grid item className={classes.paperPadding} style={{ marginTop: '18px' }}>
                <Typography
                  variant="h4"
                  align="center"
                  style={{ color: '#5E5E5E', fontSize: '32px' }}
                >
                  {props.todaySales}
                </Typography>
              </Grid>
              {/* text */}
              <Grid item className={classes.paperPadding} style={{ marginTop: '18px' }}>
                <Typography
                  variant="subtitle2"
                  align="center"
                  style={{ color: '#5E5E5E', fontWeight: 600 }}
                >
                  {t('dashboard.today', {
                    tickets: props.todaySales,
                  })}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
        {/* table */}
        <Grid container style={{ marginTop: '2em' }}>
          <PurchasingsComponent
            purchasings={purchasings.filter((x) =>
              `${x.customerData.firstName} ${
                x.customerData.lastName ? x.customerData.lastName : ''
              }`
                .toLowerCase()
                .includes(searchPurchasing.toLowerCase())
            )}
          />
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
        <Grid container style={{ marginTop: '2em' }}>
          {events.filter((x) => x.name.toLowerCase().includes(searchEvent.toLowerCase())).length ===
          0 ? (
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
                  {events
                    .filter((x) => x.name.toLowerCase().includes(searchEvent.toLowerCase()))
                    .map((ev, i) => (
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
                              {ev.location} ({moment(ev.startDate).format('DD MMM hh:mm a')} -{' '}
                              {moment(ev.endDate).format('DD MMM hh:mm a')}) {' UK Time'}
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
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                            <Link href={`/update-event/${ev._id}`}>
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
                          {((ev.totalTickets - ev.remainingTickets) / ev.totalTickets) * 100 >
                            50 && (
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

      <div style={{ marginTop: '2em' }} />
    </Grid>
  );
}
