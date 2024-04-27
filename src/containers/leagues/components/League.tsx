import Leagues from '@/containers/leagues';
import { transfermarktAPI } from '@/store/services/TransfermarktService';
import Loading from '@/uikit/Loading';
import LeagueTable from '@/uikit/tables/LeagueTable';
import React from 'react';

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
  const { data: teams } = transfermarktAPI.useGetLeagueTeamsQuery(id || '');

  if (!teams || teams.length < 1) {
    return <Loading />;
  }

  return (
    <Leagues>
      <LeagueTable data={teams} columns={columns} />
    </Leagues>
  );
};

export default React.memo(League);
