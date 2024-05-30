import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks';
import { useWebsocketMessagesData } from '@/context/wsMessagesDataStorage';
import { deleteRememberMe } from '@/store/reducers/RememberMeSlice';
import { searchFetching } from '@/store/reducers/SearchSlice';
import { profileAPI } from '@/store/services/ProfileService';
import ModalListItemsWrap from '@/uikit/ModalListItemsWrap';
import Notification from '@/uikit/Notification';
import FormWithIcon from '@/uikit/forms/FormWithIcon';
import ChildLink from '@/uikit/links/ChildLink';
import ParentLink from '@/uikit/links/ParentLink';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdMenu } from 'react-icons/io';
import SettingGroup from './SettingGroup';
import styles from './header.module.scss';

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
  { link: 'messages', text: 'Messages', children: null, addition: true },
];

const Header = () => {
  const isRememberMe = useAppSelector(state => state.rememberMe.isRememberMe);
  const { unreadMessages, notification } = useWebsocketMessagesData();
  const [signOut] = profileAPI.useSignOutMutation();
  const dispatch = useAppDispatch();

  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [showPush, setShowPush] = useState(false);
  const { t } = useTranslation();

  const handleSignOut = useCallback(() => {
    signOut();
    window.dispatchEvent(new CustomEvent('tokenRefreshed', { detail: '' }));
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('refreshToken');
    dispatch(deleteRememberMe());
  }, [dispatch]);

  useEffect(() => {
    setUnreadCount(unreadMessages.length);
  }, [unreadMessages]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = useCallback(() => {
    dispatch(searchFetching(query));
    setQuery('');
  }, [query, dispatch]);

  useEffect(() => {
    if (notification) {
      setShowPush(true);
      const timeout = setTimeout(() => {
        setShowPush(false);
      }, 8000);
      return () => clearTimeout(timeout);
    }
  }, [notification]);

  return (
    <header className={styles.header}>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <img src="/images/logo.png" alt="logo" className={styles.img} />
          <IoMdMenu className={styles.menuBurger} onClick={() => setBurgerOpen(!burgerOpen)} />
          {burgerOpen && (
            <div className={styles.childlistWrap}>
              <ModalListItemsWrap childModal={false}>
                {routes.map(route => (
                  <ChildLink key={route.link} to={route.link} onClick={() => setBurgerOpen(false)}>
                    {t(route.text)}
                  </ChildLink>
                ))}
              </ModalListItemsWrap>
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
                {route.addition && unreadCount > 0 && <div className={styles.unRead}>{unreadCount}</div>}
                {isHovered === route.link && route.children && (
                  <div className={styles.childlistWrap}>
                    <ModalListItemsWrap childModal={false}>
                      {route.children.map(child => (
                        <ChildLink
                          key={child.link}
                          to={`${route.link}/${child.link}`}
                          onClick={() => setIsHovered(null)}
                        >
                          {t(child.text)}
                        </ChildLink>
                      ))}
                    </ModalListItemsWrap>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.container}>
          <FormWithIcon
            query={query}
            link="search"
            placeholder="Who are we looking for?"
            handleInputChange={handleInputChange}
            handleSearch={handleSearch}
          />
          <SettingGroup />
          {!isRememberMe && <ParentLink to="signin">{t('Sign In')}</ParentLink>}
          {isRememberMe && (
            <ParentLink to="/" onClick={handleSignOut}>
              {t('Sign Out')}
            </ParentLink>
          )}
        </div>
        {showPush && <Notification notification={notification} />}
      </section>
    </header>
  );
};

export default React.memo(Header);
