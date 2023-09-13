import cn from 'classnames';
import React, { useMemo } from 'react';
import { BsPaperclip } from 'react-icons/bs';
import styles from './Dialogs.module.scss';

interface mockMessages {
  messageId: number;
  authorId: number;
  author: string;
  text: string;
}

interface Props {
  data: mockMessages[];
}

const Dialogs = ({ data }: Props) => {
  const interlocutor = useMemo(() => data.find(item => item.author !== 'me'), []);
  return (
    <div className={styles.dialogs}>
      <div className={styles.nameCont}>
        <h3 className={styles.name}>{interlocutor?.author}</h3>
      </div>
      <div className={styles.messagesCont}>
        {data.map(item => (
          <div
            key={item.messageId}
            className={cn(styles.messagesWrap, { [styles.messagesWrapOwn]: item.author === 'me' })}
          >
            <div className={styles.messages}>
              <div className={styles.messagesNameWrap}>
                <span className={styles.messagesName}>{item.author}</span>
                <span className={styles.date}>1 hour ago</span>
              </div>
              <div className={cn(styles.textWrap, { [styles.textWrapOwn]: item.author === 'me' })}>
                <p className={styles.text}>{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.sendCont}>
        <div className={styles.textareaWrap}>
          <textarea className={styles.textarea} placeholder="Write message"></textarea>
          <BsPaperclip className={styles.clip} />
        </div>
        <button className={styles.sendBtn}>Send</button>
      </div>
    </div>
  );
};

export default React.memo(Dialogs);
