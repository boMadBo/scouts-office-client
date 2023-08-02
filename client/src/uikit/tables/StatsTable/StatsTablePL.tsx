import { IColumn } from '@/common/types';
import { FinStats } from '@/types/player';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './statsTable.module.scss';

interface Props {
  columns: IColumn[];
  data: FinStats[];
}

const StatsTablePL = ({ data, columns }: Props) => {
  const { t } = useTranslation();
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(item => (
            <th key={item.title}>{t(item.title)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.compId}>
            <td>
              <div className={styles.wrap}>
                <img src={item.compImage} alt="logo" />
                <span className={styles.compName}>{item.compName}</span>
              </div>
            </td>
            <td>{item.matches}</td>
            <td>{item.minutesPlayed}</td>
            <td>{item.goals}</td>
            <td>{item.penaltyGoals}</td>
            <td>{item.assists}</td>
            <td>{item.yellowCards}</td>
            <td>{item.redCards}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(StatsTablePL);
