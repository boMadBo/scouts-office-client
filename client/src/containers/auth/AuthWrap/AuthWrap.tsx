import React from 'react';
import styles from './authWrap.module.scss';

interface Props {
  children: JSX.Element;
}

const AuthWrap = ({ children }: Props) => {
  return <section className={styles.auth}>{children}</section>;
};

export default React.memo(AuthWrap);
