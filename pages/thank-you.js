import React from 'react';
import Head from 'next/head';

import Link from 'next/link';
import { Grid, Typography, Button, useMediaQuery } from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useTranslation } from 'react-i18next';
import Header from '../src/reusable/header';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '90vh',
    padding: '1em',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  button: {
    ...theme.typography.button,
    padding: '13px 0px',
    fontSize: '20px',
  },
}));
export default function Thankyou() {
  const { t } = useTranslation();

  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item style={{ width: '100%' }}>
        <Header />
      </Grid>
      {/* for logo */}
      <Grid item>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="486"
          height="476"
          fill="none"
          viewBox="0 0 486 476"
        >
          <path
            fill="#0D1358"
            d="M353.447 45.213S285.991 7.42 208.596 36.14C131.202 64.86 81.875 139.56 40.376 199.06-1.122 258.56 5.193 327.365 53.873 366.556s92.805 1.166 168.647 11.871c75.841 10.705 94.307 24.961 164.196-7.063 69.888-32.024 98.344-130.896 61.672-213.84-36.672-82.944-94.941-112.311-94.941-112.311z"
          ></path>
          <path
            fill="#fff"
            d="M353.447 45.213S285.991 7.42 208.596 36.14C131.202 64.86 81.875 139.56 40.376 199.06-1.122 258.56 5.193 327.365 53.873 366.556s92.805 1.166 168.647 11.871c75.841 10.705 94.307 24.961 164.196-7.063 69.888-32.024 98.344-130.896 61.672-213.84-36.672-82.944-94.941-112.311-94.941-112.311z"
            opacity="0.8"
          ></path>
          <path
            fill="#0D1358"
            d="M468.729 445.806c0 5.081-100.816 9.202-225.156 9.202s-225.156-4.121-225.156-9.202c0-5.08 100.803-9.214 225.156-9.214 124.353 0 225.156 4.121 225.156 9.214z"
          ></path>
          <path
            fill="#fff"
            d="M468.729 445.806c0 5.081-100.816 9.202-225.156 9.202s-225.156-4.121-225.156-9.202c0-5.08 100.803-9.214 225.156-9.214 124.353 0 225.156 4.121 225.156 9.214z"
            opacity="0.5"
          ></path>
          <path
            fill="#0D1358"
            d="M437.983 352.948a27.23 27.23 0 00-6.133 12.752l-12.293 6.908v-32.646l.233.337 19.604-14.373c2.471.389 11.982 1.478 20.704-3.201 9.989-5.43 17.339-24.08 17.339-24.08s-23.977-2.708-32.104 7.362a27.926 27.926 0 00-6.664 18.792l-19.112 14.022v-24.105a26.624 26.624 0 009.257-7.158 26.673 26.673 0 005.3-10.442c3.481-13.569-15.088-40.305-15.088-40.305s-19.345 27.514-15.528 41.472c3.274 11.819 12.086 15.552 14.713 16.433v52.293l-13.755-11.495c.31-2.748.556-11.366-7.104-20.01-9.291-10.459-34.045-9.681-34.045-9.681s10.442 20.917 19.41 27.902c7.764 6.092 18.504 3.603 21.079 2.878l14.519 12.117v15.889h-21.623l8.799 55.08h26.398l8.799-55.08h-21.131v-10.51l13.509-7.582c3.287.907 12.474 2.799 21.17-1.555 10.831-5.405 19.721-17.069 19.721-17.069s-25.919-6.57-35.974 5.055z"
          ></path>
          <path
            fill="#fff"
            d="M437.983 352.948a27.23 27.23 0 00-6.133 12.752l-12.293 6.908v-32.646l.233.337 19.604-14.373c2.471.389 11.982 1.478 20.704-3.201 9.989-5.43 17.339-24.08 17.339-24.08s-23.977-2.708-32.104 7.362a27.926 27.926 0 00-6.664 18.792l-19.112 14.022v-24.105a26.624 26.624 0 009.257-7.158 26.673 26.673 0 005.3-10.442c3.481-13.569-15.088-40.305-15.088-40.305s-19.345 27.514-15.528 41.472c3.274 11.819 12.086 15.552 14.713 16.433v52.293l-13.755-11.495c.31-2.748.556-11.366-7.104-20.01-9.291-10.459-34.045-9.681-34.045-9.681s10.442 20.917 19.41 27.902c7.764 6.092 18.504 3.603 21.079 2.878l14.519 12.117v15.889h-21.623l8.799 55.08h26.398l8.799-55.08h-21.131v-10.51l13.509-7.582c3.287.907 12.474 2.799 21.17-1.555 10.831-5.405 19.721-17.069 19.721-17.069s-25.919-6.57-35.974 5.055z"
            opacity="0.5"
          ></path>
          <path
            fill="#0D1358"
            stroke="#263238"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M384.373 40.754H88.267c-8.333 0-15.088 6.766-15.088 15.112v186.896c0 8.346 6.755 15.111 15.088 15.111h296.106c8.333 0 15.088-6.765 15.088-15.111V55.866c0-8.346-6.755-15.112-15.088-15.112z"
          ></path>
          <path
            fill="#0D1358"
            stroke="#263238"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M384.373 40.754H88.267c-8.333 0-15.088 6.766-15.088 15.112v186.896c0 8.346 6.755 15.111 15.088 15.111h296.106c8.333 0 15.088-6.765 15.088-15.111V55.866c0-8.346-6.755-15.112-15.088-15.112z"
            opacity="0.7"
          ></path>
          <path
            fill="#fff"
            d="M210.796 162.138h-38.173v21.449h38.173v-21.449zM210.796 187.462h-38.173v21.448h38.173v-21.448zM252.851 162.138h-38.173v21.449h38.173v-21.449zM294.919 136.801h-38.173v21.449h38.173v-21.449zM294.919 111.464h-38.173v21.449h38.173v-21.449z"
          ></path>
          <path
            fill="#818181"
            d="M294.919 64.64h-38.173v17.6h38.173v-17.6zM252.851 64.64h-38.173v17.6h38.173v-17.6z"
          ></path>
          <path
            fill="#fff"
            d="M252.851 187.462h-38.173v21.448h38.173v-21.448zM252.851 86.127h-38.173v21.449h38.173V86.127zM252.851 111.464h-38.173v21.449h38.173v-21.449zM252.851 136.801h-38.173v21.449h38.173v-21.449zM294.919 187.462h-38.173v21.448h38.173v-21.448zM126.673 86.127H85.977v21.449h40.696V86.127zM126.673 136.801H85.977v21.449h40.696v-21.449zM126.673 162.138H85.977v21.449h40.696v-21.449zM126.673 111.464H85.977v21.449h40.696v-21.449z"
          ></path>
          <path fill="#818181" d="M381.565 64.64h-40.696v17.6h40.696v-17.6z"></path>
          <path
            fill="#fff"
            d="M126.673 187.462H85.977v21.448h40.696v-21.448zM336.974 86.127h-38.173v21.449h38.173V86.127zM294.919 162.138h-38.173v21.449h38.173v-21.449zM336.974 162.138h-38.173v21.449h38.173v-21.449zM336.974 111.464h-38.173v21.449h38.173v-21.449zM336.974 136.801h-38.173v21.449h38.173v-21.449zM336.974 187.462h-38.173v21.448h38.173v-21.448zM294.919 86.127h-38.173v21.449h38.173V86.127zM381.565 187.462h-40.696v21.448h40.696v-21.448z"
          ></path>
          <path fill="#818181" d="M336.974 64.64h-38.173v17.6h38.173v-17.6z"></path>
          <path
            fill="#fff"
            d="M381.565 162.138h-40.696v21.449h40.696v-21.449zM336.974 212.798h-38.173v22.667h38.173v-22.667zM381.565 136.801h-40.696v21.449h40.696v-21.449zM252.851 212.798h-38.173v22.667h38.173v-22.667zM294.919 212.798h-38.173v22.667h38.173v-22.667zM381.565 111.464h-40.696v21.449h40.696v-21.449zM381.565 212.798h-40.696v22.667h40.696v-22.667zM126.673 212.798H85.977v22.667h40.696v-22.667zM381.565 86.127h-40.696v21.449h40.696V86.127z"
          ></path>
          <path
            fill="#818181"
            d="M126.673 64.64H85.977v17.6h40.696v-17.6zM168.728 64.64h-38.173v17.6h38.173v-17.6z"
          ></path>
          <path fill="#fff" d="M168.728 162.138h-38.173v21.449h38.173v-21.449z"></path>
          <path fill="#818181" d="M210.796 64.64h-38.173v17.6h38.173v-17.6z"></path>
          <path
            fill="#fff"
            d="M210.796 111.464h-38.173v21.449h38.173v-21.449zM168.728 187.462h-38.173v21.448h38.173v-21.448zM210.796 86.127h-38.173v21.449h38.173V86.127zM168.728 86.127h-38.173v21.449h38.173V86.127zM210.796 136.801h-38.173v21.449h38.173v-21.449zM168.728 136.801h-38.173v21.449h38.173v-21.449zM168.728 212.798h-38.173v22.667h38.173v-22.667zM168.728 111.464h-38.173v21.449h38.173v-21.449zM210.796 212.798h-38.173v22.667h38.173v-22.667z"
          ></path>
          <path
            fill="#fff"
            stroke="#263238"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M103.937 52.807c3.038 0 5.5-2.466 5.5-5.508a5.504 5.504 0 00-5.5-5.508 5.504 5.504 0 00-5.499 5.508 5.504 5.504 0 005.499 5.508zM128.058 47.3a5.53 5.53 0 00-3.397-5.112 5.506 5.506 0 00-6.014 1.194 5.526 5.526 0 00.844 8.5 5.505 5.505 0 003.067.925c1.459 0 2.857-.58 3.889-1.613a5.514 5.514 0 001.611-3.895z"
          ></path>
          <path
            fill="#fff"
            stroke="#263238"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M104.041 50.89a2.887 2.887 0 01-2.886-2.891V28.455a2.89 2.89 0 014.936-2.053c.543.545.848 1.283.848 2.053V48a2.898 2.898 0 01-1.79 2.674 2.878 2.878 0 01-1.108.216zM122.83 50.89a2.89 2.89 0 01-2.886-2.89V28.454a2.906 2.906 0 01.841-2.052 2.886 2.886 0 014.095 0c.543.544.849 1.282.849 2.052V48a2.898 2.898 0 01-1.791 2.674 2.878 2.878 0 01-1.108.216zM357.769 47.3a5.53 5.53 0 00-3.397-5.112 5.506 5.506 0 00-6.014 1.194 5.53 5.53 0 00.844 8.5 5.505 5.505 0 003.067.925c1.459 0 2.857-.58 3.889-1.613a5.514 5.514 0 001.611-3.895zM370.877 52.807a5.504 5.504 0 005.499-5.508 5.504 5.504 0 00-5.499-5.508 5.504 5.504 0 00-5.5 5.508 5.504 5.504 0 005.5 5.508z"
          ></path>
          <path
            fill="#fff"
            stroke="#263238"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M352.36 50.89c-.766 0-1.5-.305-2.041-.847a2.893 2.893 0 01-.845-2.044V28.455a2.893 2.893 0 011.778-2.681 2.887 2.887 0 013.157.629c.544.544.849 1.282.849 2.052V48a2.891 2.891 0 01-2.898 2.89zM371.161 50.89a2.88 2.88 0 01-2.712-1.773 2.882 2.882 0 01-.225-1.118V28.455a2.903 2.903 0 012.899-2.903 2.882 2.882 0 012.669 1.793c.145.353.218.73.216 1.11V48a2.891 2.891 0 01-2.847 2.89zM228.11 52.807a5.504 5.504 0 005.499-5.508 5.504 5.504 0 00-5.499-5.508 5.504 5.504 0 00-5.5 5.508 5.504 5.504 0 005.5 5.508zM246.718 52.807a5.504 5.504 0 005.499-5.508 5.504 5.504 0 00-5.499-5.508 5.504 5.504 0 00-5.5 5.508 5.504 5.504 0 005.5 5.508z"
          ></path>
          <path
            fill="#fff"
            stroke="#263238"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M228.201 50.89c-.766 0-1.5-.305-2.041-.847a2.893 2.893 0 01-.845-2.044V28.455a2.893 2.893 0 011.778-2.681 2.887 2.887 0 013.157.629c.544.544.849 1.282.849 2.052V48a2.891 2.891 0 01-2.898 2.89zM246.989 50.89a2.883 2.883 0 01-2.04-.847 2.893 2.893 0 01-.845-2.044V28.455a2.892 2.892 0 011.778-2.681 2.882 2.882 0 012.216 0 2.894 2.894 0 011.569 1.57 2.9 2.9 0 01.221 1.111V48a2.891 2.891 0 01-2.899 2.89z"
          ></path>
          <path
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M112.4 113.33l-19.255 17.004M99.072 113.33l13.328 15.863M325.509 89.147l-19.255 16.991M312.181 89.147l13.328 15.863M199.331 89.147l-19.268 16.991M185.99 89.147l13.341 15.863M369.557 88.668l-19.268 17.003M356.216 88.668l13.341 15.863"
          ></path>
          <path
            fill="#fff"
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M168.172 143.812s5.939 7.543 6.547 9.202a31.184 31.184 0 011.061 3.693l3.882 2.878a1.09 1.09 0 01.449.752 1.102 1.102 0 01-.242.842l-2.937 3.616s2.73 9.072 2.588 10.368c-.142 1.296-9.627 4.523-9.627 4.523l-.88 6.946-17.987-.233-.065-12.869-7.181-16.848s6.431-12.157 24.392-12.87z"
          ></path>
          <path fill="#fff" d="M165.066 169.201l2.42-.259a8.108 8.108 0 003.804 5.184"></path>
          <path
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M165.066 169.201l2.42-.259a8.108 8.108 0 003.804 5.184"
          ></path>
          <path
            fill="#263238"
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M147.597 144.24s-6.794.324-6.755 9.746c.039 9.422 9.563 18.144 10.08 19.531.518 1.386 5.616.738 9.201-.597a9.412 9.412 0 004.904-3.719s-3.429-5.003-2.731-6.48c.699-1.478 4.374-.065 4.374-.065a8.702 8.702 0 002.174-1.749c.621-.869 3.947-4.614 1.644-6.584-2.304-1.97-5.888-3.162-4.297-5.651 1.592-2.488 7.286-4.912 5.616-10.264-1.669-5.353-5.396-5.184-8.501-3.434-3.106 1.749-3.96-3.888-10.003-.687-6.043 3.201-7.738 7.879-5.706 9.953z"
          ></path>
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
            d="M155.542 162.695a11.73 11.73 0 000 3.007M166.023 147.558s-1.294 2.397-6.47 7.05a12.29 12.29 0 00-3.7 6.13M167.24 152.314s-5.267 7.154-8.036 9.279"
          ></path>
          <path
            fill="#263238"
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M220.307 144.603a71.25 71.25 0 0016.822 5.65s-8.295-5.624-16.318-7.024c-.737-.104-1.139 1.05-.504 1.374z"
          ></path>
          <path
            fill="#fff"
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M218.767 187.189l9.886-25.349s-3.882-6.39-3.882-8.321 6.185-8.877 6.185-8.877.505-3.772 3.196-1.97a5.466 5.466 0 012.355 4.847 49.95 49.95 0 013.378 5.482c.621 1.503-5.254 9.862-5.254 9.862s-.983 23.03-3.571 30.949c-2.588 7.919-3.235 9.564-4.956 11.884-1.721 2.32-9.899-1.762-9.899-1.762l2.562-16.745z"
          ></path>
          <path
            fill="#263238"
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M173.568 431.771l16.084 5.857a2.86 2.86 0 011.935 2.732 2.86 2.86 0 01-.253 1.156 1.904 1.904 0 01-1.074.947c-2.044.738-23.292 8.035-29.49 5.404a3.88 3.88 0 01-2.135-3.409c.205-4.781.728-9.544 1.566-14.256 0 0 7.893 3.746 13.367 1.569z"
          ></path>
          <path
            fill="#fff"
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M191.36 441.529a2.602 2.602 0 00.064-2.19c-4.451 2.164-13.91 6.221-22.528 6.376a35.01 35.01 0 01-10.197-.868 4.028 4.028 0 002.096 3.033c6.238 2.592 27.446-4.666 29.491-5.405a1.901 1.901 0 001.074-.946z"
          ></path>
          <path
            fill="#263238"
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M128.976 426.872s-1.449 13.361-.673 14.683c.777 1.322 3.093 2.216 7.079 1.957a5.818 5.818 0 005.434-4.108c.363-.959-.569-9.694-.595-11.223-.026-1.53-11.245-1.309-11.245-1.309z"
          ></path>
          <path
            fill="#fff"
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M140.855 436.903c-1.229 2.371-2.795 3.888-6.858 3.965a10.334 10.334 0 01-5.927-1.581 6.34 6.34 0 00.233 2.268c.789 1.296 3.093 2.216 7.078 1.957a5.821 5.821 0 005.435-4.108c.113-.829.126-1.669.039-2.501zM182.173 273.127a53.985 53.985 0 01-11.866 4.238l-35.676-8.255s-2.368 20.036-2.303 23.483c.064 3.447 1.294 65.487 1.294 65.487l-4.866 69.725a5.934 5.934 0 005.577 3.343 16.63 16.63 0 006.859-1.516l15.295-72.576 3.403 77.047s2.109 2.035 6.923 1.931a7.977 7.977 0 003.976-1.214 8.006 8.006 0 002.83-3.049s2.368-29.808 5.901-51.141c3.533-21.332 3.96-80.054 3.96-80.054l-1.307-27.449z"
          ></path>
          <path
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M148.244 283.638a72.728 72.728 0 0014.234 1.646M135.019 279.789s1.656 2.203 6.043 2.203M171.212 413.238s3.287-39.541 5.487-68.092a371.827 371.827 0 00.543-50.544s5.487-6.039 1.644-16.472M171.212 417.631l-1.643 12.636M156.448 357.069l-3.908-51.762-9.123-8.787"
          ></path>
          <path
            fill="#fff"
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M137.336 244.719a2.856 2.856 0 00-1.126-3.24c-3.96-2.683-13.561-8.204-16.628-.933a46.93 46.93 0 00-1.864 8.709c-.854 5.819-.543 45.217-.504 49.248 0 .218-.026.436-.078.648-.336 1.542-1.747 8.281-.763 12.299 1.1 4.575 3.209 8.1 6.793 9.072 3.585.972 5.539-3.175 4.982-5.715-.556-2.541.777-4.511.22-7.051-.453-2.047-2.394-7.4-3.131-9.383a2.937 2.937 0 01-.13-1.529c1.01-5.184 6.664-34.253 7.091-35.653.427-1.4 3.74-11.949 5.138-16.472z"
          ></path>
          <path
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M122.092 312.318s4.568 3.201 5.099 6.156M123.542 309.661s3.623 2.372 4.593 4.238"
          ></path>
          <path
            fill="#fff"
            d="M124.201 306.979l1.294 1.788s.647 7.128 2.666 6.065c2.018-1.062.828-9.707.828-9.707s-1.022-2.112-4.18-7.154"
          ></path>
          <path
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M124.201 306.979l1.294 1.788s.647 7.128 2.666 6.065c2.018-1.062.828-9.707.828-9.707s-1.022-2.112-4.18-7.154"
          ></path>
          <path
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M123.968 299.527a13.6 13.6 0 01-.181 7.776 61.647 61.647 0 01-3.882 6.35 60.271 60.271 0 015.319 5.806"
          ></path>
          <path
            fill="#263238"
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M126.246 197.959l-11.737 43.196s9.822 7.97 21.998 7.776l7.855-41.006s-8.773-19.738-18.116-9.966z"
          ></path>
          <path
            fill="#263238"
            stroke="#263238"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M145.656 183.794s-17.236 8.579-18.854 12.467c-1.294 3.24 2.666 26.18 2.743 30.21.078 4.031 3.52 38.66 4.452 45.36.931 6.7 23.292 9.552 31.806 6.973 8.515-2.579 16.421-3.564 16.369-5.716-.051-2.151-1.19-20.373-.724-23.859.466-3.486 4.076-29.64 4.076-29.64l32.492-6.739s1.501-.907 1.54-6.791c.005-5.554-.28-11.104-.854-16.628a37.314 37.314 0 01-12.862.804c-7.842-.7-17.133-2.812-18.789-2.346-1.657.467-12.94-1.892-16.654-2.358-5.163-.7-18.271-5.081-24.741-1.737z"
          ></path>
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
            d="M131.189 246.844l-4.516-37.934M127.902 225.421l-2.2-4.937M185.524 219.525l-12.668 2.047M182.729 220.484l-9.317 8.787M211.236 191.375s-8.774 13.181-30.151 18.144"
          ></path>
        </svg>
      </Grid>
      <Grid item style={{ marginTop: '1em' }}>
        <Typography variant="h1" style={{ textAlign: 'center' }}>
          {t('thankyou.heading')}
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: '1em', width: matchesSM ? '90%' : '50%' }}>
        <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
          {t('thankyou.description')}
        </Typography>
      </Grid>

      <Grid item style={{ marginTop: '1em', width: matchesSM ? '90%' : '30%' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button fullWidth className={classes.button}>
            {t('thankyou.continue')}
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}