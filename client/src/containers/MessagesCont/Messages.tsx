<<<<<<< HEAD
import { IConversationNames } from '@/interfaces';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Navigate } from 'react-router-dom';
=======
import { IConversationNames, IMessage, IMessagesNames } from '@/interfaces';
import { messagesAPI } from '@/store/services/MessagesService';
import cn from 'classnames';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPaperclip } from 'react-icons/bs';
import { Navigate } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
>>>>>>> main
import styles from './Messages.module.scss';
import Conversations from './components/Conversations';
import Dialogs from './components/Dialogs';
import { useGetConvers } from './useGetConvers';
<<<<<<< HEAD
=======
import { useGetMessages } from './useGetMessages';
>>>>>>> main

const Messages = () => {
  const token = Cookies.get('token');
  const id = Cookies.get('userId');
<<<<<<< HEAD
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
=======

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
>>>>>>> main

  useEffect(() => {
    if (converse) {
      setCurrentChat(converse[0]);
      const interName =
        converse[0]?.sender.id !== id ? converse[0]?.sender.senderName : converse[0]?.receiver.receiverName;
      setInterlocutor(interName);
    }
  }, [converse]);

<<<<<<< HEAD
  const handleChatItemClick = useCallback(
    (item: IConversationNames) => {
      setCurrentChat(item);
      const interName = item.sender.id !== id ? item.sender.senderName : item.receiver.receiverName;
      setInterlocutor(interName);
    },
    [currentChat, interlocutor]
  );

=======
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
  }, [messages]);

>>>>>>> main
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
              <Conversations id={id} data={item} />
            </div>
          ))}
        </div>
      </div>
<<<<<<< HEAD
      <Dialogs
        interlocutor={interlocutor}
        currentChat={currentChat}
        // messages={messages}
        // setMessages={memoSetMessages}
      />
=======
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
>>>>>>> main
    </section>
  );
};

export default React.memo(Messages);
