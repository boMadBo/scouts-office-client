import React from 'react';

interface Props {
  country: string;
}

const CountryPage = ({ country }: Props) => {
  return <div>{country}</div>;
};

export default CountryPage;
