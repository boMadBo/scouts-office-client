<<<<<<< HEAD
import Squad from '@/containers/LeaguesCont/components/Squad';
=======
import Squad from '@/containers/Leagues/Squad';
>>>>>>> 431f668 (dev leagues)
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
