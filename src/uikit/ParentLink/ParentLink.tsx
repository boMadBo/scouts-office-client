import cn from 'classnames';
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import styles from './ParentLink.module.scss';

interface Props {
  children: string;
  to: string;
  isHovered?: boolean;
}

const ParentLink = ({ children, to, isHovered, ...props }: Props) => {
  const match = useMatch(to);
  const linkStyles = cn(styles.link, { [styles.activeLink]: match });

  return (
    <Link to={to} {...props} className={linkStyles}>
      {children}
    </Link>
  );
};

export default React.memo(ParentLink);
