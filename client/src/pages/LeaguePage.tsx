<<<<<<< HEAD
<<<<<<< HEAD
import League from '@/containers/LeaguesCont/components/League';
=======
import League from '@/containers/Leagues/League';
>>>>>>> 431f668 (dev leagues)
=======
import League from '@/containers/Leagues/components/League';
>>>>>>> dfd4232 (create squad page)
import React from 'react';
import { useParams } from 'react-router-dom';

const LeaguePage = () => {
  const { id } = useParams();

  return (
    <>
      <League id={id} />
    </>
  );
};

export default LeaguePage;
