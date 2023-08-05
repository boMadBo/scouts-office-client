import React from 'react';

async function getIP() {
  const apiUrl = `https://api64.ipify.org?format=json`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.ip;
}

const myToken = '1580de01e1a73e';

async function getGeoData() {
  const myIP = await getIP();
  const apiUrl = `https://ipinfo.io/${myIP}?token=${myToken}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log('Latitude', data.loc.split(',')[0]);
  console.log('Longitude', data.loc.split(',')[1]);
}

getGeoData();

const cities = [
  { city: 'London', id: 45633, latitude: 51.5085, longitude: -0.1257 },
  { city: 'Madrid', id: 3520100, latitude: 40.4165, longitude: -3.7026 },
  { city: 'Moscow', id: 3710202, latitude: 55.7522, longitude: 37.6156 },
  { city: 'Paris', id: 144571, latitude: 48.8534, longitude: 2.3488 },
  { city: 'Tokyo', id: 3705817, latitude: 35.6895, longitude: 139.6917 },
  { city: 'Bangkok', id: 3453191, latitude: 13.754, longitude: 100.5014 },
  { city: 'New York', id: 171814, latitude: 40.7143, longitude: -74.006 },
  { city: 'Los Angeles', id: 126549, latitude: 34.0522, longitude: -118.2437 },
];

const Weather = () => {
  return (
    <div>
      <div>Weather</div>
    </div>
  );
};

export default Weather;
