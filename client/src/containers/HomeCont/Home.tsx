import MainLink from '@/uikit/MainLink';
import React from 'react';
import styles from './Home.module.scss';

const links = [
  { to: 'registr', text: 'Create a profile' },
  { to: 'signin', text: 'I have account' },
];

const Home = () => {
  return (
    <section className={styles.home}>
      <div className={styles.container}>
        <h2 className={styles.title}>Wellcome to Scouts Academy</h2>
        <div className={styles.linkWrap}>
          {links.map(link => (
            <MainLink key={link.to} to={link.to}>
              {link.text}
            </MainLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Home);
