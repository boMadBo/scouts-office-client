import Squad from '@/containers/leagues/components/Squad';
import React from 'react';
import { useParams } from 'react-router-dom';

const SquadPage = () => {
  const { id } = useParams();
  return (
    <>
      <Squad id={id} />
    </>
  );
};

export default SquadPage;
