import { createTheme } from '@material-ui/core/styles';

const primary = '#0D1358';
const secondary = '#fff';
const arcGrey = '#848199';
export default createTheme({
  palette: {
    common: {
      grey: arcGrey,
    },
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
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
    authBackground: {
      minHeight: '100vh',
      backgroundColor: primary,
      backgroundImage: 'url(/dev/authBackground.png)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom',
      backgroundSize: '100vw 50vh',
      paddingTop: '20px',
      paddingBottom: '20px',
    },
    button: {
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontWeight: '400',
      color: secondary,
      backgroundColor: primary,
      borderRadius: '12px',
      fontWeight: 600,
      textTransform: 'none',
      '&:hover': {
        color: secondary,
        backgroundColor: primary,
      },
      '&.Mui-disabled': {
        color: '#B3B3B3',
        background: '#E3E3E3',
      },
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: primary,
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
          borderBottom: `2px solid ${primary}`,
        },
        '&:hover:not($disabled):not($focused):not($error):before': {
          borderBottom: `2px solid ${primary}`,
        },
      },

      root: {
        color: arcGrey,
        fontWeight: 300,
      },
    },
  },
});
