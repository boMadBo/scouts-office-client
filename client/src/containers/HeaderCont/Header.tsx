<<<<<<< HEAD
<<<<<<< HEAD
import { useAppDispatch, useAppSelector } from '@/hooks';
import { searchFetching } from '@/store/reducers/SearchSlice';
import { fetchDeleteToken } from '@/store/reducers/TokenSlice';
=======
>>>>>>> 8673b67 (add server and start auth)
=======
import { useAppDispatch, useAppSelector } from '@/hooks';
import { searchFetching } from '@/store/reducers/SearchSlice';
import { fetchDeleteToken } from '@/store/reducers/TokenSlice';
>>>>>>> bc9de08 (add styles for auth)
import ChildLink from '@/uikit/ChildLink';
import LongModal from '@/uikit/LongModal/LongModal';
import ParentLink from '@/uikit/ParentLink';
import Cookies from 'js-cookie';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> baf8dd4 (add search)
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
=======
import React, { useState } from 'react';
=======
import React, { useCallback, useState } from 'react';
>>>>>>> bc9de08 (add styles for auth)
import { useTranslation } from 'react-i18next';
>>>>>>> 8673b67 (add server and start auth)
=======
>>>>>>> baf8dd4 (add search)
import styles from './Header.module.scss';
import SettingGroup from './components/SettingGroup';

const routes = [
  { link: 'account', text: 'Account', children: null },
  {
    link: 'leagues',
    text: 'Leagues',
    children: [
      { link: 'all', text: 'All leagues' },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 431f668 (dev leagues)
      { link: 'england/GB1', text: 'England' },
      { link: 'germany/L1', text: 'Germany' },
      { link: 'spain/ES1', text: 'Spain' },
      { link: 'italy/IT1', text: 'Italy' },
      { link: 'france/FR1', text: 'France' },
      { link: 'netherlands/NL1', text: 'Netherlans' },
<<<<<<< HEAD
=======
      { link: 'england', text: 'England' },
      { link: 'germany', text: 'Germany' },
      { link: 'spain', text: 'Spain' },
      { link: 'italy', text: 'Italy' },
      { link: 'france', text: 'France' },
      { link: 'usa', text: 'USA' },
>>>>>>> 8673b67 (add server and start auth)
=======
>>>>>>> 431f668 (dev leagues)
    ],
  },
  { link: 'news', text: 'News', children: null },
  { link: 'videos', text: 'Videos', children: null },
<<<<<<< HEAD
<<<<<<< HEAD
  { link: 'messages', text: 'Messages', children: null },
];

const Header = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const isToken = useAppSelector(state => state.token.isToken);
  const { t } = useTranslation();

  const handleSignOut = useCallback(() => {
    Cookies.remove('token');
    Cookies.remove('userId');
    Cookies.remove('rememberMe');
    dispatch(fetchDeleteToken());
  }, [dispatch]);

  const [query, setQuery] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = useCallback(() => {
    dispatch(searchFetching(query));
    setQuery('');
  }, [query, dispatch]);

=======
=======
  { link: 'messages', text: 'Messages', children: null },
>>>>>>> 11853ed (add mock messages)
];

const Header = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  // const [resQuery, setResQuery] = useState('');

  const dispatch = useAppDispatch();
  const isToken = useAppSelector(state => state.token.isToken);
  const { t } = useTranslation();

  const handleSignOut = useCallback(() => {
    Cookies.remove('token');
    Cookies.remove('rememberMe');
    dispatch(fetchDeleteToken());
  }, [dispatch]);

<<<<<<< HEAD
>>>>>>> 8673b67 (add server and start auth)
=======
  const [query, setQuery] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = useCallback(() => {
    dispatch(searchFetching(query));
    setQuery('');
  }, [query, dispatch]);

>>>>>>> baf8dd4 (add search)
  return (
    <header className={styles.header}>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <img src="/images/logo.png" alt="logo" className={styles.img} />
          <div className={styles.containerGroup}>
            {routes.map(route => (
              <div
                className={styles.routeGroup}
                key={route.link}
                onMouseEnter={() => setIsHovered(route.link)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <ParentLink to={route.link}>{t(route.text)}</ParentLink>
                {isHovered === route.link && route.children && (
                  <LongModal>
                    {route.children.map(child => (
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> baf8dd4 (add search)
          <div className={styles.input_wrap}>
            <form className={styles.form}>
              <input
                type="text"
                className={styles.input}
                placeholder="Who are we looking for?"
                value={query}
                onChange={handleInputChange}
              />
            </form>
            <Link to="search">
              <button className={styles.input_btn} onClick={handleSearch}>
                <AiOutlineSearch className={styles.btnImg} />
              </button>
            </Link>
          </div>
          <SettingGroup />
          {!isToken && <ParentLink to="signin">{t('Sign In')}</ParentLink>}
          {isToken && (
=======
          <SettingGroup />
<<<<<<< HEAD
          {!token && <ParentLink to="signin">{t('Sign In')}</ParentLink>}
          {token && (
>>>>>>> 8673b67 (add server and start auth)
=======
          {!isToken && <ParentLink to="signin">{t('Sign In')}</ParentLink>}
          {isToken && (
>>>>>>> bc9de08 (add styles for auth)
            <ParentLink to="/" onClick={handleSignOut}>
              {t('Sign Out')}
            </ParentLink>
          )}
        </div>
      </section>
    </header>
  );
};

export default React.memo(Header);
