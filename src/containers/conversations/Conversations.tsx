import ActiveConversation from '@/containers/conversations/ActiveConversation';
import ConversationsList from '@/containers/conversations/ConversationsList';
import { IConversation, IMessage } from '@/containers/conversations/types';
import { WebsocketContext } from '@/context/websocket';
import { useWebsocketData } from '@/context/websocketDataStorage';
import { conversationsAPI } from '@/store/services/ConversationsService';
import cn from 'classnames';
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import styles from './conversations.module.scss';

const Conversations = () => {
  // conversations //

  const { data: conversationList } = conversationsAPI.useGetConversationsQuery();
  const [updateConversation] = conversationsAPI.useUpdateConversationMutation();

  const [conversations, setConversations] = useState<IConversation[] | undefined>(undefined);
  const [currentChat, setCurrentChat] = useState<IConversation | null>(null);
  const [interlocutor, setInterlocutor] = useState<string | undefined>('');
  const [firstChatClick, setFirstChatClick] = useState(false);

  useEffect(() => {
    setConversations(conversationList);
  }, [conversationList]);

  useEffect(() => {
    if (conversationList && !firstChatClick) {
      setCurrentChat(conversationList[0]);
      setInterlocutor(conversationList[0].interlocutor.name);
    }
  }, [conversationList]);

  const handleSelectChat = useCallback(
    (item: IConversation) => {
      setCurrentChat(item);
      setInterlocutor(item.interlocutor.name);
      handleFirstClick();
    },
    [currentChat, interlocutor]
  );

  const handleFirstClick = useCallback(() => setFirstChatClick(true), []);

  // messages //

  const socket = useContext(WebsocketContext);
  const { messages, unreadMessages } = useWebsocketData();
  // const [limit, setLimit] = useState(20);
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const currentMessages = messages.filter(item => item.conversationId === currentChat?.id);
    setChatMessages(currentMessages);
  }, [messages, currentChat]);

  useEffect(() => {
    if (currentChat && messages) {
      updateConversation({ id: messages[0].conversationId });
    }
  }, [messages]);

  const getUnreadCount = useCallback(
    (id: number) => {
      return unreadMessages.filter(item => item.conversationId === id).length;
    },
    [unreadMessages, currentChat?.id]
  );

  useEffect(() => {
    socket.on('readMessage', () => {});
    return () => {
      socket.off('readMessage');
    };
  }, []);

  // const incCount = useCallback(() => {
  //   setLimit(prev => prev + 20);
  // }, [limit]);

  // search //

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (conversationList?.length) {
      const filteredConv = conversationList.filter(
        item => item.interlocutor.name?.toLowerCase().includes(query.toLowerCase())
      );
      setConversations(filteredConv);
    }
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
    setConversations(conversationList);
  };

  return (
    <section className={styles.messages}>
      <div className={cn(styles.conversationsWrap, { [styles.conversationsWrapResize]: firstChatClick })}>
        <form className={styles.input_wrap}>
          <label className={styles.form}>
            <input
              type="text"
              className={styles.input}
              placeholder="Search dialog"
              value={searchQuery}
              onChange={handleSearch}
            />
          </label>
          <button className={styles.inputBtn} onClick={clearSearchQuery}>
            {!searchQuery ? (
              <AiOutlineSearch className={styles.btnImg} />
            ) : (
              <TiDeleteOutline className={styles.btnImg} />
            )}
          </button>
        </form>
        <div className={styles.conversations}>
          {conversations?.map(item => (
            <div
              key={item.id}
              className={cn(styles.users, { [styles.currentUser]: currentChat?.id === item.id })}
              onClick={() => handleSelectChat(item)}
            >
              <ConversationsList data={item} getUnreadCount={() => getUnreadCount(item.id)} />
            </div>
          ))}
        </div>
      </div>
      <ActiveConversation
        interlocutor={interlocutor}
        firstChatClick={firstChatClick}
        currentChat={currentChat}
        messages={chatMessages}
        handleFirstClick={handleFirstClick}
        // incCount={incCount}
        goBack={() => setFirstChatClick(false)}
      />
    </section>
  );
};

export default React.memo(Conversations);