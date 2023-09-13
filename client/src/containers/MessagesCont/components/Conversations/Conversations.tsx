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
>>>>>>> 11853ed (add mock messages)
    </div>
  );
};

export default React.memo(Conversations);
