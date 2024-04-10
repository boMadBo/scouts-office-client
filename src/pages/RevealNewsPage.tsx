import RevealNews from '@/containers/news/RevealNews';
import React from 'react';
import { useParams } from 'react-router-dom';

const RevealNewsPage = () => {
  const { id } = useParams();

  return (
    <>
      <RevealNews id={id} />
    </>
  );
};

export default RevealNewsPage;
