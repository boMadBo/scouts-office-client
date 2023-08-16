import React from 'react';
import styles from './ShortModal.module.scss';

interface Props {
  children: JSX.Element[];
}

const ShortModal = ({ children }: Props) => {
  return <div className={styles.modal}>{children}</div>;
};

export default React.memo(ShortModal);
