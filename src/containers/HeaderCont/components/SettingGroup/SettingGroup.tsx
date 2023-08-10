import { useToggleTheme } from '@/hooks/useToggleTheme';
import LangList from '@/uikit/LangList';
import ShortModal from '@/uikit/ShortModal';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SettingGroup.module.scss';

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
          <ShortModal>
            {langs.map((l) => (
              <LangList changeLanguage={changeLanguage} lang={l.lang} text={l.text} key={l.text} />
            ))}
          </ShortModal>
        )}
      </div>
    </div>
  );
};

export default React.memo(SettingGroup);
