import { IConversationNames } from '@/interfaces';
import React from 'react';
import styles from './Conversations.module.scss';

interface Props {
<<<<<<< HEAD
  id: string | undefined;
  // messages: IMessagesNames[];
  data: IConversationNames;
=======
  data: IConversationNames;
  id: string | undefined;
>>>>>>> main
}

const Conversations = ({ data, id }: Props) => {
  const dialogName = data.receiver.id !== id ? data.receiver.receiverName : data.sender.senderName;
<<<<<<< HEAD
  // const unreadCount = useMemo(
  //   () => messages?.filter(item => !item.isReaded && item.conversationId === data._id).length,
  //   [messages, data]
  // );

  const reciever = data.sender.id !== id ? data.sender.id : null;

  // useEffect(() => {
  //   console.log('unreadCount', unreadCount);
  // }, [data]);

  return (
    <div className={styles.userNameWrap}>
      <span className={styles.userName}>{dialogName}</span>
      {/* {unreadCount > 0 && <span>{unreadCount}</span>}
      {messages.filter(item => item.conversationId === data._id).at(-1)?.text} */}
    </div>
=======

  return (
    <>
      <span className={styles.userName}>{dialogName}</span>
    </>
>>>>>>> main
  );
};

export default React.memo(Conversations);
