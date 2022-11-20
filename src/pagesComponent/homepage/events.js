import React, { useContext } from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import Link from 'next/link';
import {
  Typography,
  Grid,
  useMediaQuery,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import * as moment from 'moment';
import { GlobalContext } from '../../context/GlobalContext';

const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.typography.container,
    paddingTop: '90px',
    paddingBottom: '90px',
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
    borderRadius: 0,
    [theme.breakpoints.down('md')]: {
      padding: '11px 20px',
    },
  },
  tableCell: {
    borderBottom: '0.5px solid rgba(13, 19, 88, 0.8)',
    cursor: 'pointer',
  },
}));

export default function Events(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const { user: globaluser } = useContext(GlobalContext);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-end"
      className={classes.container}
      id="events"
    >
      <Grid item style={{ width: '100%' }} className={classes.card}>
        {/* photo */}
        <Grid container alignItems="center" justifyContent={matchesSM ? 'center' : 'space-between'}>
          {/* heading */}
          <Grid item>
            <Typography
              variant="h2"
              style={{
                fontWeight: '600',
                color: '#FF5B21',
                fontSize: matchesSM ? '32px' : '42px',
                lineHeight: '41px',
                letterSpacing: '-2%',
              }}
            >
              {t('homepage.events.heading')}
            </Typography>
          </Grid>
          {/* images */}
          <Grid item>
            <Grid container spacing={2} wrap="nowrap">
              <Grid item>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 4,
                      width: '90px',
                      height: '90px',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '50%',
                      zIndex: '-1',
                    }}
                  />
                  <img
                    src={`${publicRuntimeConfig.REACT_APP_ASSET_PREFIX}dev/event1.png`}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </Grid>
              {/* <Grid item>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '5px',
                      left: '3px',
                      width: '90px',
                      height: '90px',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '50%',
                      zIndex: '-1',
                    }}
                  />
                  <img
                    src={`${publicRuntimeConfig.REACT_APP_ASSET_PREFIX}dev/event2.png`}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </Grid> */}
              <Grid item>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 4,
                      width: '90px',
                      height: '90px',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '50%',
                      zIndex: '-1',
                    }}
                  />
                  <img
                    src={`${publicRuntimeConfig.REACT_APP_ASSET_PREFIX}dev/event3.png`}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* for events */}
        <Grid container direction="column" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Grid item style={{ width: '100%' }}>
            {props.events.length === 0 ? (
              <Grid
                container
                direction="column"
                style={{ minHeight: '300px' }}
                justifyContent="center"
                alignItems="center"
              >
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
                  <path
                    fill="#9A9A9A"
                    d="M45.995 97.728h19.171l2.26-17.386h-19.17l-2.26 17.386z"
                  ></path>
                  <path
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.734"
                    d="M61.956 73.765c9.528 4.865 14.12 25.158-2.043 26.511-23.82 1.986-24.957-27.346-4.088-24.597"
                  ></path>
                </svg>
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
                    {props.events.map((ev, i) => (
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
                          <Link href={`/checkout/${ev._id}`}>
                            <Button style={{ wrap: false }} className={classes.button}>
                              {t('homepage.events.book')}
                            </Button>
                          </Link>
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
      </Grid>
    </Grid>
  );
}
