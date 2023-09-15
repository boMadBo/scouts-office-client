import React from 'react';
import styles from './Conversations.module.scss';

interface Props {
  interlocutor: string | undefined;
}

const Conversations = ({ interlocutor }: Props) => {
  return (
    <>
      <span className={styles.userName}>{interlocutor}</span>
    </>
  );
};

export default React.memo(Conversations);
