import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styles from './Conversations.module.scss';

interface Convs {
  id: number;
  name: string;
}

interface Props {
  data: Convs[];
}

const Conversations = ({ data }: Props) => {
  return (
    <div className={styles.conversationsWrap}>
      <div className={styles.input_wrap}>
        <form className={styles.form}>
          <input
            type="text"
            className={styles.input}
            placeholder="Search dialog"
            // value={query}
            // onChange={handleInputChange}
          />
        </form>
        <button
          className={styles.input_btn}
          //  onClick={handleSearch}
        >
          <AiOutlineSearch className={styles.btnImg} />
        </button>
      </div>
      <div className={styles.conversations}>
        {data.map(item => (
          <div key={item.id} className={styles.users}>
            <span className={styles.userName}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Conversations);
