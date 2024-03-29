import { IMessage } from '@/containers/conversations/types';
import { motion } from 'framer-motion';
import React from 'react';
import styles from './notification.module.scss';

interface Props {
  notification: IMessage | undefined;
}

const Notification = ({ notification }: Props) => {
  const listVarian = {
    visible: () => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        delay: 0.2,
      },
    }),
    hidden: { opacity: 0, y: -100 },
  };

  return (
    <motion.div className={styles.push} variants={listVarian} initial="hidden" animate="visible">
      <div className={styles.name}>
        <span>{notification?.senderName}</span>
      </div>
      <div className={styles.text}>
        <span>{notification?.text}</span>
      </div>
    </motion.div>
  );
};

export default React.memo(Notification);
