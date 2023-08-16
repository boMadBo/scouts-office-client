import React from 'react';
import { useParams } from 'react-router-dom';

const CountryPage = () => {
  const { country } = useParams();

  return <div style={{ color: 'var(--main-text)', height: '500px' }}>{country} in development...</div>;
};

export default CountryPage;
