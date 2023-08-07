import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ChildLink.module.scss';

interface Props {
  children: string;
  to: string;
}

const ChildLink = ({ children, to, ...props }: Props) => {
  return (
    <Link to={to} {...props} className={styles.link}>
      {children}
    </Link>
  );
};

export default React.memo(ChildLink);
