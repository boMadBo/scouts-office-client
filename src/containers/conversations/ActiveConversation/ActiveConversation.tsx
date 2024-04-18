import ConversationDetails from '@/containers/conversations/ActiveConversation/ConversationDetails';
import { IConversation, IMessage } from '@/containers/conversations/types';
import { useSessionData } from '@/context/sessionDataStorage';
import { WebsocketContext } from '@/context/websocket';
import BackButton from '@/uikit/buttons/BackButton';
import EditButton from '@/uikit/buttons/EditButton';
import cn from 'classnames';
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
  const { t } = useTranslation();
  const viewedMessagesRef = useRef(new Set());
  const [newMessage, setNewMessage] = useState<string>('');
  const { id } = userData;

  const addMessage = () => {
    setNewMessage('');
    socket.emit('newMessage', {
      senderId: id,
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
              userId: id,
            });
          }
          if (entry.target.id === `message-${messages[messages.length - 1].id}`) {
            incrementCount();
          }
        }
      }
    });
  };

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
            className={cn(styles.messagesWrap, { [styles.messagesWrapOwn]: item.senderId === Number(id) })}
            id={`message-${item.id}`}
          >
            <ConversationDetails id={id} data={item} />
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
