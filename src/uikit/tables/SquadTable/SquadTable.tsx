import { IColumn } from '@/common/types';

import { ISquad } from '@/containers/leagues/types';
import cn from 'classnames';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CiFilter } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import styles from './squadTable.module.scss';
dayjs.extend(customParseFormat);
interface Props {
  data: ISquad[];
  columns: IColumn[];
  handleSort: (key: string) => void;
}

const SquadTable = ({ data, columns, handleSort }: Props) => {
  const { t } = useTranslation();
  const cellColor = useMemo(
    () => (positionGroup: string) => {
      return cn({
        [styles.gkCell]: positionGroup === 'Goalkeeper',
        [styles.dfCell]: positionGroup === 'Defence',
        [styles.mfCell]: positionGroup === 'Midfield',
        [styles.atCell]: positionGroup === 'Attack',
      });
    },
    []
  );

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.title}>
              <span>{t(col.title)}</span>
              <CiFilter className={styles.filter} onClick={() => handleSort(col.title)} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td className={`${styles.sSize} ${cellColor(item.positionGroup)}`}>{item.shirtNumber}</td>
            <td>
              <Link to={`/player/${item.id}`} className={styles.link}>
                <div className={styles.wrap}>
                  <img src={item.image} alt={item.name} className={styles.img} />
                  <div className={styles.nameWrap}>
                    <span>{item.name}</span>
                    <span className={styles.position}>{item.positionFull}</span>
                  </div>
                </div>
              </Link>
            </td>
            <td className={styles.lSize}>
              <div className={styles.dateWrap}>
                <span>{item.dateOfBirth}</span>
                <span>({item.age})</span>
              </div>
            </td>
            <td className={styles.sSize}>
              <div className={styles.imgWrap}>
                <div className={styles.flagBr}>
                  <img src={item.flag} className={styles.flagImg} />
                </div>
              </div>
            </td>
            <td className={styles.mSize}>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(SquadTable);
