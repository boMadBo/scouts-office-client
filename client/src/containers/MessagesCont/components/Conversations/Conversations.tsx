import { IConversationNames } from '@/interfaces';
import React from 'react';
import styles from './Conversations.module.scss';

interface Props {
  data: IConversationNames;
  id: string | undefined;
}

const Conversations = ({ data, id }: Props) => {
  const dialogName = data.receiver.id !== id ? data.receiver.receiverName : data.sender.senderName;

  return (
    <>
      <span className={styles.userName}>{dialogName}</span>
    </>
  );
};

export default React.memo(Conversations);
