import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CardElement } from '@stripe/react-stripe-js';
import { GlobalContext } from '../context/GlobalContext';

import axios from '../utils/axios';
const useStyles = makeStyles((theme) => ({
  label: {
    ...theme.typography.subtitle2,
  },
}));

export default function StripeForm({
  stripe,
  elements,
  tenure,
  subcription,
  paymentMethod,
  onClose,
  setLoading,
}) {
  const classes = useStyles();
  const router = useRouter();

  const theme = useTheme();
  const { setAuth, user: globaluser } = useContext(GlobalContext);

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(!stripe);

  const handleChangeStripe = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    console.log('event ', event);
    setDisabled(event.empty || event.error || !event.complete);
    setError(event.error ? event.error.message : '');
  };

  const checkoutHandlerStripe = async (e) => {
    setLoading({
      active: true,
      action: 'stripe',
    });
    e.preventDefault();
    setProcessing(true);

    setProcessing(true);
    stripe.createToken(elements.getElement(CardElement)).then(async (res) => {
      if (res.error) {
        setError(res.error.message);
      } else {
        try {
          const result = await axios.post(
            '/payment/',
            {
              paymentMethod: paymentMethod,
              tenure: tenure,
              subcriptionId: subcription._id,
              token: res?.token,
            },
            {
              headers: {
                authorization: 'Bearer ' + globaluser.token,
              },
            }
          );

          if (result.data.status === 'success') {
            elements.getElement(CardElement).clear();
            setAuth({
              ...globaluser,
              paid: result.data.data.paid,
              expireTime: result.data.data.expireTime,
            });
            setSucceeded(true);
            onClose();

            setLoading({
              active: false,
              action: '',
            });
            if (globaluser?.roles?.includes('User')) {
              router.push('/choose-feature');
            } else {
              router.push('/edit-profile');
            }
          } else {
            setError('Something went wrong');
          }
        } catch (err) {
          console.log(err, 'error in');
          setProcessing(false);
          setError(err.response?.data?.message || err.message);
        }
      }

      setProcessing(false);
    });
  };
  const cardStyle = {
    style: {
      root: {
        backgroundColor: '#fff',
      },
      base: {
        // border: "2px solid blue",
        // margin: "1rem",
        color: '#32325d',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        // color: 'red',
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  return (
    <form id="payment-form" onSubmit={checkoutHandlerStripe}>
      <div
        style={{
          border: '1px solid #D6D9DB',
          padding: '1rem',
          borderRadius: '3px',
          marginBottom: '1rem',
          // color: "red"
        }}
      >
        <CardElement
          id="card-element"
          className="card-element"
          options={{
            hidePostalCode: true,
            style: cardStyle,
          }}
          onChange={handleChangeStripe}
        />
      </div>
      <div
        style={{
          // border: "2px solid blue",
          marginTop: '1rem',
          display: 'flex',
          // justifyContent: "flex-end",
          alignItems: 'center',
          cursor: processing || disabled || succeeded ? 'not-allowed' : 'pointer',
        }}
      >
        <Button
          type="submit"
          variant="contained"
          fullWidth
          style={{
            backgroundColor:
              processing || disabled || succeeded ? '#E1E8EE' : theme.palette.primary.main,
          }}
          disabled={processing || disabled || succeeded}
        >
          {processing ? (
            <CircularProgress size={20} color="primary" />
          ) : (
            <span
              className={classes.label}
              style={{
                fontWeight: 'bold',
                textTransform: 'none',
                color: processing || disabled || succeeded ? '#2d2d2d' : '#fff',
                cursor: processing || disabled || succeeded ? 'not-allowed' : 'pointer',
              }}
            >
              Enter Payment to Purchase
            </span>
          )}
        </Button>
      </div>
      {error && (
        <div className="card-error" role="alert" style={{ color: 'red', textAlign: 'center' }}>
          {error}
        </div>
      )}
    </form>
  );
}
