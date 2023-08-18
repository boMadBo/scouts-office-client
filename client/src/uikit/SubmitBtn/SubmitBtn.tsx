import React from 'react';
import styles from './SubmitBtn.module.scss';

interface Props {
  text: string;
  disabled: boolean;
}

const SubmitBtn = ({ text, disabled }: Props) => {
  return (
    <button type="submit" disabled={disabled} className={styles.btn}>
      {text}
    </button>
  );
};

export default React.memo(SubmitBtn);
