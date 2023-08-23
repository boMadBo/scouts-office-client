<<<<<<< HEAD
import { Columns } from '@/interfaces';
import { FinSquad } from '@/interfaces/squads';
import cn from 'classnames';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CiFilter } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import styles from './SquadTable.module.scss';
dayjs.extend(customParseFormat);
interface Props {
  data: FinSquad[];
  columns: Columns[];
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
=======
import { ISquad } from '@/interfaces';
import React from 'react';
import styles from './SquadTable.module.scss';

interface Props {
  data: ISquad[];
}

const SquadTable = ({ data }: Props) => {
  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        <tr>
          <th>#</th>
          <th>Players</th>
          <th>Age</th>
          <th>Nat.</th>
          <th>Cost</th>
>>>>>>> 431f668 (dev leagues)
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
<<<<<<< HEAD
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
=======
          <tr>
            <td>{item.shirtNumber}</td>
            <td>
              <div className={styles.wrap}>
                <img src={item.image} alt={item.name} className={styles.img} />
                <div className={styles.nameWrap}>
                  <span>{item.name}</span>
                  <span>{item.positions.first.name}</span>
                </div>
              </div>
            </td>
            <td>{item.dateOfBirth}</td>
            <td>
              <div className={styles.imgWrap}>
                <img src={item.nationalities[0].image} className={styles.flagImg} />
              </div>
            </td>
            <td>
              {item.marketValue.value}
              {item.marketValue.currency}
            </td>
>>>>>>> 431f668 (dev leagues)
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(SquadTable);
