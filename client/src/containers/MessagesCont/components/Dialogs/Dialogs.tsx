import { instance } from '@/api/instanceIO';
import { IConversationNames, IMessage, IMessagesNames } from '@/interfaces';
import { messagesAPI } from '@/store/services/MessagesService';
import cn from 'classnames';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import { Socket, io } from 'socket.io-client';
import Dialog from './Dialog';
import styles from './Dialogs.module.scss';

interface Props {
  interlocutor: string | undefined;
  currentChat: IConversationNames | null;
  messages: IMessagesNames[];
  setMessages: React.Dispatch<React.SetStateAction<IMessagesNames[]>>;
}

const Dialogs = ({ interlocutor, currentChat, messages, setMessages }: Props) => {
  const id = Cookies.get('userId');
  const [createMessages] = messagesAPI.useCreateMessagesMutation();

  const [newDialog, setNewDialog] = useState<string>('');
  const [arrivalMessage, setArrivalMessage] = useState<IMessage | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const socket = useRef<Socket>();
  const viewedMessagesRef = useRef(new Set());

  // messages //

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
    socket.current = io(instance);

    socket.current.on('getMessage', data => {
      setArrivalMessage({
        _id: Math.random().toString(),
        conversationId: data.conversationId,
        sender: data.senderId,
        text: data.text,
        createdAt: new Date().toString(),
        senderName: data.senderName,
        isReaded: false,
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
  );
};

export default React.memo(Dialogs);
