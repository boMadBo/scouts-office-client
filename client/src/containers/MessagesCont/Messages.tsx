<<<<<<< HEAD
import { IConversationNames } from '@/interfaces';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
=======
import Loading from '@/uikit/Loading';
import Cookies from 'js-cookie';
import React from 'react';
>>>>>>> 11853ed (add mock messages)
import { Navigate } from 'react-router-dom';
import styles from './Messages.module.scss';
import Conversations from './components/Conversations';
import Dialogs from './components/Dialogs';
<<<<<<< HEAD
import { useGetConvers } from './useGetConvers';

const Messages = () => {
  const token = Cookies.get('token');
  const id = Cookies.get('userId');
  const [currentChat, setCurrentChat] = useState<IConversationNames | null>(null);
  const [interlocutor, setInterlocutor] = useState<string | undefined>('');

  const converse = useGetConvers();

  // const memoSetMessages = useCallback(
  //   () => (mess: IMessagesNames) => {
  //     setMessages(prevMes => [...prevMes, mess]);
  //   },
  //   [messages]
  // );

  // useEffect(() => {
  //   console.log(messages?.filter(item => !item.isReaded).length);
  // }, [messages]);

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
=======

const mockNamnes = [
  { id: 1, name: 'John Cena' },
  { id: 2, name: 'Mark Wahlberg' },
  { id: 3, name: 'Shon Penn' },
];

const mockMessages = [
  {
    messageId: 1,
    authorId: 1,
    author: 'John Cena',
    text: 'Hello, my name is Eminem, i am from United States of America',
  },
  { messageId: 2, authorId: 2, author: 'me', text: 'This is America' },
  { messageId: 3, authorId: 1, author: 'John Cena', text: 'Shure?' },
];

const Messages = () => {
  const token = Cookies.get('token');
>>>>>>> 11853ed (add mock messages)

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

<<<<<<< HEAD
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
              <Conversations id={id} data={item} />
            </div>
          ))}
        </div>
      </div>
      <Dialogs
        interlocutor={interlocutor}
        currentChat={currentChat}
        // messages={messages}
        // setMessages={memoSetMessages}
      />
=======
  if (!token) {
    return <Loading />;
  }
  return (
    <section className={styles.messages}>
      <Conversations data={mockNamnes} />
      <Dialogs data={mockMessages} />
>>>>>>> 11853ed (add mock messages)
    </section>
  );
};

export default React.memo(Messages);
