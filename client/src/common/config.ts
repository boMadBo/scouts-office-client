const nodeEnv = process.env.NODE_ENV || 'development';


export const config = {
  nodeEnv,
  transfermarkt: {
    url: 'https://transfermarket.p.rapidapi.com',
    key: process.env.REACT_APP_TRANSFERMARKT ?? 'DEFAULT_KEY',
  },
  weather: {
    token: process.env.WEATHER_TOKEN ?? 'DEFAULT_TOKEN',
    url: 'https://api.open-meteo.com/v1/forecast'
  },
  countryFlag: {
    url: 'https://restcountries.com/v3.1/name',
  },
  location: {
    url: 'https://ipinfo.io'
  },
  userIp: {
    url: 'https://api64.ipify.org?format=json'
  },
  exchange: {
    url: 'https://api.coinbase.com/v2/exchange-rates',
  },
}