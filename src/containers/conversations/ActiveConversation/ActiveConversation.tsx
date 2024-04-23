import ConversationDetails from '@/containers/conversations/ActiveConversation/ConversationDetails';
import { IConversation, IMessage } from '@/containers/conversations/types';
import { useSessionData } from '@/context/sessionDataStorage';
import { WebsocketContext } from '@/context/websocket';
import BackButton from '@/uikit/buttons/BackButton';
import EditButton from '@/uikit/buttons/EditButton';
import cn from 'classnames';
import debounce from 'lodash/debounce';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsPaperclip } from 'react-icons/bs';
import styles from './activeConversation.module.scss';

interface Props {
  interlocutor: string | undefined;
  firstChatClick: boolean;
  currentChat: IConversation | null;
  messages: IMessage[];
  handleFirstClick: () => void;
  incrementCount: () => void;
  goBack: () => void;
}

const ActiveConversation = ({
  interlocutor,
  firstChatClick,
  currentChat,
  messages,
  handleFirstClick,
  goBack,
  incrementCount,
}: Props) => {
  const { userData } = useSessionData();
  const socket = useContext(WebsocketContext);
  const viewedMessagesRef = useRef(new Set());
  const [newMessage, setNewMessage] = useState<string>('');
  const [lastMessageId, setLastMessageId] = useState(0);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const { t } = useTranslation();

  useEffect(() => {
    setUserId(userData?.id);
  }, [userData]);

  const addMessage = () => {
    setNewMessage('');
    socket.emit('newMessage', {
      senderId: userId,
      text: newMessage,
      conversationId: currentChat?.id,
      recieverId: currentChat?.interlocutor.id,
    });
    handleFirstClick();
  };

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.keyCode === 13) {
        addMessage();
      }
    },
    [addMessage]
  );

  // intersection //

  useEffect(() => {
    viewedMessagesRef.current.clear();
  }, [currentChat, messages]);

  const handleIntersection = (item: IMessage) => (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = item.text;
        if (!viewedMessagesRef.current.has(text)) {
          viewedMessagesRef.current.add(text);
          if (item.senderId !== currentChat?.user.id && !item.isReaded) {
            socket.emit('updateMessage', {
              id: item.id,
              conversationId: item.conversationId,
              senderId: item.senderId,
              userId,
            });
          }
          const messageId = Number(entry.target.id.split('-')[1]);
          debounceIncrementCount(messageId);
        }
      }
    });
  };

  const debounceIncrementCount = debounce((messageId: number) => {
    if (messageId > lastMessageId) {
      incrementCount();
      setLastMessageId(messageId);
    }
  }, 1000);

  useEffect(() => {
    return () => {
      debounceIncrementCount.cancel();
    };
  }, []);

  useEffect(() => {
    messages?.forEach(item => {
      const observer = new IntersectionObserver(handleIntersection(item), {
        threshold: 1.0,
      });
      const element = document.getElementById(`message-${item.id}`);
      if (element) {
        observer.observe(element);
      }
    });
  }, [messages, currentChat]);

  return (
    <div className={cn(styles.dialogs, { [styles.dialogsResize]: firstChatClick })}>
      <div className={styles.nameCont}>
        {firstChatClick && (
          <div className={styles.backWrap}>
            <BackButton text={t('back')} onClick={goBack} />
          </div>
        )}
        <h3 className={styles.name}>{interlocutor}</h3>
      </div>
      <div className={styles.messagesCont}>
        {messages?.map(item => (
          <div
            key={item.id}
            className={cn(styles.messagesWrap, { [styles.messagesWrapOwn]: item.senderId === userId })}
            id={`message-${item.id}`}
          >
            <ConversationDetails id={userId} data={item} />
          </div>
        ))}
      </div>
      <div className={styles.sendCont}>
        <div className={styles.textareaWrap}>
          <textarea
            className={styles.textarea}
            placeholder="Write message"
            onChange={e => setNewMessage(e.target.value)}
            value={newMessage}
            onKeyUp={handleKeyUp}
          />
          <div className={styles.clipWrap}>
            <BsPaperclip className={styles.clip} />
          </div>
        </div>
        <EditButton onClick={addMessage} text={t('Send')} width="width100" height="height32" />
      </div>
    </div>
  );
};

export default React.memo(ActiveConversation);
