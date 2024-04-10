import React, { ChangeEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import styles from './formWithIcon.module.scss';

interface Props {
  query: string;
  link?: string;
  placeholder: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearch?: () => void;
  clearSearchQuery?: () => void;
}

const FormWithIcon = ({ query, link = '', placeholder, handleInputChange, handleSearch, clearSearchQuery }: Props) => {
  return (
    <form className={styles.form}>
      <label className={styles.label}>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
        />
      </label>
      <Link to={link}>
        <button className={styles.inputBtn}>
          {(link || !query) && <AiOutlineSearch className={styles.btnImg} onClick={handleSearch} />}
          {query && !link && <TiDeleteOutline className={styles.btnImg} onClick={clearSearchQuery} />}
        </button>
      </Link>
    </form>
  );
};

export default React.memo(FormWithIcon);
