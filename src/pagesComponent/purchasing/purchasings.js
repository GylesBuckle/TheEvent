import React, { useState } from 'react';
import Link from 'next/link';
import {
  Grid,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  Avatar,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';

import * as moment from 'moment';

const useStyles = makeStyles((theme) => ({
  tableCell: {
    borderBottom: '0.5px solid rgba(13, 19, 88, 0.8)',
    cursor: 'pointer',
  },
}));
export default function purchasings(props) {
  const { t } = useTranslation();

  const classes = useStyles();
  const theme = useTheme();
  const [bookingDialog, setBookingDialog] = useState({
    active: null,
    data: null,
  });

  const renderBookingDialog = (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={bookingDialog.active}
      onClose={() => {
        setBookingDialog({
          active: false,
          data: null,
        });
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div
        onClick={() =>
          setBookingDialog({
            active: false,
            data: null,
          })
        }
        style={{ position: 'absolute', right: 10, top: 10, cursor: 'pointer' }}
      >
        <CloseIcon />
      </div>
      <DialogContent>
        <Grid container direction="column">
          {/* Video Conference */}
          <Grid item style={{ width: '100%', marginTop: '15px' }}>
            <Grid container spacing={2}>
              <Grid item>
                {bookingDialog.data && (
                  <Avatar>{bookingDialog.data?.customerData?.firstName[0]}</Avatar>
                )}
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" style={{ fontWeight: '700', lineHeight: '16px' }}>
                  {bookingDialog.data?.customerData?.firstName}{' '}
                  {bookingDialog.data?.customerData?.lastName
                    ? bookingDialog.data?.customerData?.lastName
                    : ''}
                </Typography>
                <Typography
                  variant="caption"
                  style={{ fontSize: '12px', color: '#9E9E9E', lineHeight: '19px' }}
                >
                  {bookingDialog.data && moment(bookingDialog.data.date).format('MMMM DD,YYYY')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%', marginTop: '17px' }}>
            <Divider />
          </Grid>
          {/* adress and email phone */}
          <Grid item style={{ width: '100%', marginTop: '23px' }}>
            <Grid container direction="column">
              {/* adress */}
              <Grid item>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.2956 11C13.3889 11 14.2752 10.1046 14.2752 9C14.2752 7.89543 13.3889 7 12.2956 7C11.2024 7 10.3161 7.89543 10.3161 9C10.3161 10.1046 11.2024 11 12.2956 11Z"
                        stroke="#939393"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.2956 21C12.2956 21 19.2239 16.1538 19.2239 9.92308C19.2239 8.08696 18.494 6.32605 17.1947 5.02772C15.8953 3.72939 14.1331 3 12.2956 3C10.4581 3 8.69583 3.72939 7.39651 5.02772C6.0972 6.32605 5.36725 8.08696 5.36725 9.92308C5.36725 16.1538 12.2956 21 12.2956 21Z"
                        stroke="#939393"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <Typography variant="body2" style={{ color: '#747474' }}>
                      {bookingDialog.data?.customerData?.address
                        ? bookingDialog.data?.customerData?.address + ' '
                        : ''}
                      {bookingDialog.data?.customerData?.city
                        ? bookingDialog.data?.customerData?.city + ' '
                        : ''}
                      {bookingDialog.data?.customerData?.state
                        ? bookingDialog.data?.customerData?.state + ' '
                        : ''}
                      {bookingDialog.data?.customerData?.country
                        ? bookingDialog.data?.customerData?.country + ' '
                        : ''}
                    </Typography>
                  </div>
                </div>
              </Grid>
              {/* email */}
              <Grid item style={{ marginTop: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="none"
                      viewBox="0 0 25 25"
                    >
                      <path
                        stroke="#939393"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M20.419 5.885h-16a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1v-12a1 1 0 00-1-1z"
                      ></path>
                      <path
                        stroke="#939393"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3.418 6.885l9.258 7 8.743-7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <a
                      href={`mailto:${bookingDialog.data?.email}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Typography variant="body2" style={{ color: '#747474' }}>
                        {bookingDialog.data?.customerData?.email}
                      </Typography>
                    </a>
                  </div>
                </div>
              </Grid>
              {/* phone */}
              <Grid item style={{ marginTop: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      fill="none"
                      viewBox="0 0 25 24"
                    >
                      <path
                        fill="#939393"
                        d="M9.921 4.257l-.696.279.696-.279zm1.055 2.636l.696-.279-.696.279zm-.32 2.023l.575.48-.576-.48zm-.568.68l.576.481-.576-.48zm.122 2.695l-.53.53.53-.53zm1.917 1.918l.53-.53-.53.53zm2.695.122l-.48-.576.48.576zm.68-.568l.48.576-.48-.576zm2.024-.32l-.279.696.279-.696zm2.635 1.054l.279-.696-.279.696zM5.313 3.75h2.751v-1.5h-2.75v1.5zm3.912.786l1.054 2.635 1.393-.557-1.054-2.635-1.393.557zm.854 3.9l-.567.68 1.152.961.567-.68-1.152-.961zm-.4 4.386l1.918 1.917 1.06-1.06-1.917-1.918-1.06 1.06zm5.623 2.085l.68-.568-.96-1.152-.68.568.96 1.152zm1.945-.768l2.636 1.055.557-1.393-2.636-1.055-.557 1.393zm3.422 2.215v2.751h1.5v-2.75h-1.5zm-1.145 3.896c-8.48 0-15.356-6.875-15.356-15.355h-1.5c0 9.309 7.547 16.855 16.856 16.855v-1.5zm1.145-1.145c0 .633-.513 1.145-1.145 1.145v1.5a2.645 2.645 0 002.645-2.645h-1.5zm-.786-3.912c.474.19.786.65.786 1.161h1.5a2.75 2.75 0 00-1.73-2.553l-.556 1.393zm-3.9-.854a1.25 1.25 0 011.264-.2l.557-1.393a2.75 2.75 0 00-2.782.441l.96 1.152zm-4.386.4a2.75 2.75 0 003.705.168l-.96-1.152a1.25 1.25 0 01-1.685-.077l-1.06 1.06zM9.512 9.117a2.75 2.75 0 00.168 3.705l1.06-1.06a1.25 1.25 0 01-.076-1.685l-1.152-.96zm.767-1.946c.17.427.094.912-.2 1.265l1.152.96a2.75 2.75 0 00.441-2.782l-1.393.557zM8.064 3.75c.512 0 .971.311 1.161.786l1.393-.557A2.75 2.75 0 008.064 2.25v1.5zm-2.75-1.5a2.645 2.645 0 00-2.646 2.645h1.5c0-.632.513-1.145 1.145-1.145v-1.5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <a href={`tel:${bookingDialog.data?.phone}`} style={{ textDecoration: 'none' }}>
                      <Typography variant="body2" style={{ color: '#747474' }}>
                        {bookingDialog.data?.customerData?.phone}
                      </Typography>
                    </a>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%', marginTop: '17px' }}>
            <Divider />
          </Grid>

          <Grid item style={{ width: '100%', marginTop: '17px' }}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item>
                <Typography variant="h5" style={{ fontWeight: 700, color: '#767676' }}>
                  {t('dashboard.paid')}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5" style={{ fontWeight: 700, color: '#0D1358' }}>
                  ${bookingDialog.data?.totalAmount}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ width: '100%', marginTop: '17px' }}>
            <Divider />
          </Grid>
          <Grid item style={{ width: '100%', marginTop: '17px' }}></Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
  return (
    <TableContainer>
      {renderBookingDialog}
      <Table>
        <TableHead>
          <TableRow style={{ background: theme.palette.primary.main }}>
            <TableCell style={{ width: '30%' }}>
              <Typography variant="subtitle2" style={{ color: '#fff', fontWeight: 600 }}>
                {t('purchasing.date')}
              </Typography>
            </TableCell>
            <TableCell align="center" style={{ width: '20%', verticalAlign: 'top' }}>
              <Typography variant="subtitle2" style={{ color: '#fff', fontWeight: 600 }}>
                {t('purchasing.payment')}
              </Typography>
            </TableCell>
            <TableCell align="center" style={{ width: '20%', verticalAlign: 'top' }}>
              <Typography variant="subtitle2" style={{ color: '#fff', fontWeight: 600 }}>
                {t('purchasing.quantity')}
              </Typography>
            </TableCell>
            <TableCell align="center" style={{ width: '20%', verticalAlign: 'top' }}>
              <Typography variant="subtitle2" style={{ color: '#fff', fontWeight: 600 }}>
                {t('purchasing.price')}
              </Typography>
            </TableCell>
            <TableCell style={{ width: '10%' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.purchasings.map((p, i) => (
            <TableRow
              key={i}
              style={{ background: i % 2 === 0 ? 'rgba(13, 19, 88, 0.2)' : '#F8F6FF' }}
            >
              <TableCell style={{ width: '30%' }} className={classes.tableCell}>
                <Typography variant="subtitle1" style={{ fontWeight: 800, lineHeight: '25px' }}>
                  {moment(p.date).format('MMMM DD,YYYY')}

                  {p.event?._id && (
                    <Link href={`/event/${p.event._id}`}>
                      <span style={{ fontWeight: 400 }}>
                        <br /> ({p.event.name})
                      </span>
                    </Link>
                  )}
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                style={{ width: '20%', verticalAlign: 'top' }}
                className={classes.tableCell}
              >
                <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                  {p.paymentMethod.charAt(0).toUpperCase() + p.paymentMethod.slice(1)}
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                style={{ width: '20%', verticalAlign: 'top' }}
                className={classes.tableCell}
              >
                <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                  {p.quantity}
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                style={{ width: '20%', verticalAlign: 'top' }}
                className={classes.tableCell}
              >
                <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                  £{p.totalAmount}
                </Typography>
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ width: '10%', verticalAlign: 'top' }}
              >
                <IconButton
                  style={{ padding: 0, paddingTop: '6px' }}
                  onClick={() =>
                    setBookingDialog({
                      active: true,
                      data: p,
                    })
                  }
                >
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
