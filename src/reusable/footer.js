import React from 'react';
import { Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div style={{ width: '100%' }}>
      <Typography
        align="center"
        variant="body1"
        style={{
          fontSize: '10px',
          color: '#2b2b2b',
        }}
      >
        {t('common.footer.text')}
        <FavoriteIcon
          style={{
            margin: '0 1px',
            marginTop: '5px',
            fontSize: '0.8rem',
            fill: 'red',
          }}
        />
        {t('common.footer.text1')}
      </Typography>
      <Typography
        align="center"
        variant="body1"
        style={{ fontSize: '10px', marginTop: '-4px' }}
      >
        <a
          href="https://tappio.de/agb/"
          rel="noopener noreferrer"
          target="_blank"
          style={{
            color: '#2b2b2b',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          {t('common.footer.terms')}
        </a>{' '}
        |{' '}
        <a
          href="https://tappio.de/datenschutzerklaerung/"
          rel="noopener noreferrer"
          target="_blank"
          style={{
            color: '#2b2b2b',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          {t('common.footer.privacy')}
        </a>{' '}
        |{' '}
        <a
          href="https://tappio.de/impressum/"
          rel="noopener noreferrer"
          target="_blank"
          style={{
            color: '#2b2b2b',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          {t('common.footer.impressum')}
        </a>
      </Typography>
    </div>
  );
}
