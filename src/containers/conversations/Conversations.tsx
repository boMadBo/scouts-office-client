import ActiveConversation from '@/containers/conversations/ActiveConversation';
import ConversationsList from '@/containers/conversations/ConversationsList';
import { IConversation, IMessage } from '@/containers/conversations/types';
import { WebsocketContext } from '@/context/websocket';
import { useWebsocketMessagesData } from '@/context/wsMessagesDataStorage';
import { conversationsAPI } from '@/store/services/ConversationsService';
import FormWithIcon from '@/uikit/forms/FormWithIcon';
import cn from 'classnames';
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import styles from './conversations.module.scss';

const Conversations = () => {
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
  const { unreadMessages, notification, lastMessage } = useWebsocketMessagesData();
  const [limit, setLimit] = useState(20);
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    socket.on('readMessage', () => {});
    return () => {
      socket.off('readMessage');
    };
  }, []);

  useEffect(() => {
    if (currentChat) {
      socket.on('conversationMessages', (messages: IMessage[]) => {
        setChatMessages(messages);
      });
      socket.emit('findConversationMessages', { conversationId: currentChat.id, limit });
    }

    return () => {
      socket.off('conversationMessages');
    };
  }, [currentChat, limit]);

  useEffect(() => {
    if (notification && notification?.conversationId === currentChat?.id) {
      setChatMessages(prev => [notification, ...prev]);
    }
  }, [notification]);

  const getUnreadCount = useCallback(
    (id: number) => {
      return unreadMessages.filter(item => item.conversationId === id).length;
    },
    [unreadMessages, currentChat?.id]
  );

  const incrementCount = useCallback(() => {
    setLimit(prev => prev + 20);
  }, [limit]);

  useEffect(() => {
    if (lastMessage) {
      updateConversation({ id: lastMessage.conversationId });
    }
  }, [lastMessage]);

  // search //

  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    <div className={styles.messages}>
      <div className={cn(styles.conversationsWrap, { [styles.conversationsWrapResize]: firstChatClick })}>
        <div className={styles.formWrap}>
          <FormWithIcon
            query={searchQuery}
            placeholder="Search dialog"
            handleInputChange={handleInputChange}
            clearSearchQuery={clearSearchQuery}
          />
        </div>
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
        incrementCount={incrementCount}
        goBack={() => setFirstChatClick(false)}
      />
    </div>
  );
};

export default React.memo(Conversations);
