import { IColumn } from '@/common/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styles from './observeTable.module.scss';
import { IPlayerObserve } from '@/types/player';

interface Props {
  columns: IColumn[];
  data: IPlayerObserve[] | undefined;
  removeObserve: (id: string | undefined) => void;
}

const ObserveTable = ({ columns, data, removeObserve }: Props) => {
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
              <button className={styles.itemRemove} onClick={() => removeObserve(item._id)} data-testid="remove-btn">
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