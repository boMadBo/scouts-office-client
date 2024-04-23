const nodeEnv = process.env.REACT_APP_NODE_ENV || 'development';

export const config = {
  nodeEnv,
  api: {
    url: 'http://localhost:3014/api/',
  },
};
