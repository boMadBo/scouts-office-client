import League from '@/containers/LeaguesCont/components/League';
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
