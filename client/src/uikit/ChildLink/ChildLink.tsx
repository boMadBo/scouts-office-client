import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ChildLink.module.scss';

interface Props {
  children: string;
  to: string;
  onClick: () => void;
}

const ChildLink = ({ children, to, onClick, ...props }: Props) => {
  return (
    <Link to={to} {...props} className={styles.link} onClick={onClick}>
      {children}
    </Link>
  );
};

export default React.memo(ChildLink);
