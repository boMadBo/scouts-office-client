import { IConversationNames, IMessage } from '@/interfaces';
import { messagesAPI } from '@/store/services/MessagesService';
import cn from 'classnames';
import Cookies from 'js-cookie';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPaperclip } from 'react-icons/bs';
import { Navigate } from 'react-router-dom';
import styles from './Messages.module.scss';
import Conversations from './components/Conversations';
import Dialogs from './components/Dialogs';
import { useGetConvers } from './useGetConvers';
import { useGetMessages } from './useGetMessages';

const Messages = () => {
  const token = Cookies.get('token');
  const id = Cookies.get('userId');

  const converse = useGetConvers();
  const [currentChat, setCurrentChat] = useState<string>('');
  const dialogs = useGetMessages(currentChat);
  const [interlocutor, setInterlocutor] = useState<string | undefined>('');

  useEffect(() => {
    if (converse) {
      setCurrentChat(converse[0]?._id);
      setInterlocutor(converse[0]?.sender.senderName);
    }
  }, [converse]);

  // messages //

  const [createDialogs] = messagesAPI.useCreateMessagesMutation();
  const [newDialog, setNewDialog] = useState<string>('');

  const handleChatItemClick = (item: IConversationNames) => {
    setCurrentChat(item._id);
    setInterlocutor(item.sender.senderName);
  };

  const messageSubmit = async (message: IMessage) => {
    try {
      await createDialogs(message);
    } catch (e) {
      console.log(e);
    }
  };

  const addMessage = useCallback(() => {
    const message = {
      sender: id,
      text: newDialog,
      conversationId: currentChat,
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

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dialogs]);

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return (
    <section className={styles.messages}>
      <div className={styles.conversationsWrap}>
        <div className={styles.input_wrap}>
          <form className={styles.form}>
            <input
              type="text"
              className={styles.input}
              placeholder="Search dialog"
              // value={query}
              // onChange={handleInputChange}
            />
          </form>
          <button
            className={styles.input_btn}
            //  onClick={handleSearch}
          >
            <AiOutlineSearch className={styles.btnImg} />
          </button>
        </div>
        <div className={styles.conversations}>
          {converse?.map(item => (
            <div key={item._id} className={styles.users} onClick={() => handleChatItemClick(item)}>
              <Conversations data={item} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dialogs}>
        <div className={styles.nameCont}>
          <h3 className={styles.name}>{interlocutor}</h3>
        </div>
        <div className={styles.messagesCont}>
          {dialogs?.map(item => (
            <div
              key={item._id}
              className={cn(styles.messagesWrap, { [styles.messagesWrapOwn]: item.sender === id })}
              ref={scrollRef}
            >
              <Dialogs id={id} data={item} />
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
    </section>
  );
};

export default React.memo(Messages);
