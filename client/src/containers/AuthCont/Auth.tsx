import React from 'react';
import styles from './Auth.module.scss';

interface Props {
  children: JSX.Element;
}

const Auth = ({ children }: Props) => {
  return <section className={styles.auth}>{children}</section>;
};

export default React.memo(Auth);
