import { IConversationName, IMessageName } from '@/containers/conversations/types';
import React, { useMemo } from 'react';
import styles from './conversationsList.module.scss';

interface Props {
  id: string | undefined;
  data: IConversationName;
  messages: IMessageName[];
}

const ConversationsList = ({ data, id, messages }: Props) => {
  const conversationName = data.receiver.id !== id ? data.receiver.receiverName : data.sender.senderName;
  const unreadCount = useMemo(
    () => messages?.filter(item => !item.isReaded && item.conversationId === data._id && item.sender !== id).length,
    [messages, data]
  );

  return (
    <div className={styles.userNameWrap}>
      <span className={styles.userName}>{conversationName}</span>
      {unreadCount > 0 && <div className={styles.unreadCount}>{unreadCount}</div>}
    </div>
  );
};

export default React.memo(ConversationsList);
