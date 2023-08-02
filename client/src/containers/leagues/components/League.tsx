import Leagues from '@/containers/leagues';
import Loading from '@/uikit/Loading';
import LeagueTable from '@/uikit/tables/LeagueTable';
import React from 'react';
import { mocks } from '@/containers/leagues/mock';

interface Props {
  id: string | undefined;
}

const columns = [
  { title: '#' },
  { title: 'Club' },
  { title: 'M' },
  { title: 'W' },
  { title: 'D' },
  { title: 'L' },
  { title: 'G' },
  { title: '+/-' },
  { title: 'P' },
];



const League = ({ id }: Props) => {
  // const teams = useGetTeams(id);

  if (mocks.length < 1) {
    return <Loading />;
  }

  return (
    <Leagues>
      <LeagueTable data={mocks} columns={columns} />
    </Leagues>
  );
};

export default React.memo(League);