import { IMessage } from '@/containers/conversations/types';
import { WebsocketContext } from '@/context/websocket';
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const SocketDataContext = createContext<{
  messages: IMessage[];
  unreadMessages: IMessage[];
  notification: IMessage | undefined;
}>({ messages: [], unreadMessages: [], notification: undefined });

const WebsocketDataSorage = ({ children }: any) => {
  const id = Cookies.get('userId');
  const socket = useContext(WebsocketContext);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<IMessage[]>([]);
  const [notification, setNotification] = useState<IMessage | undefined>(undefined);

  useEffect(() => {
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
  }, []);

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

export default WebsocketDataSorage;
