import cn from 'classnames';
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
<<<<<<<< HEAD:client/src/uikit/ContentLink/ContentLink.tsx
import styles from './ContentLink.module.scss';
========
import styles from './ParentLink.module.scss';
>>>>>>>> 3c06827 (add nested routes):src/uikit/ParentLink/ParentLink.tsx

interface Props {
  children: string;
  to: string;
  isHovered?: boolean;
}

<<<<<<<< HEAD:client/src/uikit/ContentLink/ContentLink.tsx
const ContentLink = ({ children, to, ...props }: Props) => {
========
const ParentLink = ({ children, to, isHovered, ...props }: Props) => {
<<<<<<< HEAD
>>>>>>>> 3c06827 (add nested routes):src/uikit/ParentLink/ParentLink.tsx
  const match = useMatch(to);
=======
  const match = useMatch(`${to}/*`);
>>>>>>> 8f5b450 (add tests, nested routes, fix timezone)

  const linkStyles = cn(styles.link, { [styles.activeLink]: match });

  return (
    <Link to={to} {...props} className={linkStyles}>
      {children}
    </Link>
  );
};

<<<<<<<< HEAD:client/src/uikit/ContentLink/ContentLink.tsx
export default React.memo(ContentLink);
========
export default React.memo(ParentLink);
>>>>>>>> 3c06827 (add nested routes):src/uikit/ParentLink/ParentLink.tsx
