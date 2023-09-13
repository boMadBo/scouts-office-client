<<<<<<< HEAD
import { IConversationNames, IMessage, IMessagesNames } from '@/interfaces';
import { messagesAPI } from '@/store/services/MessagesService';
import cn from 'classnames';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import { Socket, io } from 'socket.io-client';
import { useGetMessages } from '../../useGetMessages';
import Dialog from './Dialog';
import styles from './Dialogs.module.scss';

interface Props {
  interlocutor: string | undefined;
  currentChat: IConversationNames | null;
  // messages: IMessagesNames[];
  // setMessages: React.Dispatch<React.SetStateAction<IMessagesNames[]>>;
}

const Dialogs = ({ interlocutor, currentChat }: Props) => {
  const id = Cookies.get('userId');
  const [createMessages] = messagesAPI.useCreateMessagesMutation();

  const [newDialog, setNewDialog] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const socket = useRef<Socket>();
  const viewedMessagesRef = useRef(new Set());

  const [messages, setMessages] = useState<IMessagesNames[]>([]);
  const dialogs = useGetMessages(currentChat?._id);

  useEffect(() => {
    setMessages(dialogs);
  }, [dialogs]);

  // messages //

  const messageSubmit = async (message: IMessage) => {
    // const receiverId = currentChat?.members.find(member => member !== id);
    // const name = currentChat?.receiver.id !== id ? currentChat?.sender.senderName : currentChat?.receiver.receiverName;
    // if (socket.current) {
    //   socket.current.emit('sendMessage', {
    //     // _id: uuidv4().replace(/-/g, '').slice(0, 23),
    //     senderId: id,
    //     receiverId,
    //     text: newDialog,
    //     senderName: name,
    //     conversationId: currentChat?._id,
    //   });
    // }
    try {
      await createMessages(message);
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
      console.log('data', data);
      setMessages(prevMessages => [...prevMessages, data]);
    });
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit('addUser', id);
      socket.current.on('getUsers', users => {});
    }
  }, [id]);

  // intersection //

  useEffect(() => {
    viewedMessagesRef.current.clear();
  }, [currentChat, messages]);

  const [readMessages] = messagesAPI.useReadMessagesMutation();

  const onReadMessage = async (messageId: string, item: IMessagesNames) => {
    try {
      if (item.sender !== id) {
        await readMessages({ _id: messageId });
      }
    } catch (error) {
      console.error('Error read message:', error);
    }
  };

  const handleIntersection = (item: IMessagesNames) => (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = item.text;
        if (!viewedMessagesRef.current.has(text)) {
          viewedMessagesRef.current.add(text);
          const messageId = item._id;
          onReadMessage(messageId, item);
        }
      }
    });
  };

  useEffect(() => {
    messages?.forEach(item => {
      const observer = new IntersectionObserver(handleIntersection(item), {
        threshold: 1.0,
      });
      const element = document.getElementById(`message-${item._id}`);
      if (element) {
        observer.observe(element);
      }
    });
  }, [messages, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentChat]);

  return (
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
            id={`message-${item._id}`}
          >
            <Dialog id={id} data={item} />
=======
import cn from 'classnames';
import React, { useMemo } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import styles from './Dialogs.module.scss';

interface mockMessages {
  messageId: number;
  authorId: number;
  author: string;
  text: string;
}

interface Props {
  data: mockMessages[];
}

const Dialogs = ({ data }: Props) => {
  const interlocutor = useMemo(() => data.find(item => item.author !== 'me'), []);
  return (
    <div className={styles.dialogs}>
      <div className={styles.nameCont}>
        <h3 className={styles.name}>{interlocutor?.author}</h3>
      </div>
      <div className={styles.messagesCont}>
        {data.map(item => (
          <div
            key={item.messageId}
            className={cn(styles.messagesWrap, { [styles.messagesWrapOwn]: item.author === 'me' })}
          >
            <div className={styles.messages}>
              <div className={styles.messagesNameWrap}>
                <span className={styles.messagesName}>{item.author}</span>
                <span className={styles.date}>1 hour ago</span>
              </div>
              <div className={cn(styles.textWrap, { [styles.textWrapOwn]: item.author === 'me' })}>
                <p className={styles.text}>{item.text}</p>
              </div>
            </div>
>>>>>>> 11853ed (add mock messages)
          </div>
        ))}
      </div>
      <div className={styles.sendCont}>
        <div className={styles.textareaWrap}>
<<<<<<< HEAD
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
=======
          <textarea className={styles.textarea} placeholder="Write message"></textarea>
          <BsPaperclip className={styles.clip} />
        </div>
        <button className={styles.sendBtn}>Send</button>
>>>>>>> 11853ed (add mock messages)
      </div>
    </div>
  );
};

export default React.memo(Dialogs);
