import React from 'react';
import { useParams } from 'react-router-dom';

interface Props {
  league: string;
}

const CountryPage = () => {
  const { country } = useParams();
  console.log(country);

  return <div style={{ color: 'var(--main-text)', height: '500px' }}>{country} in development...</div>;
};

export default CountryPage;
