import { IConversationName, IMessageName } from '@/containers/conversations/types';
import { messagesAPI } from '@/store/services/MessagesService';
import BackButton from '@/uikit/buttons/BackButton';
import EditButton from '@/uikit/buttons/EditButton';
import cn from 'classnames';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsPaperclip } from 'react-icons/bs';
import ChatArea from './ChatArea';
import styles from './chat.module.scss';

interface Props {
  interlocutor: string | undefined;
  firstChatClick: boolean;
  currentChat: IConversationName | null;
  messages: IMessageName[];
  incCount: () => void;
  goBack: () => void;
}

const Chat = ({ interlocutor, firstChatClick, currentChat, messages, incCount, goBack }: Props) => {
  const id = Cookies.get('userId');
  const { t } = useTranslation();
  const [createMessages] = messagesAPI.useCreateMessagesMutation();
  const [readMessages] = messagesAPI.useReadMessagesMutation();
  const [newDialog, setNewDialog] = useState<string>('');
  const viewedMessagesRef = useRef(new Set());

  // messages //

  const reciever = useMemo(
    () => (currentChat?.receiver.id !== id ? currentChat?.receiver.id : currentChat?.sender.id),
    [currentChat]
  );

  const addMessage = async () => {
    const message = {
      sender: id,
      text: newDialog,
      conversationId: currentChat?._id,
      reciever: reciever,
    };
    setNewDialog('');
    try {
      await createMessages({ message: message });
    } catch (e) {
      console.log(e);
    }
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

  const onReadMessage = async (item: IMessageName) => {
    try {
      if (item.sender !== id) {
        await readMessages({ _id: item._id });
      }
    } catch (error) {
      console.error('Error read message:', error);
    }
  };

  const handleIntersection = (item: IMessageName) => (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const text = item.text;
        if (!viewedMessagesRef.current.has(text)) {
          viewedMessagesRef.current.add(text);
          if (item.sender !== id) {
            onReadMessage(item);
          }
          const lastMessage = messages[messages.length - 1];
          if (entry.target.id === `message-${lastMessage._id}`) {
            incCount();
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
      const element = document.getElementById(`message-${item._id}`);
      if (element) {
        observer.observe(element);
      }
    });
  }, [messages, currentChat]);

  return (
    <div className={cn(styles.dialogs, { [styles.dialogsResize]: firstChatClick })}>
      <div className={styles.nameCont}>
        {firstChatClick && (
          <div className={styles.backWrap} >
            <BackButton text={t('back')} onClick={goBack}/>
          </div>
        )}
        <h3 className={styles.name}>{interlocutor}</h3>
      </div>
      <div className={styles.messagesCont}>
        {messages?.map(item => (
          <div
            key={item._id}
            className={cn(styles.messagesWrap, { [styles.messagesWrapOwn]: item.sender === id })}
            id={`message-${item._id}`}
          >
            <ChatArea id={id} data={item} />
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
          <div className={styles.clipWrap}>
            <BsPaperclip className={styles.clip} />
          </div>
        </div>
        <EditButton onClick={addMessage} text={t('Send')} width='width100' height='height32' />
      </div>
    </div>
  );
};

export default React.memo(Chat);
