import React from 'react';
import Link from 'next/link';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

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
  return (
    <TableContainer>
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
                  ${p.totalAmount}
                </Typography>
              </TableCell>
              <TableCell className={classes.tableCell} style={{ width: '10%' }}></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
