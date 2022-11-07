import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, useTheme, CircularProgress, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CardElement } from '@stripe/react-stripe-js';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
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
  button: {
    ...theme.typography.button,
    borderRadius: 0,

    fontSize: '24px',
    fontFamily: 'Manrope',
    fontWeight: 800,
  },
}));
export default function CheckoutForm(props) {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();
  const classes = useStyles();
  const { stripe, elements } = props;

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

  const checkoutHandler = async (e) => {
    try {
      e.preventDefault();
      setProcessing(true);
      props.stripe.createToken(props.elements.getElement(CardElement)).then(async (res) => {
        if (res.error) {
          setError(res.error.message);
        } else {
          const response = await checkout(props.userToken, res?.token, props.products);
          const result = await response.json();
          if (result.status === 'success') {
            props.elements.getElement(CardElement).clear();
            router.push('/purchase');
          } else {
            setError('Something went wrong');
          }
        }
        setProcessing(false);
      });

      // if (result.status === 'success') {

      // setShowToast({
      //   active: true,
      //   message: t['Shop data Updated Successfully'],
      //   severity: 'success',
      // });
      // } else {
      // setShowToast({
      //   active: true,
      //   message: 'Something went wrong',
      //   severity: 'error',
      // });
      // }
    } catch (err) {
      console.log(err);
      setProcessing(false);
      setError(err.message);
    }
  };
  const cardStyle = {
    style: {
      root: {
        backgroundColor: '#fff',
      },

      base: {
        // border: "2px solid blue",
        // margin: "1rem",
        display: 'flex',
        color: '#32325d',
        fontSize: '16px',
        '::placeholder': {
          color: '#5e5e5e',
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
    <form id="payment-form" onSubmit={checkoutHandler}>
      <div
        style={{
          //border: '1px solid #D6D9DB',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          background: '#F1F1F1',
          minHeight: '30px',
          fontSize: '18px',
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
      {/* order total */}
      <div className={[classes.extraSpace].join(' ')} style={{ marginTop: '25px' }}>
        <Divider />
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
          <Typography
            variant="h4"
            style={{ lineHeight: '41px', marginTop: '20px', color: '#767676' }}
          >
            {t('checkout.orderTotal')}
          </Typography>
          <Typography
            variant="h4"
            style={{ lineHeight: '41px', marginTop: '20px', color: theme.palette.primary.main }}
          >
            ${(props.event.price * props.quantity).toFixed(2)}
          </Typography>
        </div>
        <Divider style={{ marginTop: '20px' }} />
      </div>
      {/* button */}
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
          className={classes.button}
          disabled={processing || disabled || succeeded}
        >
          {processing ? <CircularProgress size={20} color="primary" /> : t('checkout.place')}
        </Button>
      </div>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert" style={{ color: 'red', textAlign: 'center' }}>
          {error}
        </div>
      )}
      <style>{`
     
      #card-element  iframe{
        position: absolute;
        top: 5px;
      }
      `}</style>
    </form>
  );
}
