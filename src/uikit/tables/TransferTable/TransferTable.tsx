import { IColumn } from '@/common/types/types';
import { ITransfer } from '@/containers/player/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './transferTable.module.scss';

interface Props {
  columns: IColumn[];
  data: ITransfer[];
}

const TransferTable = ({ data, columns }: Props) => {
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
        {data.map(item => (
          <tr key={item.date}>
            <td>{item.season}</td>
            <td>
              <div className={styles.wrap}>
                <img src={item.oldClubImage} alt="logo" />
                <span>{item.oldClubName}</span>
              </div>
            </td>
            <td>
              <div className={styles.wrap}>
                <img src={item.newClubImage} alt="logo" />
                <span>{item.newClubName}</span>
              </div>
            </td>
            {item.loan && <td>loan</td>}
            {!item.loan && (
              <td>
                <div className={styles.costWrap}>
                  {item.feeValue === 'ablöse- frei' && <span>?</span>}
                  {item.feeValue !== 'ablöse- frei' && <span>{item.feeValue}</span>}
                  <span>{item.feeNumeral}</span>
                  <span>{item.feeCurrency}</span>
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(TransferTable);
