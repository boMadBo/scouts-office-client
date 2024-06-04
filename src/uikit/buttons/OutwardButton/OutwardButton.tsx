import cn from 'classnames';
import React from 'react';
import styles from './outwardButton.module.scss';

interface Props {
  service: 'google' | 'apple';
  onClick: () => void;
}

const OutwardButton = ({ service, onClick }: Props) => {
  const text = service === 'google' ? 'Google' : 'Apple';
  return (
    <button onClick={onClick} className={cn(styles.button, service && styles[service])}>
      {text}
    </button>
  );
};

export default React.memo(OutwardButton);
