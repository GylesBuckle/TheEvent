import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Snackbar,
  Slider,
  Dialog,
  DialogContent,
  Button,
  InputAdornment,
  IconButton,
  useMediaQuery,
  CircularProgress,
  Divider,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';

import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../context/GlobalContext';
import axios from '../../utils/axios';
import Loading from '../../reusable/loading';
import Error from '../../reusable/error';

import Purchases from './purchasings';
import NoRecords from './noRecords';
const useStyles = makeStyles((theme) => ({
  paddingContainer: {
    padding: '0 70px',
    [theme.breakpoints.down('1350')]: {
      padding: '0 40px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 10px',
    },
  },
  label: {
    ...theme.typography.label,
  },
  alert: {
    padding: '4px 16px',
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
}));
export default function index() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { user: globaluser } = useContext(GlobalContext);

  const [loading, setLoading] = useState({
    active: false,
    action: '',
  });
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [searchPurchase, setSearchPurchase] = useState('');
  const [purchasings, setPurchasings] = useState([]);

  const fetchPurchasings = async () => {
    try {
      setLoading({
        active: true,
        action: 'page',
      });
      const result = await axios.post(`/events/my-bookings/`, null, {
        headers: {
          authorization: 'Bearer ' + globaluser?.token,
        },
      });
      if (result.data.success === true) {
        setPurchasings(result.data.data.doc);
      } else {
        setError({
          status: true,
          message: result.data.message,
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
      setError({
        status: true,
        message: err.response?.data?.message || 'Fail to fetch bookings',
      });
    }
  };
  useEffect(() => {
    fetchPurchasings();
  }, []);

  if (loading.active && loading.action === 'page') {
    return <Loading />;
  }
  if (error.status) {
    return <Error message={error.message} />;
  }

  return (
    <Grid container direction="column">
      {/* heading */}
      <Grid item style={{ marginTop: '2em' }} className={classes.paddingContainer}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="h2">{t('purchasing.purchases')}</Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <svg
                style={{
                  width: '1em',
                  height: '1em',
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M-5-5h24v24H-5z"></path>
                  <path
                    fill="#39b4ac"
                    fillRule="nonzero"
                    d="M0 9h4V5H0v4zm0 5h4v-4H0v4zM0 4h4V0H0v4zm5 5h4V5H5v4zm0 5h4v-4H5v4zM5 4h4V0H5v4zm5 5h4V5h-4v4zm0 5h4v-4h-4v4zm0-10h4V0h-4v4z"
                  ></path>
                </g>
              </svg>
            </IconButton>
            <IconButton>
              <svg
                style={{ width: '1em', height: '1em' }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M-5-5h24v24H-5z"></path>
                  <path
                    fill="#c7c6c5"
                    fillRule="nonzero"
                    d="M0 9h4V5H0v4zm0 5h4v-4H0v4zM0 4h4V0H0v4zm5 5h9V5H5v4zm0 5h9v-4H5v4zM5 0v4h9V0H5z"
                  ></path>
                </g>
              </svg>
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
      </Grid>
      {/* search */}
      <Grid item style={{ marginTop: '2em' }} className={classes.paddingContainer}>
        <Grid container justify="space-between">
          <Grid item>
            <Button
              variant="outlined"
              style={{
                backgroundColor: 'transparent',
                padding: '10px 20px',
              }}
            >
              <label className={classes.label}> {t('purchasing.filter')}</label>
            </Button>
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
              value={searchPurchase}
              onChange={(e) => setSearchPurchase(e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: '2em' }} className={classes.paddingContainer}>
        {purchasings.filter((x) => x.event?.name.includes(searchPurchase)).length > 0 ? (
          <Purchases
            purchasings={purchasings.filter((x) => x.event?.name.includes(searchPurchase))}
          />
        ) : (
          <NoRecords />
        )}
      </Grid>
    </Grid>
  );
}
