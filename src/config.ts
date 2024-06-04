const nodeEnv = process.env.REACT_APP_NODE_ENV || 'development';

export const config = {
  nodeEnv,
  api: {
    url: 'http://localhost:3014/api/',
  },
  google: {
    clientId:
      process.env.GOOGLE_CLIENT_ID || '851556832173-m5ghbtsle0ps7smsointr6heb4pj0i57.apps.googleusercontent.com',
  },
};
