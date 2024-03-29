import cn from 'classnames';
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import styles from './parentLink.module.scss';

interface Props {
  children: string;
  to: string;
  fontSize?: 'fs16' | 'fs18' | 'fs20'
  content?: boolean;
  onClick?: () => void;
}

const ParentLink = ({ children, to,fontSize, content, onClick, ...props }: Props) => {
  const match = useMatch(`${to}/*`);

  const linkStyles = cn(styles.link, { [styles.activeLink]: match }, fontSize && styles[fontSize], {[styles.contentLink]: content});

  return (
    <Link to={to} {...props} onClick={onClick} className={linkStyles}>
      {children}
    </Link>
  );
};

export default React.memo(ParentLink);
