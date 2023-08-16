import ContentLink from '@/uikit/ContentLink';
import React from 'react';

const Home = () => {
  return (
    <section>
      <ContentLink to="registr">Registration</ContentLink>
      <ContentLink to="signin">Sign In</ContentLink>
    </section>
  );
};

export default Home;
