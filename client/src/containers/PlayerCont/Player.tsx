import StatsTableGK from '@/uikit/StatsTable/StatsTableGK';
import StatsTablePL from '@/uikit/StatsTable/StatsTablePL';
import React from 'react';
import styles from './Player.module.scss';
import ProfileInfo from './components/ProfileInfo';

interface Props {
  id: string | undefined;
}

const key = process.env.REACT_APP_TRANSFERMARKT ?? 'DEFAULT_KEY';

const test = {
  playerID: '3333',
  playerImage: 'https://img.a.transfermarkt.technology/portrait/medium/3333-1662621121.jpg?lm=1',
  playerName: 'Trent Alexander-Arnold',
  dateOfBirth: 'Jan 4, 1986',
  playerShirtNumber: '6',
  age: '37',
  height: '1,75',
  foot: 'right',
  country: 'England',
  countryImage: 'https://tmssl.akamaized.net/images/flagge/verysmall/189.png?lm=1520611569',
  internationalGames: '61',
  internationalGoals: '1',
  league: 'Premier League',
  leagueLogo: 'https://tmssl.akamaized.net/images/logo/normal/gb1.png?lm=1521104656',
  clubImage: 'https://tmssl.akamaized.net/images/wappen/medium/1237.png?lm=1492718902',
  club: 'Brighton & Hove Albion',
  loanUntil: 'Jun 30, 2024',
  LoanOwnerName: 'Chelsea FC',
  ownerImage: 'https://tmssl.akamaized.net/images/wappen/medium/631.png?lm=1682435911',
  contractExpiryDate: 'Jun 30, 2024',
  agent: 'Sports360 GmbH',
  agentId: '199',
  playerMainPosition: 'Central Midfield',
  playerSecondPosition: 'Left Midfield',
  playerThirdPosition: 'Right Midfield',
  marketValue: '127,50',
  marketValueNumeral: 'm',
  marketValueCurrency: '€',
  injuryTitle: 'Hamstring Injury',
  injuryUntil: 'Jan 4, 2024',
};

const testStats = [
  {
    compId: 'NL1',
    compName: 'Eredivisie',
    compImage: 'https://tmssl.akamaized.net/images/logo/normal/nl1.png?lm=1629726381',
    yellowCards: '3',
    redCards: '0',
    minutesPlayed: 1435,
    penaltyGoals: '0',
    minutesPerGoal: 717.5,
    matches: '19',
    goals: '2',
    assists: '2',
    toNil: 8,
    concededGoals: 4,
    isGoalkeeper: null,
  },
  {
    compId: 'CGB',
    compName: 'EFL Cup',
    compImage: 'https://tmssl.akamaized.net/images/logo/normal/cgb.png?lm=1566937342',
    yellowCards: '6',
    redCards: '0',
    minutesPlayed: 1435,
    penaltyGoals: '0',
    minutesPerGoal: 717.5,
    matches: '8',
    goals: '4',
    assists: '2',
    toNil: 4,
    concededGoals: 2,
    isGoalkeeper: true,
  },
];

const columnsPL = [
  { title: 'Competitions' },
  { title: 'Matches' },
  { title: 'Minutes' },
  { title: 'Goals' },
  { title: 'Penalty' },
  { title: 'Assists' },
  { title: 'Yell cards' },
  { title: 'Red cards' },
];

const columnsGK = [
  { title: 'Competitions' },
  { title: 'Matches' },
  { title: 'Minutes' },
  { title: 'Conceded' },
  { title: 'Nil' },
  { title: 'Yell cards' },
  { title: 'Red cards' },
];

const Player = ({ id }: Props) => {
  // const player = useGetPlayer(id, key);
  // const {result: stats, isGK} = useGetStats(id, key);
  const isGK = testStats[0].isGoalkeeper;

  return (
    <section className={styles.player}>
      <div className={styles.container}>
        <ProfileInfo data={test} />
        <section className={styles.stats}>
          <div className={styles.statsContainer}>
            {!isGK && <StatsTablePL data={testStats} columns={columnsPL} />}
            {isGK && <StatsTableGK data={testStats} columns={columnsGK} />}
          </div>
        </section>
      </div>
      <div>
        <div style={{ backgroundColor: 'blue', width: '430px', height: '300px' }}>
          <div>Value history</div>
        </div>
        <div style={{ backgroundColor: 'orange', width: '430px', height: '300px' }}>Transfer History</div>
      </div>
    </section>
  );
};

export default React.memo(Player);
