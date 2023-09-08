import { ISearch } from '@/interfaces/search';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Search.module.scss';

interface Props {
  data: ISearch | undefined;
}

const TablePlayers = ({ data }: Props) => {
  return (
    <table className={styles.tablePl}>
      <tbody className={styles.tbody}>
        {data?.players?.map(item => (
          <tr key={item.id} className={styles.tr}>
            <td>
              <Link to={`/player/${item.id}`} className={styles.link}>
                <div className={styles.wrapTb}>
                  <img src={item.playerImage} alt="logo" className={styles.img} />
                  <span>{item.playerName}</span>
                </div>
              </Link>
            </td>
            <td>{item.club}</td>
            <td>
              <img src={item.nationImage} alt="logo" className={styles.flag} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(TablePlayers);
