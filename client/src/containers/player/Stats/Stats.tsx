import { IColumn } from '@/common/types';
import { FinStats, Seasons } from '@/types/player';
import StatsTableGK from '@/uikit/tables/StatsTable/StatsTableGK';
import StatsTablePL from '@/uikit/tables/StatsTable/StatsTablePL';
import React from 'react';
import styles from './stats.module.scss';

interface Props {
  isGK: boolean | null;
  selectedSeason: string;
  columnsPL: IColumn[];
  columnsGK: IColumn[];
  season: Seasons[];
  stats: FinStats[];
  handleSelectedChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Stats = ({ isGK, selectedSeason, columnsPL, columnsGK, season, stats, handleSelectedChange }: Props) => {
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
