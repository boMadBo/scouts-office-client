<<<<<<< HEAD
<<<<<<< HEAD
import { Columns, Team } from '@/interfaces';
import React from 'react';
import { useTranslation } from 'react-i18next';
<<<<<<< HEAD
=======
import { Team } from '@/interfaces';
=======
import { Columns, Team } from '@/interfaces';
>>>>>>> dfd4232 (create squad page)
import React from 'react';
>>>>>>> 431f668 (dev leagues)
=======
>>>>>>> 59a9c38 (edit players profile)
import { Link } from 'react-router-dom';
import styles from './LeagueTable.module.scss';

interface Props {
  data: Team[];
<<<<<<< HEAD
<<<<<<< HEAD
  columns: Columns[];
}

const LeagueTable = ({ data, columns }: Props) => {
  const { t } = useTranslation();
<<<<<<< HEAD

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.title}>{t(col.title)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={item.id}>
            <td className={styles.sSize}>{index + 1}</td>
            <td>
              <Link to={`/squad/${item.id}`} className={styles.link}>
=======
=======
  columns: Columns[];
>>>>>>> dfd4232 (create squad page)
}

const LeagueTable = ({ data, columns }: Props) => {
=======
>>>>>>> 59a9c38 (edit players profile)
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.title}>{t(col.title)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map(item => (
          <tr key={item.id}>
            <td className={styles.sSize}>{item.rank}</td>
            <td>
              <Link to={item.id} className={styles.link}>
>>>>>>> 431f668 (dev leagues)
                <div className={styles.wrap}>
                  <img src={item.clubImage} alt={item.clubImage} />
                  <span>{item.clubName}</span>
                </div>
              </Link>
            </td>
            <td className={styles.mSize}>{item.matches}</td>
            <td className={styles.sSize}>{item.wins}</td>
            <td className={styles.sSize}>{item.draw}</td>
            <td className={styles.sSize}>{item.losses}</td>
            <td className={styles.lSize}>
              {item.goals}:{item.goalsConceded}
            </td>
            <td className={styles.mSize}>{item.goalDifference}</td>
            <td className={styles.lSize}>{item.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(LeagueTable);
