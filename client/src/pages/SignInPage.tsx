<<<<<<< HEAD
import SignIn from '@/containers/AuthCont/SignIn';
import React from 'react';

const SignInPage = () => {
  return (
    <>
      <SignIn />
    </>
  );
=======
import SignIn from '@/containers/AuthCont/SignIn/SignIn';
import React from 'react';

const SignInPage = () => {
  return <div style={{ color: 'var(--main-text)'}}><SignIn/></div>;
>>>>>>> 8673b67 (add server and start auth)
};

export default SignInPage;
