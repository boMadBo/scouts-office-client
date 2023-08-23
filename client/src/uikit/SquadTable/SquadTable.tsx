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
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(SquadTable);
