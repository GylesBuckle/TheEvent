module.exports = {
  distDir: 'build',
  publicRuntimeConfig: {
    REACT_APP_ASSET_PREFIX: process.env.REACT_APP_ASSET_PREFIX,
    REACT_APP_NODE_ENV: process.env.REACT_APP_NODE_ENV,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_URL: process.env.REACT_APP_URL,
    REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    REACT_APP_STRIPE: process.env.REACT_APP_STRIPE,
  },
};
