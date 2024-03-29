import { useAppSelector } from '@/hooks';
import ParentLink from '@/uikit/links/ParentLink';
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthWrap from './AuthWrap';
import styles from './wellcomeStep.module.scss';

const links = [
  { to: 'registr', text: 'Create a profile' },
  { to: 'signin', text: 'I have account' },
];

const WellcomeStep = () => {
  const isRememberMe = useAppSelector(state => state.rememberMe.isRememberMe);

  if (isRememberMe) {
    return <Navigate to={'/account'} />;
  }

  return (
    <AuthWrap>
      <div className={styles.container}>
        <h2 className={styles.title}>Wellcome to Scouts Academy</h2>
        <div className={styles.linkWrap}>
          {links.map(link => (
            <ParentLink key={link.to} to={link.to} fontSize="fs20">
              {link.text}
            </ParentLink>
          ))}
        </div>
      </div>
    </AuthWrap>
  );
};

export default React.memo(WellcomeStep);
