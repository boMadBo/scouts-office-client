import { useAppDispatch, useAppSelector } from '@/hooks';
import { searchFetching } from '@/store/reducers/SearchSlice';
import { fetchDeleteToken } from '@/store/reducers/TokenSlice';
import OpeningList from '@/uikit/OpeningList';
import Push from '@/containers/conversations/Push';
import ChildLink from '@/uikit/links/ChildLink';
import ParentLink from '@/uikit/links/ParentLink';
import Cookies from 'js-cookie';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdMenu } from 'react-icons/io';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import SettingGroup from './SettingGroup';

const routes = [
  { link: 'account', text: 'Account', children: null, addition: false },
  {
    link: 'leagues',
    text: 'Leagues',
    children: [
      { link: 'all', text: 'All leagues' },
      { link: 'england/GB1', text: 'England' },
      { link: 'germany/L1', text: 'Germany' },
      { link: 'spain/ES1', text: 'Spain' },
      { link: 'italy/IT1', text: 'Italy' },
      { link: 'france/FR1', text: 'France' },
      { link: 'netherlands/NL1', text: 'Netherlans' },
    ],
    addition: false,
  },
  { link: 'news', text: 'News', children: null, addition: false },
  { link: 'videos', text: 'Videos', children: null, addition: false },
  { link: 'messages', text: 'Messages', children: null, addition: true },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const isToken = useAppSelector(state => state.token.isToken);
  const unreadMessages = useAppSelector(state => state.unreadMessages);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [burgerOpen, setBurgerOpen] = useState(false);
  const { t } = useTranslation();



  const handleSignOut = useCallback(() => {
    Cookies.remove('token');
    Cookies.remove('userId');
    Cookies.remove('rememberMe');
    dispatch(fetchDeleteToken());
  }, [dispatch]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = useCallback(() => {
    dispatch(searchFetching(query));
    setQuery('');
  }, [query, dispatch]);

  return (
    <header className={styles.header}>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <img src="/images/logo.png" alt="logo" className={styles.img} />
          <IoMdMenu className={styles.menuBurger} onClick={() => setBurgerOpen(!burgerOpen)} />
          {burgerOpen && (
             <div className={styles.childlistWrap}>
              <OpeningList childModal={false}>
                {routes.map(route => (
                  <ChildLink key={route.link} to={route.link} onClick={() => setBurgerOpen(false)}>
                    {t(route.text)}
                  </ChildLink>
                ))}
              </OpeningList>
            </div>
          )}
          <div className={styles.containerGroup}>
            {routes.map(route => (
              <div
                className={styles.routeGroup}
                key={route.link}
                onMouseEnter={() => setIsHovered(route.link)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <ParentLink to={route.link}>{t(route.text)}</ParentLink>
                {route.addition && unreadMessages.count > 0 && <div className={styles.unRead}>{unreadMessages.count}</div>}
                {isHovered === route.link && route.children && (
                  <div className={styles.childlistWrap}>
                    <OpeningList childModal={false}>
                      {route.children.map(child => (
                        <ChildLink key={child.link} to={`${route.link}/${child.link}`} onClick={() => setIsHovered(null)}>
                          {t(child.text)}
                        </ChildLink>
                      ))}
                    </OpeningList>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.container}>
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
            <ParentLink to="/" onClick={handleSignOut}>
              {t('Sign Out')}
            </ParentLink>
          )}
        </div>
        <Push />
      </section>
    </header>
  );
};

export default React.memo(Header);
