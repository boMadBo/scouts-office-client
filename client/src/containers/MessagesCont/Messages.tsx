<<<<<<< HEAD
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
=======
import { IConversationNames, IMessage } from '@/interfaces';
import { messagesAPI } from '@/store/services/MessagesService';
import cn from 'classnames';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPaperclip } from 'react-icons/bs';
>>>>>>> a40623b (add messages logic)
import { Navigate } from 'react-router-dom';
import styles from './Messages.module.scss';
import Conversations from './components/Conversations';
import Dialogs from './components/Dialogs';
<<<<<<< HEAD
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
=======
import { useGetConvers } from './useGetConvers';
import { useGetMessages } from './useGetMessages';

const Messages = () => {
  const token = Cookies.get('token');
  const id = Cookies.get('userId');

  const converse = useGetConvers();
  const [currentChat, setCurrentChat] = useState<string>('');
  const dialogs = useGetMessages(currentChat);
  const [interlocutor, setInterlocutor] = useState<string | undefined>('');

  useEffect(() => {
    if (converse) {
      setCurrentChat(converse[0]?._id);
      const interName =
        converse[0]?.sender.id !== id ? converse[0]?.sender.senderName : converse[0]?.receiver.receiverName;
      console.log('interName', interName);

      setInterlocutor(interName);
    }
  }, [converse]);

  // messages //

  const [createDialogs] = messagesAPI.useCreateMessagesMutation();
  const [newDialog, setNewDialog] = useState<string>('');

  const handleChatItemClick = (item: IConversationNames) => {
    setCurrentChat(item._id);
    const interName = item.sender.id !== id ? item.sender.senderName : item.receiver.receiverName;
    setInterlocutor(interName);
  };

  const messageSubmit = async (message: IMessage) => {
    try {
      await createDialogs(message);
    } catch (e) {
      console.log(e);
    }
  };

  const addMessage = useCallback(() => {
    const message = {
      sender: id,
      text: newDialog,
      conversationId: currentChat,
    };
    messageSubmit(message);
    setNewDialog('');
  }, [messageSubmit, newDialog]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.keyCode === 13) {
        addMessage();
      }
    },
    [addMessage]
  );

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dialogs]);
>>>>>>> a40623b (add messages logic)

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

<<<<<<< HEAD
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
=======
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
              <Conversations interlocutor={interlocutor} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dialogs}>
        <div className={styles.nameCont}>
          <h3 className={styles.name}>{interlocutor}</h3>
        </div>
        <div className={styles.messagesCont}>
          {dialogs?.map(item => (
            <div
              key={item._id}
              className={cn(styles.messagesWrap, { [styles.messagesWrapOwn]: item.sender === id })}
              ref={scrollRef}
            >
              <Dialogs id={id} data={item} />
            </div>
          ))}
        </div>
        <div className={styles.sendCont}>
          <div className={styles.textareaWrap}>
            <textarea
              className={styles.textarea}
              placeholder="Write message"
              onChange={e => setNewDialog(e.target.value)}
              value={newDialog}
              onKeyUp={handleKeyUp}
            />
            <BsPaperclip className={styles.clip} />
          </div>
          <button className={styles.sendBtn} onClick={addMessage}>
            Send
          </button>
        </div>
      </div>
>>>>>>> a40623b (add messages logic)
    </section>
  );
};

export default React.memo(Messages);
