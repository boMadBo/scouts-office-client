import React from 'react';
import styles from './TextField.module.scss';
import { Input } from './styles';

const TField = ({ label, ...props }: any) => {
  return (
    <div className={styles.fieldWrap}>
      <label className={styles.fieldLabel}>{label}</label>
      <Input {...props} placeholder={label} />
    </div>
  );
};

export default React.memo(TField);
