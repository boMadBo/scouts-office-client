import cn from 'classnames';
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import styles from './CustomLink.module.scss';

interface Props {
  children: string;
  to: string;
}

const CustomLink = ({ children, to, ...props }: Props) => {
  const match = useMatch(to);
  const linkStyles = cn(styles.link, { [styles.activeLink]: match });

  return (
    <Link to={to} {...props} className={linkStyles}>
      {children}
    </Link>
  );
};

export default React.memo(CustomLink);
