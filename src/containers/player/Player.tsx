import { test, testStats, trhist, valueM } from '@/containers/player/mock';
import { useGetUsdBtc } from '@/hooks/useGetUsdBtc';
import { useTogglePlayerObservation } from '@/hooks/useTogglePlayerObservation';
import Loading from '@/uikit/Loading';
import ValueChart from '@/uikit/charts/ValueChart';
import TransferTable from '@/uikit/tables/TransferTable';
import React, { useCallback, useMemo, useState } from 'react';
import PlayerProfile from './PlayerProfile';
import Stats from './Stats';
import Wrap from './Wrap';
import styles from './player.module.scss';

interface Props {
  id: string | undefined;
}


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

const seasonsM = [
  { key: '2023', title: '23/24' },
  { key: '2022', title: '22/23' },
  { key: '2021', title: '21/22' },
];



const transfColumns = [{ title: 'Season' }, { title: 'From' }, { title: 'To' }, { title: 'Cost' }];

const Player = ({ id }: Props) => {
  const [selectedSeason, setSelectedSeason] = useState<string>('');

  // const player = useGetPlayer(id);
  // const { result: stats, isGK } = useGetStats(id, selectedSeason);
  const isGK = testStats[0].isGoalkeeper;
  // const seasons = useGetSeasons(id);
  // const value = useGetValue(id);
  // const transfers = useGetTransfers(id);
  const rates = useGetUsdBtc();
  const { toggleObserve, idObserve } = useTogglePlayerObservation(id);

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
        <PlayerProfile data={test} idObserve={idObserve} currRates={currRates} toggleObserve={toggleObserve} />
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
          <TransferTable data={trhist} columns={transfColumns} />
        </Wrap>
      </div>
    </section>
  );
};

export default React.memo(Player);
