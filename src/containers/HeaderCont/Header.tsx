import ChildLink from '@/uikit/ChildLink';
import LongModal from '@/uikit/LongModal/LongModal';
import ParentLink from '@/uikit/ParentLink';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';
import SettingGroup from './components/SettingGroup';

const routes = [
  { link: 'account', text: 'Account', children: null },
  {
    link: 'leagues',
    text: 'Leagues',
    children: [
      { link: 'all-leagues', text: 'All leagues' },
      { link: 'england', text: 'England' },
      { link: 'germany', text: 'Germany' },
      { link: 'spain', text: 'Spain' },
      { link: 'italy', text: 'Italy' },
      { link: 'france', text: 'France' },
      { link: 'usa', text: 'USA' },
    ],
  },
  { link: 'news', text: 'News', children: null },
  { link: 'videos', text: 'Videos', children: null },
];

const Header = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <header className={styles.header}>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <img src="./images/favicon.png" alt="logo" className={styles.img} />
          <div className={styles.containerGroup}>
            {routes.map((route) => (
              <div
                className={styles.routeGroup}
                key={route.link}
                onMouseEnter={() => setIsHovered(route.link)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <ParentLink to={route.link} isHovered={isHovered === route.link}>
                  {t(route.text)}
                </ParentLink>
                {isHovered === route.link && route.children && (
                  <LongModal>
                    {route.children.map((child) => (
                      <ChildLink key={child.link} to={`${route.link}/${child.link}`} onClick={() => setIsHovered(null)}>
                        {t(child.text)}
                      </ChildLink>
                    ))}
                  </LongModal>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.container}>
          <SettingGroup />
          <ParentLink to="signin">{t('Sign In')}</ParentLink>
        </div>
      </section>
    </header>
  );
};

export default React.memo(Header);
