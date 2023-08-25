import { Team } from '@/interfaces';
import LeagueTable from '@/uikit/LeagueTable';
import React from 'react';
import Leagues from '../Leagues';

interface Props {
  id: string | undefined;
}

const key = process.env.REACT_APP_TRANSFERMARKT ?? 'DEFAULT_KEY';

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

const mocks: Team[] = [
  {
    id: '1237',
    rank: 1,
    clubName: 'Brighton',
    clubImage: 'https://tmssl.akamaized.net/images/wappen/medium/1237.png?lm=1492718902',
    matches: 1,
    wins: 1,
    draw: 0,
    losses: 0,
    goals: 5,
    goalsConceded: 0,
    group: null,
    goalDifference: 5,
    points: 3,
    markClass: 'fff',
    markColor: 'fff',
    markDescription: 'fff',
    markID: 'fff',
    oldRank: 6,
  },
  {
    id: '281',
    rank: 2,
    clubName: 'Man City',
    clubImage: 'https://tmssl.akamaized.net/images/wappen/medium/281.png?lm=1467356331',
    matches: 1,
    wins: 1,
    draw: 0,
    losses: 0,
    goals: 5,
    goalsConceded: 0,
    group: null,
    goalDifference: 5,
    points: 3,
    markClass: 'fff',
    markColor: 'fff',
    markDescription: 'fff',
    markID: 'fff',
    oldRank: 6,
  },
  {
    id: '11',
    rank: 3,
    clubName: 'Arsenal',
    clubImage: 'https://tmssl.akamaized.net/images/wappen/medium/11.png?lm=1489787850',
    matches: 1,
    wins: 1,
    draw: 0,
    losses: 0,
    goals: 5,
    goalsConceded: 0,
    group: null,
    goalDifference: 5,
    points: 3,
    markClass: 'fff',
    markColor: 'fff',
    markDescription: 'fff',
    markID: 'fff',
    oldRank: 6,
  },
];

const League = ({ id }: Props) => {
  // const teams = useGetTeams(id, key);

  return (
    <Leagues>
      <LeagueTable data={mocks} columns={columns} />
    </Leagues>
  );
};

export default React.memo(League);
