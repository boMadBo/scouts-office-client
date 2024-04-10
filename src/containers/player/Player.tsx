import { test, testStats, trhist, valueM } from '@/containers/player/mock';
import { useTogglePlayerObservation } from '@/hooks/useTogglePlayerObservation';
import { currencyAPI } from '@/store/services/CurrencyService';
import Loading from '@/uikit/Loading';
import MarketValueChart from '@/uikit/charts/MarketValueChart';
import TransferTable from '@/uikit/tables/TransferTable';
import React, { useCallback, useMemo, useState } from 'react';
import MainPlayerInfo from './MainPlayerInfo';
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
  const { toggleObserve, idObserve } = useTogglePlayerObservation(id);
  const { data: rates } = currencyAPI.useGetBtcAndUsdQuery('');

  // const { data: player } = transfermarktAPI.useGetPlayerQuery(id || '');
  // const { data: valueHistory } = transfermarktAPI.useGetValueHistoryQuery(id || '');
  // const { data: seasons } = transfermarktAPI.useGetSeasonsQuery(id || '');
  // const { data: stats } = transfermarktAPI.useGetStatsQuery({ id: id || '', seasonId: selectedSeason });
  // const { data: transfers } = transfermarktAPI.useGetTransfersQuery(id || '');

  // const transfers = useGetTransfers(id);

  const player = test;
  const valueHistory = valueM;
  const seasons = seasonsM;
  const stats = testStats;
  const isGK = testStats[0].isGoalkeeper;
  const transfers = trhist;

  const usd = useMemo(() => {
    if (player && player.marketValue) {
      return player.marketValueNumeral === 'mil.'
        ? ((Number(player?.marketValue.replace(/,/, '')) * Number(rates?.USD)) / 100).toFixed(2) + ' ' + 'm'
        : ((Number(player?.marketValue.replace(/,/, '')) * Number(rates?.USD)) / 100).toFixed(2) + ' ' + 'k';
    }
  }, [rates, player]);

  const btc = useMemo(() => {
    if (player && player.marketValue) {
      return player.marketValueNumeral === 'mil.'
        ? (Number(player.marketValue.replace(/,/, '')) * Number(rates?.BTC) * 10000).toFixed(1)
        : (Number(player.marketValue.replace(/,/, '')) * Number(rates?.BTC) * 10).toFixed(1);
    }
  }, [rates, player]);

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

  if (!stats || !player || !seasons || !valueHistory || !transfers || !rates) {
    return <Loading />;
  }

  return (
    <section className={styles.player}>
      <div className={styles.containerLeft}>
        <MainPlayerInfo data={player} idObserve={idObserve} currRates={currRates} toggleObserve={toggleObserve} />
        <Wrap>
          <Stats
            isGK={isGK}
            selectedSeason={selectedSeason}
            columnsPL={columnsPL}
            columnsGK={columnsGK}
            season={seasons}
            stats={stats}
            handleSelectedChange={handleSelectedChange}
          />
        </Wrap>
      </div>
      <div className={styles.containerRight}>
        <Wrap>
          <MarketValueChart chartData={valueHistory} />
        </Wrap>
        <Wrap>
          <TransferTable data={transfers} columns={transfColumns} />
        </Wrap>
      </div>
    </section>
  );
};

export default React.memo(Player);
