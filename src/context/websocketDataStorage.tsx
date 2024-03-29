import { IMessage } from '@/containers/conversations/types';
import { useSessionData } from '@/context/sessionDataStorage';
import { WebsocketContext } from '@/context/websocket';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const SocketDataContext = createContext<{
  messages: IMessage[];
  unreadMessages: IMessage[];
  notification: IMessage | undefined;
}>({ messages: [], unreadMessages: [], notification: undefined });

const WebsocketDataStorage = ({ children }: any) => {
  const socket = useContext(WebsocketContext);
  const { userData } = useSessionData();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<IMessage[]>([]);
  const [notification, setNotification] = useState<IMessage | undefined>(undefined);
  const { id, token } = userData;

  useEffect(() => {
    if (token) {
      socket.on('connection', () => {});
      socket.on('subscribtions', () => {});
      socket.emit('subscribeToConversation', { userId: id });
      socket.on('allMessages', (allMessages: IMessage[]) => {
        setMessages(allMessages);
      });
      socket.emit('findAllMessages', { userId: id });
      socket.on('onMessage', (newMessage: IMessage) => {
        if (newMessage.senderId !== Number(id)) {
          setMessages(prev => [newMessage, ...prev]);
          setNotification(newMessage);
        }
      });
      return () => {
        socket.off('connection');
        socket.off('subscribtions');
        socket.off('allMessages');
        socket.off('onMessage');
      };
    }
  }, [token]);

  useEffect(() => {
    const unreaded = messages.filter(item => item.recieverId === Number(id) && !item.isReaded);
    setUnreadMessages(unreaded);
  }, [messages]);

  const socketContextValue = useMemo(
    () => ({ messages, unreadMessages, notification }),
    [messages, unreadMessages, notification]
  );

  return <SocketDataContext.Provider value={socketContextValue}>{children}</SocketDataContext.Provider>;
};

export const useWebsocketData = () => useContext(SocketDataContext);

export default WebsocketDataStorage;
