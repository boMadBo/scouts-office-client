import { ISearch } from '@/containers/search/search';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './clubsTable.module.scss';

interface Props {
  data: ISearch | undefined;
}

const ClubsTable = ({ data }: Props) => {
  return (
    <table className={styles.tableCl}>
      <tbody className={styles.tbody}>
        {data?.clubs?.map(item => (
          <tr key={item.id} className={styles.tr}>
            <td>
              <Link to={`/squad/${item.id}`} className={styles.link}>
                <div className={styles.wrapTb}>
                  <img src={item.logoImage} alt="logo" className={styles.img} />
                  <span>{item.name}</span>
                </div>
              </Link>
            </td>
            <td>{item.competitionName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(ClubsTable);
