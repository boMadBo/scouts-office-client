import cn from 'classnames';
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
<<<<<<< HEAD
<<<<<<<< HEAD:client/src/uikit/ContentLink/ContentLink.tsx
import styles from './ContentLink.module.scss';
========
import styles from './ParentLink.module.scss';
>>>>>>>> 3c06827 (add nested routes):src/uikit/ParentLink/ParentLink.tsx
=======
import styles from './ContentLink.module.scss';
>>>>>>> 8673b67 (add server and start auth)

interface Props {
  children: string;
  to: string;
<<<<<<< HEAD
  isHovered?: boolean;
}

<<<<<<<< HEAD:client/src/uikit/ContentLink/ContentLink.tsx
const ContentLink = ({ children, to, ...props }: Props) => {
========
const ParentLink = ({ children, to, isHovered, ...props }: Props) => {
>>>>>>>> 3c06827 (add nested routes):src/uikit/ParentLink/ParentLink.tsx
=======
}

const ContentLink = ({ children, to, ...props }: Props) => {
>>>>>>> 8673b67 (add server and start auth)
  const match = useMatch(to);

  const linkStyles = cn(styles.link, { [styles.activeLink]: match });

  return (
    <Link to={to} {...props} className={linkStyles}>
      {children}
    </Link>
  );
};

<<<<<<< HEAD
<<<<<<<< HEAD:client/src/uikit/ContentLink/ContentLink.tsx
export default React.memo(ContentLink);
========
export default React.memo(ParentLink);
>>>>>>>> 3c06827 (add nested routes):src/uikit/ParentLink/ParentLink.tsx
=======
export default React.memo(ContentLink);
>>>>>>> 8673b67 (add server and start auth)
