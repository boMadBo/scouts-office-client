<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9b4e008 (add dialogs)
=======
>>>>>>> main
import { IConversationNames } from '@/interfaces';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import Loading from '@/uikit/Loading';
import Cookies from 'js-cookie';
import React from 'react';
>>>>>>> 11853ed (add mock messages)
=======
import { IConversationNames, IMessage } from '@/interfaces';
=======
import { IConversationNames, IMessage, IMessagesNames } from '@/interfaces';
>>>>>>> b6a0b5c (start ws)
import { messagesAPI } from '@/store/services/MessagesService';
import cn from 'classnames';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPaperclip } from 'react-icons/bs';
>>>>>>> a40623b (add messages logic)
import { Navigate } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import styles from './Messages.module.scss';
import Conversations from './components/Conversations';
import Dialogs from './components/Dialogs';
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> main
import { Navigate } from 'react-router-dom';

import styles from './Messages.module.scss';
import Conversations from './components/Conversations';
import Dialogs from './components/Dialogs';
<<<<<<< HEAD
>>>>>>> 9b4e008 (add dialogs)
=======
>>>>>>> main
import { useGetConvers } from './useGetConvers';

const Messages = () => {
  const token = Cookies.get('token');
  const id = Cookies.get('userId');
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 9b4e008 (add dialogs)
=======

>>>>>>> main
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> main

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
<<<<<<< HEAD
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

  const [currentChat, setCurrentChat] = useState<IConversationNames | null>(null);
  const [interlocutor, setInterlocutor] = useState<string | undefined>('');
  const [arrivalMessage, setArrivalMessage] = useState<IMessage | null>(null);
  const [messages, setMessages] = useState<IMessagesNames[]>([]);
  const [newDialog, setNewDialog] = useState<string>('');

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const socket = useRef<Socket>();

  const converse = useGetConvers();
  const dialogs = useGetMessages(currentChat?._id);
  const [createMessages] = messagesAPI.useCreateMessagesMutation();
=======
>>>>>>> 9b4e008 (add dialogs)

  useEffect(() => {
    if (converse) {
      setCurrentChat(converse[0]);
      const interName =
        converse[0]?.sender.id !== id ? converse[0]?.sender.senderName : converse[0]?.receiver.receiverName;
      setInterlocutor(interName);
    }
  }, [converse]);

<<<<<<< HEAD
  // messages //

  useEffect(() => {
    setMessages(dialogs);
  }, [dialogs]);

  const handleChatItemClick = (item: IConversationNames) => {
    setCurrentChat(item);
    const interName = item.sender.id !== id ? item.sender.senderName : item.receiver.receiverName;
    setInterlocutor(interName);
  };

  const messageSubmit = async (message: IMessage) => {
    const receiverId = currentChat?.members.find(member => member !== id);
    const name = currentChat?.receiver.id !== id ? currentChat?.sender.senderName : currentChat?.receiver.receiverName;
    if (socket.current) {
      socket.current.emit('sendMessage', {
        senderId: id,
        receiverId,
        text: newDialog,
        senderName: name,
        conversationId: currentChat?._id,
      });
    }
    try {
      const res = await createMessages(message);
      if ('data' in res && Array.isArray(res.data)) {
        setMessages(prevMessages => [...prevMessages, ...(res.data as IMessagesNames[])]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addMessage = useCallback(() => {
    const message = {
      sender: id,
      text: newDialog,
      conversationId: currentChat?._id,
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

  // sockets //

  useEffect(() => {
    socket.current = io('ws://localhost:3050');

    socket.current.on('getMessage', data => {
      setArrivalMessage({
        _id: Math.random().toString(),
        conversationId: data.conversationId,
        sender: data.senderId,
        text: data.text,
        createdAt: new Date().toString(),
        senderName: data.senderName,
      });
    });
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage &&
      arrivalMessage.sender &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages(prev => [...prev, arrivalMessage as IMessagesNames]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit('addUser', id);
      socket.current.on('getUsers', users => {});
    }
  }, [id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
<<<<<<< HEAD
  }, [dialogs]);
>>>>>>> a40623b (add messages logic)
=======
  }, [messages]);
>>>>>>> b6a0b5c (start ws)

=======
  const handleChatItemClick = useCallback(
    (item: IConversationNames) => {
      setCurrentChat(item);
      const interName = item.sender.id !== id ? item.sender.senderName : item.receiver.receiverName;
      setInterlocutor(interName);
    },
    [currentChat, interlocutor]
  );

>>>>>>> 9b4e008 (add dialogs)
=======

>>>>>>> main
  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> main
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
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 9b4e008 (add dialogs)
=======

>>>>>>> main
      <Dialogs
        interlocutor={interlocutor}
        currentChat={currentChat}
        // messages={messages}
        // setMessages={memoSetMessages}
      />
<<<<<<< HEAD
<<<<<<< HEAD
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
              <Conversations id={id} data={item} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dialogs}>
        <div className={styles.nameCont}>
          <h3 className={styles.name}>{interlocutor}</h3>
        </div>
        <div className={styles.messagesCont}>
          {messages?.map(item => (
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
=======
>>>>>>> 9b4e008 (add dialogs)
=======
>>>>>>> main
    </section>
  );
};

export default React.memo(Messages);
