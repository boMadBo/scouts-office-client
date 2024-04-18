import { IMessage } from '@/containers/conversations/types';
import { useSessionData } from '@/context/sessionDataStorage';
import { WebsocketContext } from '@/context/websocket';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const SocketDataContext = createContext<{
  unreadMessages: IMessage[];
  notification: IMessage | undefined;
  lastMessage: IMessage | undefined;
}>({ unreadMessages: [], notification: undefined, lastMessage: undefined });

const WsMessagesDataStorage = ({ children }: any) => {
  const socket = useContext(WebsocketContext);
  const { userData } = useSessionData();
  const { id, token } = userData;
  const [unreadMessages, setUnreadMessages] = useState<IMessage[]>([]);
  const [notification, setNotification] = useState<IMessage | undefined>(undefined);
  const [lastMessage, setLastMessage] = useState<IMessage | undefined>(undefined);

  useEffect(() => {
    if (token) {
      socket.on('connection', () => {});

      socket.on('subscribtions', () => {});
      socket.emit('subscribeToConversation', { userId: id });

      socket.on('unreadMessages', (unreadMessages: IMessage[]) => {
        setUnreadMessages(unreadMessages);
      });
      socket.emit('findUnreadMessages', { userId: id });

      socket.on('lastMessage', (message: IMessage) => {
        setLastMessage(message);
      });
      socket.emit('findLastMessage', { userId: userData.id });

      socket.on('onMessage', (newMessage: IMessage) => {
        if (newMessage.senderId !== Number(id)) {
          setUnreadMessages(prev => [newMessage, ...prev]);
          setNotification(newMessage);
          setLastMessage(newMessage);
        }
      });
    }
    return () => {
      socket.off('connection');
      socket.off('subscribtions');
      socket.off('unreadMessages');
      socket.off('lastMessage');
      socket.off('onMessage');
    };
  }, [token]);

  const socketContextValue = useMemo(
    () => ({ unreadMessages, notification, lastMessage }),
    [unreadMessages, notification]
  );

  return <SocketDataContext.Provider value={socketContextValue}>{children}</SocketDataContext.Provider>;
};

export const useWebsocketMessagesData = () => useContext(SocketDataContext);

export default WsMessagesDataStorage;
