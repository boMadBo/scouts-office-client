const nodeEnv = process.env.REACT_APP_NODE_ENV || 'development';

export const config = {
  nodeEnv,
  transfermarkt: {
    url: 'https://transfermarket.p.rapidapi.com',
    key: process.env.REACT_APP_TRANSFERMARKT ?? 'DEFAULT_KEY',
  },
};
