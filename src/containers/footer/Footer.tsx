import React from 'react';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.wrapper}>
        <img src="/images/favicon.png" className={styles.favicon} />
        <span>2024 Scouts Office, Inc.</span>
      </div>
    </section>
  );
};

export default React.memo(Footer);
