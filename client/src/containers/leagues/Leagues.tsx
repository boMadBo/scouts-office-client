import React from 'react';
import styles from './leagues.module.scss';

interface Props {
  children: JSX.Element;
}

const Leagues = ({ children }: Props) => {
  return (
    <section className={styles.leagues}>
      <div className={styles.container}>{children}</div>
    </section>
  );
};

export default React.memo(Leagues);
