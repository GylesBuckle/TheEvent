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
import { makeStyles } from '@material-ui/core/styles';

import * as moment from 'moment';

const useStyles = makeStyles((theme) => ({
  tableCell: {
    borderBottom: '0.5px solid rgba(13, 19, 88, 0.8)',
    cursor: 'pointer',
  },
}));
export default function purchasings(props) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {props.purchasings.map((p, i) => (
            <TableRow
              key={i}
              style={{ background: i % 2 === 0 ? 'rgba(13, 19, 88, 0.2)' : '#F8F6FF' }}
            >
              <TableCell className={classes.tableCell}>
                <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                  {moment(p.date).format('MMMM DD,YYYY')}

                  {p.event?._id && (
                    <Link href={`/event/${p.event._id}`}>
                      <>
                        <br /> {p.event.name}
                      </>
                    </Link>
                  )}
                </Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography variant="subtitle1" style={{ fontWeight: 400 }}>
                  {p.paymentMethod.toUpperCase()}
                </Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                  {p.quantity}
                </Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography variant="subtitle1" style={{ fontWeight: 800 }}>
                  {p.totalAmount}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
