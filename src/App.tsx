import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './containers/Layout';
import LeaguesPage from './pages/LeaguesPage';
import NewsPage from './pages/NewsPage';
import ObserveListPage from './pages/ObserveListPage';
import SignInPage from './pages/SignInPage';
import VideosPage from './pages/VideosPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ObserveListPage />} />
          <Route path="/leagues" element={<LeaguesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
