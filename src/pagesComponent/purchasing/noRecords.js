import React from 'react';
import Link from 'next/link';
import { Button, Grid, Typography, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export default function noRecords() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Grid container direction="column" alignItems="center" style={{ marginTop: '5em' }}>
      <Grid item>
        <Typography
          variant="h4"
          component="h1"
          style={{
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          {t('purchasing.noRecord')}
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: '2em' }}>
        <Typography
          variant="h1"
          style={{
            textAlign: 'center',
          }}
        >
          {t('purchasing.moreEvent')}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="subtitle1"
          style={{
            textAlign: 'center',
          }}
        >
          {t('purchasing.notFound')}
        </Typography>
      </Grid>
      <Grid item style={{ marginTop: '1em' }}>
        <Link href="/#events">
          <Button
            variant="contained"
            style={{ background: theme.palette.primary.main, color: '#fff', padding: '10px 20px' }}
          >
            {t('purchasing.popular')}
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
