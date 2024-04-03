import CurrentNews from '@/containers/news/CurrentNews';
import React from 'react';
import { useParams } from 'react-router-dom';

const CurrentNewsPage = () => {
  const { id } = useParams();

  return (
    <>
      <CurrentNews id={id} />
    </>
  );
};

export default CurrentNewsPage;