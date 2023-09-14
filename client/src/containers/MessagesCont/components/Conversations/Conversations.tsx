<<<<<<< HEAD
<<<<<<< HEAD
import { IConversationNames } from '@/interfaces';
import React from 'react';
import styles from './Conversations.module.scss';

interface Props {
  id: string | undefined;
  // messages: IMessagesNames[];
  data: IConversationNames;
}

const Conversations = ({ data, id }: Props) => {
  const dialogName = data.receiver.id !== id ? data.receiver.receiverName : data.sender.senderName;
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
=======
=======
import { IConversationNames } from '@/interfaces';
>>>>>>> a40623b (add messages logic)
import React from 'react';
import styles from './Conversations.module.scss';

interface Props {
  data: IConversationNames;
}

const Conversations = ({ data }: Props) => {
  return (
<<<<<<< HEAD
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
>>>>>>> 11853ed (add mock messages)
    </div>
=======
    <>
      <span className={styles.userName}>{data.sender.senderName}</span>
    </>
>>>>>>> a40623b (add messages logic)
  );
};

export default React.memo(Conversations);
