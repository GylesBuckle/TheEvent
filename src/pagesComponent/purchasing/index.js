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
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { GlobalContext } from '../../context/GlobalContext';
import axios from '../../utils/axios';
import Loading from '../../reusable/loading';
import Error from '../../reusable/error';
import * as moment from 'moment';

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

  return <div>index</div>;
}
