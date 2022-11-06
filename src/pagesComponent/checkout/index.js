import React from 'react';

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
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Header from '../../reusable/header';

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
              <TableRow>
                <TableCell style={{ width: '40%' }}>{t('checkout.item')}</TableCell>
                <TableCell style={{ width: '30%' }}>{t('checkout.price')}</TableCell>
                <TableCell style={{ width: '15%' }}>{t('checkout.quantity')}</TableCell>
                <TableCell style={{ width: '15%' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
