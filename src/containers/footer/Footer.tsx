import React from 'react';
import { RiTelegramLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.company}>
          <img src="/images/favicon.png" className={styles.favicon} />
          <span>2024 Scouts Office, Inc.</span>
        </div>
        <Link to="about" className={styles.link}>
          About
        </Link>
        <Link to="/" className={styles.link}>
          <div className={styles.tg}>
            <RiTelegramLine className={styles.favicon} />
            <span>Telegram</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default React.memo(Footer);
