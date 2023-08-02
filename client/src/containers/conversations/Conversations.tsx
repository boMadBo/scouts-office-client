import { useAppDispatch } from '@/hooks';
import { IConversationName, IMessages, IMessageName } from '@/containers/conversations/types';
import { pushFetching } from '@/store/reducers/PushSlice';
import { unreadMessagesFetching } from '@/store/reducers/unreadMessagesSlice';
import { messagesAPI } from '@/store/services/MessagesService';
import cn from 'classnames';
import Cookies from 'js-cookie';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { Navigate } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import ConversationsList from './ConversationsList';
import Chat from './Chat';
import styles from './conversations.module.scss';
import { useGetConversations } from '../../hooks/useGetConversations';
import { useGetMessages } from '../../hooks/useGetMessages';

const Conversations = () => {
  const token = Cookies.get('token');
  const id = Cookies.get('userId');

  const [conversations, setConversations] = useState<IConversationName[] | null>(null);
  const [currentChat, setCurrentChat] = useState<IConversationName | null>(null);
  const [interlocutor, setInterlocutor] = useState<string | undefined>('');
  const [messages, setMessages] = useState<IMessageName[]>([]);
  const [limit, setLimit] = useState(10);
  const [convQuery, setConvQuery] = useState('');
  const [firstChatClick, setFirstChatClick] = useState(false);
  const [lastMessageDates, setLastMessageDates] = useState<Record<string, number>>({});
  const [unreadMessages, setUnreadMessages] = useState<IMessages[]>([]);
  const socket = useRef<Socket>();

  const conversationList = useGetConversations();
  const dialogs = useGetMessages(currentChat?._id, limit);
  const { data: allMess } = messagesAPI.useGetAllMessagesQuery();
  const dispatch = useAppDispatch();

  // sockets //

  const incCount = useCallback(() => {
    setLimit(limit + 10);
  }, [limit]);

  useEffect(() => {
    setMessages(dialogs);
  }, [dialogs]);

  useEffect(() => {
    if (allMess) {
      setUnreadMessages(allMess?.filter(item => !item.isReaded && item.receiver === id));
    }
  }, [allMess]);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit('addUser', id);
      socket.current.on('getUsers', users => {});
    }
  }, [id]);

  useEffect(() => {
    socket.current = io('ws://localhost:3050');
    socket.current.on('getMessage', data => {
      setMessages(prevMessages => [data, ...prevMessages]);
      setUnreadMessages(prevMessages => [data, ...prevMessages]);
      dispatch(pushFetching({ idSender: data.sender, text: data.text }));
    });
  }, []);

  useEffect(() => {
    dispatch(unreadMessagesFetching(unreadMessages.length));
  }, [unreadMessages]);

  // conversations //

  useEffect(() => {
    const dateMap: Record<string, number> = {};
    allMess?.forEach(item => {
      dateMap[item.conversationId] = new Date(item.updatedAt).getTime();
    });
    setLastMessageDates(dateMap);
  }, [allMess]);

  useEffect(() => {
    setConversations(conversationList.sort((a, b) => lastMessageDates[b._id] - lastMessageDates[a._id]));
  }, [conversationList, lastMessageDates]);

  useEffect(() => {
    if (conversations) {
      const sortedConversations = conversations.sort((a, b) => lastMessageDates[b._id] - lastMessageDates[a._id]);
      setCurrentChat(sortedConversations[0]);
      const interName =
        sortedConversations[0]?.sender.id !== id
          ? sortedConversations[0]?.sender.senderName
          : sortedConversations[0]?.receiver.receiverName;

      setInterlocutor(interName);
    }
  }, [conversations, lastMessageDates]);

  const handleChatItemClick = useCallback(
    (item: IConversationName) => {
      setCurrentChat(item);
      const interName = item.sender.id !== id ? item.sender.senderName : item.receiver.receiverName;
      setInterlocutor(interName);
      setFirstChatClick(true);
    },
    [currentChat, interlocutor]
  );

  // search //

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setConvQuery(query);
    const filteredConv = conversationList.filter(
      item =>
        item.receiver.receiverName?.toLowerCase().includes(query.toLowerCase()) ||
        item.sender.senderName?.toLowerCase().includes(query.toLowerCase())
    );
    setConversations(filteredConv);
  };

  const clearQuery = () => {
    setConvQuery('');
    setConversations(conversationList);
  };

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return (
    <section className={styles.messages}>
      <div className={cn(styles.conversationsWrap, { [styles.conversationsWrapResize]: firstChatClick })}>
        <form className={styles.input_wrap}>
          <label className={styles.form}>
            <input
              type="text"
              className={styles.input}
              placeholder="Search dialog"
              value={convQuery}
              onChange={handleInputChange}
            />
          </label>
            <button className={styles.inputBtn} onClick={clearQuery}>
              {!convQuery ? <AiOutlineSearch className={styles.btnImg} /> : <TiDeleteOutline className={styles.btnImg} />}
            </button>
        </form>
        <div className={styles.conversations}>
          {conversations?.map(item => (
            <div key={item._id} className={cn(styles.users, {[styles.currentUser]: currentChat?._id === item._id})} onClick={() => handleChatItemClick(item)}>
              <ConversationsList id={id} data={item} messages={messages} />
            </div>
          ))}
        </div>
      </div>
      <Chat
        interlocutor={interlocutor}
        firstChatClick={firstChatClick}
        currentChat={currentChat}
        messages={messages}
        incCount={incCount}
        goBack={() => setFirstChatClick(false)}
      />
    </section>
  );
};

export default React.memo(Conversations);
