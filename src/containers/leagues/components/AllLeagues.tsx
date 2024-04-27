import AllLeaguesTable from '@/uikit/tables/AllLeaguesTable';
import React from 'react';
import Leagues from '../Leagues';

const ENG_IMG = 'https://tmssl.akamaized.net/images/logo/normal/gb1.png?lm=1521104656';
const GER_IMG = 'https://tmssl.akamaized.net/images/logo/normal/l1.png?lm=1525905518';
const SPA_IMG = 'https://tmssl.akamaized.net/images/logo/normal/es1.png?lm=1688466074';
const ITA_IMG = 'https://tmssl.akamaized.net/images/logo/normal/it1.png?lm=1656073460';
const FRA_IMG = 'https://tmssl.akamaized.net/images/logo/normal/fr1.png?lm=1648360140';
const NET_IMG = 'https://tmssl.akamaized.net/images/logo/normal/nl1.png?lm=1674743474';

const leagues = [
  { id: 'GB1', title: 'Premier League', image: ENG_IMG, country: 'england' },
  { id: 'L1', title: 'Bundesliga', image: GER_IMG, country: 'germany' },
  { id: 'ES1', title: 'LaLiga', image: SPA_IMG, country: 'spain' },
  { id: 'IT1', title: 'Serie A', image: ITA_IMG, country: 'italy' },
  { id: 'FR1', title: 'Ligue 1', image: FRA_IMG, country: 'france' },
  { id: 'NL1', title: 'Eredivisie', image: NET_IMG, country: 'netherlands' },
];

const AllLeagues = () => {
  return (
    <Leagues>
      <AllLeaguesTable data={leagues} />
    </Leagues>
  );
};

export default React.memo(AllLeagues);
