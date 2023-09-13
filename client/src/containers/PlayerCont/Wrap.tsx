import React from 'react';
import styles from './Player.module.scss';

interface Props {
  children: JSX.Element;
}

const Wrap = ({ children }: Props) => {
  return (
    <section className={styles.firstContainer}>
      <div className={styles.secondContainer}>{children}</div>
    </section>
  );
};

export default React.memo(Wrap);
