import { IConversationNames } from '@/interfaces';
import React from 'react';
import styles from './Conversations.module.scss';

interface Props {
  data: IConversationNames;
}

const Conversations = ({ data }: Props) => {
  return (
    <>
      <span className={styles.userName}>{data.sender.senderName}</span>
    </>
  );
};

export default React.memo(Conversations);
