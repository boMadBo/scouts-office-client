<<<<<<< HEAD
import { useGetUsdBtc } from '@/hooks/useGetUsdBtc';
import Loading from '@/uikit/Loading';
import TransfTable from '@/uikit/TransfTable/TransfTable';
import ValueChart from '@/uikit/ValueChart';
import React, { useCallback, useMemo, useState } from 'react';
import styles from './Player.module.scss';
import Wrap from './Wrap';
import ProfileInfo from './components/ProfileInfo';
import Stats from './components/Stats';
import { useToggleObserve } from './useToggleObserve';
=======
import StatsTableGK from '@/uikit/StatsTable/StatsTableGK';
import StatsTablePL from '@/uikit/StatsTable/StatsTablePL';
import React from 'react';
import styles from './Player.module.scss';
import ProfileInfo from './components/ProfileInfo';
>>>>>>> 59a9c38 (edit players profile)

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

<<<<<<< HEAD
const seasonsM = [
  { key: '2023', title: '23/24' },
  { key: '2022', title: '22/23' },
  { key: '2021', title: '21/22' },
];

const valueM = [
  {
    date: '20 Jun 2023',
    age: '23',
    marketValue: '17,00',
    mValueUnform: 17000000,
    mValueCurr: '€',
    mValueNum: 'm',
    clubName: 'Newcastle United',
  },
  {
    date: '03 Nov 2022',
    age: '23',
    marketValue: '30,00',
    mValueUnform: 30000000,
    mValueCurr: '€',
    mValueNum: 'm',
    clubName: 'Newcastle United',
  },
  {
    date: '15 Sep 2022',
    age: '23',
    marketValue: '25,00',
    mValueUnform: 25000000,
    mValueCurr: '€',
    mValueNum: 'm',
    clubName: 'Newcastle United',
  },
  {
    date: '15 Mar 2022',
    age: '23',
    marketValue: '47,00',
    mValueUnform: 47000000,
    mValueCurr: '€',
    mValueNum: 'm',
    clubName: 'Newcastle United',
  },
];

const trhist = [
  {
    playerID: '340329',
    oldClubID: '9249',
    oldClubName: 'Arsenal U23',
    oldClubImage: 'https://tmssl.akamaized.net/images/wappen/medium/9249.png?lm=1489787850',
    newClubID: '11',
    newClubName: 'Arsenal',
    newClubImage: 'https://tmssl.akamaized.net/images/wappen/medium/11.png?lm=1489787850',
    feeValue: '17,00',
    feeCurrency: '€',
    feeNumeral: 'm',
    loan: '',
    date: 'Jul 1, 2019',
    season: '19/20',
  },
  {
    playerID: '340329',
    oldClubID: '11',
    oldClubName: 'Arsenal',
    oldClubImage: 'https://tmssl.akamaized.net/images/wappen/medium/11.png?lm=1489787850',
    newClubID: '762',
    newClubName: 'Newcastle',
    newClubImage: 'https://tmssl.akamaized.net/images/wappen/medium/762.png?lm=1472921161',
    feeValue: '?',
    feeCurrency: '',
    feeNumeral: '',
    loan: 'ist',
    date: 'Feb 1, 2021',
    season: '20/21',
  },
];

const transfColumns = [{ title: 'Season' }, { title: 'From' }, { title: 'To' }, { title: 'Cost' }];

const Player = ({ id }: Props) => {
  const [selectedSeason, setSelectedSeason] = useState<string>('');

  // const player = useGetPlayer(id, key);
  // const { result: stats, isGK } = useGetStats(id, key, selectedSeason);
  const isGK = testStats[0].isGoalkeeper;
  // const seasons = useGetSeasons(id, key);
  // const value = useGetValue(id, key);
  // const transfers = useGetTransfers(id, key);
  const rates = useGetUsdBtc();
  const { toggleObserve, idObserve } = useToggleObserve(id);

  const usd = useMemo(() => {
    return test.marketValueNumeral === 'm'
      ? ((Number(test.marketValue.replace(/,/, '')) * Number(rates.USD)) / 100).toFixed(2) + ' ' + 'm'
      : ((Number(test.marketValue.replace(/,/, '')) * Number(rates.USD)) / 100).toFixed(2) + ' ' + 'k';
  }, [rates]);

  const btc = useMemo(() => {
    return test.marketValueNumeral === 'm'
      ? (Number(test.marketValue.replace(/,/, '')) * Number(rates.BTC) * 10000).toFixed(1)
      : (Number(test.marketValue.replace(/,/, '')) * Number(rates.BTC) * 10).toFixed(1);
  }, [rates]);

  const currRates = [
    { title: 'Value in USD:', value: usd },
    { title: 'Value in BTC:', value: btc },
  ];

  const handleSelectedChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSeason(event.target.value);
    },
    [setSelectedSeason]
  );

  if (testStats.length < 1 || !test || seasonsM.length < 1 || valueM.length < 1 || trhist.length < 1 || !rates) {
    return <Loading />;
  }

  return (
    <section className={styles.player}>
      <div className={styles.containerLeft}>
        <ProfileInfo data={test} idObserve={idObserve} currRates={currRates} toggleObserve={toggleObserve} />
        <Wrap>
          <Stats
            isGK={isGK}
            selectedSeason={selectedSeason}
            columnsPL={columnsPL}
            columnsGK={columnsGK}
            season={seasonsM}
            stats={testStats}
            handleSelectedChange={handleSelectedChange}
          />
        </Wrap>
      </div>
      <div className={styles.containerRight}>
        <Wrap>
          <ValueChart chartData={valueM} />
        </Wrap>
        <Wrap>
          <TransfTable data={trhist} columns={transfColumns} />
        </Wrap>
=======
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
>>>>>>> 59a9c38 (edit players profile)
      </div>
    </section>
  );
};

export default React.memo(Player);
