import React from 'react';
import styles from './LanguageModal.module.scss';

interface Props {
  text: string;
  changeLanguage: (lang: string) => void;
  lang: string;
}

const LanguageModal = ({ text, changeLanguage, lang }: Props) => {
  return (
    <div className={styles.langSelect}>
      <span onClick={() => changeLanguage(lang)}>{text}</span>
    </div>
  );
};

export default React.memo(LanguageModal);
