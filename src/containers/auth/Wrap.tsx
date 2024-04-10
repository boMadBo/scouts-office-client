import React from 'react';
import styles from './auth.module.scss';

interface Props {
  children: JSX.Element;
}

const AuthWrap = ({ children }: Props) => {
  return <section className={styles.auth}>{children}</section>;
};

export default React.memo(AuthWrap);
