import { Columns, ObservePlayers } from '@/interfaces';
import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { useTranslation } from 'react-i18next';
=======
>>>>>>> ee96416 (add usd,btc, in process observe)
=======
import { useTranslation } from 'react-i18next';
>>>>>>> e49de05 (add all news)
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styles from './Observe.module.scss';

interface Props {
  columns: Columns[];
  data: ObservePlayers[] | undefined;
  removeObserve: (id: string | undefined) => void;
}

const ObserveTable = ({ columns, data, removeObserve }: Props) => {
<<<<<<< HEAD
<<<<<<< HEAD
  const { t } = useTranslation();
=======
>>>>>>> ee96416 (add usd,btc, in process observe)
=======
  const { t } = useTranslation();
>>>>>>> e49de05 (add all news)
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(item => (
<<<<<<< HEAD
<<<<<<< HEAD
            <th key={item.title}>{t(item.title)}</th>
=======
            <th key={item.title}>{item.title}</th>
>>>>>>> ee96416 (add usd,btc, in process observe)
=======
            <th key={item.title}>{t(item.title)}</th>
>>>>>>> e49de05 (add all news)
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map(item => (
          <tr key={item.playerID}>
            <td>
              <Link to={`/player/${item.playerID}`} className={styles.link}>
                <span>{item.playerName}</span>
              </Link>
            </td>
            <td>{item.age}</td>
            <td>{item.position}</td>
            <td>
              <Link to={`/squad/${item.clubId}`} className={styles.link}>
                <span>{item.club}</span>
              </Link>
            </td>
            <td>
              <div className={styles.costWrap}>
                <span>{item.marketValue}</span>
                <span>{item.numeral}</span>
                <span>{item.currency}</span>
              </div>
            </td>
            <td>{item.agent}</td>
            <td>
              <button className={styles.itemRemove} onClick={() => removeObserve(item._id)}>
                <MdDeleteOutline className={styles.btnImg} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(ObserveTable);
