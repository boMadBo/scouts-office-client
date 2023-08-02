import { IMessageName } from '@/containers/conversations/types';
import cn from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { IoIosDoneAll } from 'react-icons/io';
import styles from './chat.module.scss';
dayjs.extend(relativeTime);

interface Props {
  data: IMessageName;
  id: string | undefined;
}

const ChatArea = ({ data, id }: Props) => {
  const messagesStyle = cn(styles.messages, { [styles.ownMessages]: data.sender === id });
  const textWrapStyle = cn(styles.textWrap, { [styles.textWrapOwn]: data.sender === id });
  const readedStyle = cn(styles.readIcon, { [styles.readedIcon]: data.isReaded });
  const ownName = data.sender !== id ? data.senderName : 'You';

  return (
    <div className={messagesStyle}>
      <div className={styles.messagesNameWrap}>
        <span className={styles.messagesName}>{ownName}</span>
        <span className={styles.date}>{dayjs(data.createdAt).fromNow()}</span>
      </div>
      <div className={textWrapStyle}>
        <p className={styles.text}>{data.text}</p>
        <IoIosDoneAll className={readedStyle} />
      </div>
    </div>
  );
};

export default React.memo(ChatArea);
