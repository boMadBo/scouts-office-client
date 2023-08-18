import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainLink.module.scss';

interface Props {
  children: string;
  to: string;
}

const MainLink = ({ children, to, ...props }: Props) => {
  return (
    <Link to={to} {...props} className={styles.link}>
      {children}
    </Link>
  );
};

export default React.memo(MainLink);
