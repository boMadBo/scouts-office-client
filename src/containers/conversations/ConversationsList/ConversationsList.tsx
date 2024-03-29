import { IConversation } from '@/containers/conversations/types';
import React from 'react';
import styles from './conversationsList.module.scss';

interface Props {
  data: IConversation;
  getUnreadCount: () => number;
}

const ConversationsList = ({ data, getUnreadCount }: Props) => {
  const unreadCount = getUnreadCount();

  return (
    <div className={styles.userNameWrap}>
      <span className={styles.userName}>{data.interlocutor.name}</span>
      {unreadCount > 0 && <div className={styles.unreadCount}>{unreadCount}</div>}
    </div>
  );
};

export default React.memo(ConversationsList);
