import Player from '@/containers/player';
import React from 'react';
import { useParams } from 'react-router-dom';

const PlayerPage = () => {
  const { id } = useParams();
  return (
    <>
      <Player id={id} />
    </>
  );
};

export default PlayerPage;
