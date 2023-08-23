import { Competition } from '@/interfaces';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AllLeaguesTable.module.scss';

interface Props {
  data: Competition[];
}

const AllLeaguesTable = ({ data }: Props) => {
  return (
    <table className={styles.table}>
      <tbody>
        {data?.map(item => (
          <Link to={`${item.country}/${item.id}`} key={item.id} className={styles.link}>
            <tr>
              <td>{item.title}</td>
              <img src={item.image} alt={item.title} />
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(AllLeaguesTable);
