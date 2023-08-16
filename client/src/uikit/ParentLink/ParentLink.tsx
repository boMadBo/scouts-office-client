import cn from 'classnames';
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import styles from './ParentLink.module.scss';

interface Props {
  children: string;
  to: string;
  onClick?: () => void;
}

const ParentLink = ({ children, to, onClick, ...props }: Props) => {
  const match = useMatch(`${to}/*`);

  const linkStyles = cn(styles.link, { [styles.activeLink]: match });

  return (
    <Link to={to} {...props} onClick={onClick} className={linkStyles}>
      {children}
    </Link>
  );
};

export default React.memo(ParentLink);
