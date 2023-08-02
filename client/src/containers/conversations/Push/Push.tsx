import { useGetPush } from '@/hooks/useGetPush';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styles from './push.module.scss';

const Push = () => {
  const push = useGetPush();
  const [showPush, setShowPush] = useState(false);

  useEffect(() => {
    if (push?.senderName || push?.text) {
      setShowPush(true);
      const timeout = setTimeout(() => {
        setShowPush(false);
      }, 8000);
      return () => clearTimeout(timeout);
    }
  }, [push]);

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
    <>
      {showPush && (
        <motion.div className={styles.push} variants={listVarian} initial="hidden" animate="visible">
          <div className={styles.name}>
            <span>{push?.senderName}</span>
          </div>
          <div className={styles.text}>
            <span>{push?.text}</span>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default React.memo(Push);
