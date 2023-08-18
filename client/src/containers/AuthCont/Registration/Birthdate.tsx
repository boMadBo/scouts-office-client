import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Registration.module.scss';

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Birthdate = ({ value, onChange }: Props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.dateWrap}>
      <span className={styles.dateText}>{t('Your birthday')}</span>
      <div className={styles.dateGroup}>
        <input
          type="date"
          id="start"
          name="trip-start"
          value={value}
          min="1950-01-01"
          max="2012-12-31"
          onChange={onChange}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default React.memo(Birthdate);
