import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './containers/Layout';
import AccountPage from './pages/AccountPage';
import AllLeaguesPage from './pages/AllLeaguesPage';
import CountryPage from './pages/CountryPage';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import SignInPage from './pages/SignInPage';
import VideosPage from './pages/VideosPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="account/*" element={<AccountPage />}>
          <Route index element={<p>Todo list</p>} />
          <Route path="todo" element={<p>Todo list</p>} />
          <Route path="observe" element={<p>Observe list</p>} />
        </Route>
        <Route path="leagues" element={<AllLeaguesPage />} />
        <Route path="leagues/all-leagues" element={<AllLeaguesPage />} />
        <Route path="leagues/:country" element={<CountryPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="videos" element={<VideosPage />} />
        <Route path="signin" element={<SignInPage />} />
      </Route>
    </Routes>
  );
};

export default App;
