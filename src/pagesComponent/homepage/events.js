import React, { useContext } from 'react';
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
                  <img src="/dev/event1.png" style={{ width: '100%', height: '100%' }} />
                </div>
              </Grid>
              <Grid item>
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
                  <img src="/dev/event2.png" style={{ width: '100%', height: '100%' }} />
                </div>
              </Grid>
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
                  <img src="/dev/event3.png" style={{ width: '100%', height: '100%' }} />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* for events */}
        <Grid container direction="column" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Grid item style={{ width: '100%' }}>
            <TableContainer>
              <Table>
                <TableBody>
                  {props.events.map((ev, i) => (
                    <TableRow
                      key={i}
                      style={{ background: i % 2 === 0 ? 'rgba(13, 19, 88, 0.2)' : '#F8F6FF' }}
                    >
                      <TableCell className={classes.tableCell}>
                        <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                          {moment(ev.startDate).format('MMMM DD,YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Typography variant="subtitle1" style={{ fontWeight: 400 }}>
                          {ev.location} ({moment(ev.startDate, ['HH mm']).format('hh:mm a')} -{' '}
                          {moment(ev.endDate, ['HH mm']).format('hh:mm a')})
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                          {ev.speakers.map((x) => x.name).join(', ')}
                        </Typography>
                      </TableCell>
                      <TableCell
                        className={classes.tableCell}
                        width={matchesSM ? undefined : '16%'}
                        align="right"
                      >
                        <Button style={{ wrap: false }} className={classes.button}>
                          {globaluser?.token
                            ? t('homepage.events.book')
                            : t('homepage.events.signup')}
                        </Button>
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
