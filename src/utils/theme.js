import { createTheme } from '@material-ui/core/styles';

const arcOrange = '#FFBA60';
const arcGrey = '#848199';

const mainBack = '#000';
const mainFront = '#fff';
export default createTheme({
  palette: {
    common: {
      mainBack: mainBack,
      mainFront: mainFront,
      orange: `${arcOrange}`,
    },
    primary: {
      main: `${mainBack}`,
    },
    secondary: {
      main: `${arcOrange}`,
    },
  },
  typography: {
    h1: {
      fontFamily: 'Poppins',
      fontWeight: 700,
      fontSize: '60px',
      lineHeight: '122.5%',
    },
    h2: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      fontSize: '40px',
    },
    h3: {
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: '36px',
    },
    h4: {
      fontFamily: 'Poppins',
      fontWeight: '700',
      fontSize: '30px',
    },
    h5: {
      fontFamily: 'Poppins',
      fontWeight: '700',
      fontSize: '22px',
    },
    subtitle1: {
      fontSize: '18px',
      fontWeight: 300,
      fontFamily: 'Poppins',
    },
    subtitle2: {
      fontSize: '16px',
      fontWeight: 400,
      fontFamily: 'Poppins',
    },
    body1: {
      fontSize: '15px',
      fontWeight: 400,
      fontFamily: 'Poppins',
      color: arcGrey,
      lineHeight: '22px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      fontFamily: 'Poppins',
      color: '#2D3748',
    },
    small: {
      fontSize: '12px',
      fontWeight: 400,
      fontFamily: 'Poppins',
      color: '#2D3748',
    },
    caption: {
      fontFamily: 'Poppins',
      fontSize: '20px',
      fontWeight: 400,
      color: `${arcGrey}`,
      lineHeight: '30.5px',
    },
    label: {
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontWeight: '400',
    },
    input: {
      fontFamily: 'Poppins',
      fontWeight: '400',
      fontSize: '14px',
      color: '#2D3748',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #899298',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #3c74cc',
        boxShadow: '0 0 0 3px #dceefc',
      },
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: mainBack,
        fontSize: '1rem',
      },
    },
    MuiTextField: {
      root: {
        '& .MuiFormHelperText-root': {
          fontWeight: 400,
          fontSize: '14px',
          fontFamily: 'Inter',
        },
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: `2px solid ${mainBack}`,
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid ${mainBack}`,
        },
      },

      root: {
        color: arcGrey,
        fontWeight: 300,
      },
    },
  },
});
