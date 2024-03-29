import { motion } from 'framer-motion';
import React from 'react';
import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <span>Loading...</span>
      <motion.img
        src={'/images/load.png'}
        alt="loading"
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </div>
  );
};

export default React.memo(Loading);
