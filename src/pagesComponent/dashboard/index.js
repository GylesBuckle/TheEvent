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
  IconButton,
  TextField,
  InputAdornment,
  Divider,
  Radio,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

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
export default function index() {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container direction="column" className={classes.container}>
      {/* heading */}
      <Grid item style={{ marginTop: '1em' }}>
        <Typography variant="h2" style={{ color: '#9A9A9A' }}>
          {t('dashboard.heading')}
        </Typography>
      </Grid>
    </Grid>
  );
}
