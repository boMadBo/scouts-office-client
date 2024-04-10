import { useToggleTheme } from '@/hooks/useToggleTheme';
import ModalListItemsWrap from '@/uikit/ModalListItemsWrap';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './settingGroup.module.scss';

const langs = [
  { lang: 'en', text: 'EN' },
  { lang: 'ru', text: 'RU' },
];

const SettingGroup = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isLightTheme, toggleThemeMode } = useToggleTheme();
  const { t, i18n } = useTranslation();

  const currentLang = useMemo(() => {
    return i18n.language.slice(0, 1).toUpperCase() + i18n.language.slice(1);
  }, [i18n.language]);

  const currentTheme = useMemo(() => {
    return isLightTheme ? t('Light') : t('Dark');
  }, [isLightTheme]);

  const toggleLanguage = () => {
    setModalOpen(!isModalOpen);
  };

  const toggleTheme = () => {
    toggleThemeMode();
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setModalOpen(false);
  };

  return (
    <div className={styles.containerGroup}>
      <div className={styles.setsWrapper} onClick={toggleTheme}>
        <img src="/images/theme.png" alt="thene" className={styles.imgSettings} />
        <span className={styles.currTheme}>{currentTheme}</span>
      </div>
      <div
        className={styles.setsWrapper}
        onMouseEnter={() => setModalOpen(true)}
        onMouseLeave={() => setModalOpen(false)}
        onClick={toggleLanguage}
      >
        <div className={styles.langWrapper}>
          <img src="/images/lang.png" alt="lang" className={styles.imgSettings} />
          <span className={styles.currLang}>{currentLang}</span>
        </div>
        {isModalOpen && (
          <div className={styles.langlistWrap}>
            <ModalListItemsWrap childModal={true}>
              {langs.map(l => (
                <div key={l.text} className={styles.langSelect}>
                  <span onClick={() => changeLanguage(l.lang)}>{l.text}</span>
                </div>
              ))}
            </ModalListItemsWrap>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SettingGroup);
