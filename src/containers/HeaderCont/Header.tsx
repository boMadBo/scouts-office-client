import CustomLink from '@/uikit/CustomLink';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';
import SettingGroup from './components/SettingGroup';

const routes = [
  { link: '', text: 'Observation' },
  { link: 'leagues', text: 'Leagues' },
  { link: 'news', text: 'News' },
  { link: 'videos', text: 'Videos' },
];

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <img src="./images/favicon.png" alt="logo" className={styles.img} />
          <div className={styles.containerGroup}>
            {routes.map((route) => (
              <CustomLink to={`/${route.link}`} key={route.link}>
                {t(route.text)}
              </CustomLink>
            ))}
          </div>
        </div>
        <div className={styles.container}>
          <SettingGroup />
          <CustomLink to="/signin">{t('Sign In')}</CustomLink>
        </div>
      </section>
    </header>
  );
};

export default Header;
