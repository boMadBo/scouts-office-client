import React from 'react';
import styles from './LongModal.module.scss';

interface Props {
  children: JSX.Element[];
}

const LongModal = ({ children }: Props) => {
  return <div className={styles.modal}>{children}</div>;
};

export default React.memo(LongModal);
