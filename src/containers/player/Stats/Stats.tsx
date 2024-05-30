import { IColumn } from '@/common/types/types';
import { ISeason, IStatsResult } from '@/containers/player/types';
import StatsTableGK from '@/uikit/tables/StatsTable/StatsTableGK';
import StatsTablePL from '@/uikit/tables/StatsTable/StatsTablePL';
import React from 'react';
import styles from './stats.module.scss';

interface Props {
  selectedSeason: string;
  columnsPL: IColumn[];
  columnsGK: IColumn[];
  season: ISeason[];
  data: IStatsResult;
  handleSelectedChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Stats = ({ selectedSeason, columnsPL, columnsGK, season, data, handleSelectedChange }: Props) => {
  const { isGK, stats } = data;
  return (
    <>
      <select value={selectedSeason} onChange={handleSelectedChange} className={styles.seasons}>
        {season.map(item => (
          <option key={item.key} value={item.key}>
            {item.title}
          </option>
        ))}
      </select>
      {!isGK && <StatsTablePL data={stats} columns={columnsPL} />}
      {isGK && <StatsTableGK data={stats} columns={columnsGK} />}
    </>
  );
};

export default React.memo(Stats);
