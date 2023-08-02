import React from 'react';
import styles from './button.module.scss';

interface Props {
  text: string;
  disabled: boolean;
}

const Button = ({ text, disabled }: Props) => {
  return (
    <button type="submit" disabled={disabled} className={styles.btn}>
      {text}
    </button>
  );
};

export default React.memo(Button);
