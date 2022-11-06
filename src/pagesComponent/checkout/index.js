import React from 'react';

import { Grid, useMediaQuery, Typography, Paper, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import Header from '../../reusable/header';

const useStyles = makeStyles((theme) => ({
  container: {
    ...theme.typography.container,
  },
}));
export default function index() {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return <div>index</div>;
}
