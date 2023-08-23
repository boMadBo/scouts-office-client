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
<<<<<<< HEAD
          <tr key={item.id}>
            <td>
              <Link to={`${item.country}/${item.id}`} className={styles.link}>
                <div>
                  <span>{item.title}</span>
                  <img src={item.image} alt={item.title} />
                </div>
              </Link>
            </td>
          </tr>
=======
          <Link to={`${item.country}/${item.id}`} key={item.id} className={styles.link}>
            <tr>
              <td>{item.title}</td>
              <img src={item.image} alt={item.title} />
            </tr>
          </Link>
>>>>>>> 431f668 (dev leagues)
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(AllLeaguesTable);
