import { IConversationNames, IMessagesNames } from '@/interfaces';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Navigate } from 'react-router-dom';
import styles from './Messages.module.scss';
import Conversations from './components/Conversations';
import Dialogs from './components/Dialogs';
import { useGetConvers } from './useGetConvers';
import { useGetMessages } from './useGetMessages';

const Messages = () => {
  const token = Cookies.get('token');
  const id = Cookies.get('userId');
  const [currentChat, setCurrentChat] = useState<IConversationNames | null>(null);
  const [interlocutor, setInterlocutor] = useState<string | undefined>('');
  const [messages, setMessages] = useState<IMessagesNames[]>([]);

  const converse = useGetConvers();
  const dialogs = useGetMessages(currentChat?._id);

  const memoSetMessages = useCallback(
    () => (mess: IMessagesNames[]) => {
      setMessages(mess);
    },
    [messages]
  );

  useEffect(() => {
    console.log(messages?.filter(item => !item.isReaded).length);
  }, [messages]);

  useEffect(() => {
    setMessages(dialogs);
  }, [dialogs]);

  useEffect(() => {
    if (converse) {
      setCurrentChat(converse[0]);
      const interName =
        converse[0]?.sender.id !== id ? converse[0]?.sender.senderName : converse[0]?.receiver.receiverName;
      setInterlocutor(interName);
    }
  }, [converse]);

  const handleChatItemClick = useCallback(
    (item: IConversationNames) => {
      setCurrentChat(item);
      const interName = item.sender.id !== id ? item.sender.senderName : item.receiver.receiverName;
      setInterlocutor(interName);
    },
    [currentChat, interlocutor]
  );

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return (
    <section className={styles.messages}>
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
          {converse?.map(item => (
            <div key={item._id} className={styles.users} onClick={() => handleChatItemClick(item)}>
              <Conversations id={id} messages={messages} data={item} />
            </div>
          ))}
        </div>
      </div>
      <Dialogs
        interlocutor={interlocutor}
        currentChat={currentChat}
        messages={messages}
        setMessages={memoSetMessages}
      />
    </section>
  );
};

export default React.memo(Messages);
