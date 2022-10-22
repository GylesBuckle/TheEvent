import React, { useState, useEffect, useContext } from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ThemeProvider, useTheme } from '@material-ui/core/styles';

import { useTranslation } from 'react-i18next';
import '../src/i18n';

import { GlobalProvider, GlobalContext } from '../src/context/GlobalContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

import * as websiteInfo from '../src/data/websiteInfo';
import axios from '../src/utils/axios';
import theme from '../src/utils/theme';
import Loading from '../src/reusable/loading';

const publicPages = [];
const allowedAuthPages = ['/'];
const Main = ({ Component, pageProps }) => {
  const router = useRouter();
  const muiTheme = useTheme();

  const [loadingAuth, setLoadingAuth] = useState(
    publicPages.some((p) => router.pathname === p) ||
      allowedAuthPages.some((p) => router.pathname === p)
      ? false
      : false
  );
  const { setAuth } = useContext(GlobalContext);

  useEffect(() => {
    const fetchToken = async () => {
      if (!allowedAuthPages.some((p) => router.pathname === p)) {
        setLoadingAuth(true);
      }
      let Token = null;
      try {
        Token = await localStorage.getItem('tappio-jwt');
      } catch (e) {
        console.log('Error Fetching jwt Token');
        setLoadingAuth(false);
      }

      if (Token != null) {
        //validate Token Here from server or async storage to find user state
        //validating through server
        try {
          const result = await axios.post('/users/validateToken', null, {
            headers: {
              authorization: 'Bearer ' + Token,
            },
          });
          if (result.data.status === 'success') {
            setAuth({ ...result.data.data.user, token: Token });
            console.log(result.data.data.user.portfolio);
          }
          setLoadingAuth(false);
          if (result.data.status === 'success') {
            updateUserActivity(Token);
          }
        } catch (e) {
          setLoadingAuth(false);
        }
      } else {
        setLoadingAuth(false);
      }
    };
    if (!publicPages.some((p) => router.pathname === p)) {
      //fetchToken();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loadingAuth) {
    return <Loading />;
  }
  return (
    <>
      <Component {...pageProps} loadingAuth={loadingAuth} />
    </>
  );
};

function MyApp({ Component, pageProps }) {
  const { t } = useTranslation();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const Android = process.browser && /Android/.test(navigator.userAgent);

  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <Head>
          <title>{websiteInfo.websiteTitle}</title>

          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          <meta name="theme-color" content="#000000" />
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Security-Policy" script-src="unsafe-inline" />
          <meta name="description" content={websiteInfo.websiteDescription} />
          <meta httpEquiv="Content-Security-Policy" script-src="unsafe-inline" />
          <meta name="Keywords" content={websiteInfo.websiteKeywords} />

          <meta httpEquiv="Content-Security-Policy" script-src="unsafe-inline" />
        </Head>
        {/* publicRuntimeConfig.REACT_APP_Facebook_PIXEL_ID */}

        <GoogleOAuthProvider clientId={publicRuntimeConfig.REACT_APP_GOOGLE_CLIENT_ID}>
          <Main Component={Component} pageProps={pageProps} />
        </GoogleOAuthProvider>
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default MyApp;
