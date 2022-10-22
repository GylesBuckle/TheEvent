import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }
  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="all" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <link rel="shortcut icon" href="favicon.ico" />

          <link rel="apple-touch-icon" href="tappio.png" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="*" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-TS8QKTB817"></script>
          <script type="text/javascript" src="/scripts/tawk.js"></script>
          <script type="text/javascript" src="/scripts/Taboola.js"></script>
          <script type="text/javascript" src="/scripts/ga.js"></script>
          <script type="text/javascript" src="/scripts/fbPixel.js"></script>
        </Head>
        <body style={{ margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
