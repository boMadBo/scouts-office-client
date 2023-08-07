import React from 'react';
import styles from './LangList.module.scss';

interface Props {
  text: string;
  changeLanguage: (lang: string) => void;
  lang: string;
}

const LangList = ({ text, changeLanguage, lang }: Props) => {
  return (
    <div className={styles.langSelect}>
      <span onClick={() => changeLanguage(lang)}>{text}</span>
    </div>
  );
};

export default React.memo(LangList);
