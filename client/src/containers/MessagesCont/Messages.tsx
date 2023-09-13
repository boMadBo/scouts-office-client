import Loading from '@/uikit/Loading';
import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';
import styles from './Messages.module.scss';
import Conversations from './components/Conversations';
import Dialogs from './components/Dialogs';

const mockNamnes = [
  { id: 1, name: 'John Cena' },
  { id: 2, name: 'Mark Wahlberg' },
  { id: 3, name: 'Shon Penn' },
];

const mockMessages = [
  {
    messageId: 1,
    authorId: 1,
    author: 'John Cena',
    text: 'Hello, my name is Eminem, i am from United States of America',
  },
  { messageId: 2, authorId: 2, author: 'me', text: 'This is America' },
  { messageId: 3, authorId: 1, author: 'John Cena', text: 'Shure?' },
];

const Messages = () => {
  const token = Cookies.get('token');

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  if (!token) {
    return <Loading />;
  }
  return (
    <section className={styles.messages}>
      <Conversations data={mockNamnes} />
      <Dialogs data={mockMessages} />
    </section>
  );
};

export default React.memo(Messages);
