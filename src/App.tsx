import ConversationsPage from '@/pages/ConversationsPage';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './containers/Layout';
import RequireAuth from './hoc/RequireAuth';
import AccountPage from './pages/AccountPage';
import AllLeaguesPage from './pages/AllLeaguesPage';
import AuthPage from './pages/AuthPage';
import LeaguePage from './pages/LeaguePage';
import NewsPage from './pages/NewsPage';
import ObservationPage from './pages/ObservationPage';
import PlayerPage from './pages/PlayerPage';
import RevealNewsPage from './pages/RevealNewsPage';
import SearchPage from './pages/SearchPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import SquadPage from './pages/SquadPage';
import TasksPage from './pages/TasksPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AuthPage />} />
        <Route path="registr" element={<SignUpPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route
          path="account"
          element={
            <RequireAuth>
              <AccountPage />
            </RequireAuth>
          }
        >
          <Route path="todo" element={<TasksPage />} />
          <Route path="observe" element={<ObservationPage />} />
        </Route>
        <Route path="leagues" element={<AllLeaguesPage />} />
        <Route path="leagues/all" element={<Navigate to="/leagues" replace />} />
        <Route path="leagues/:country/:id" element={<LeaguePage />} />
        <Route path="squad/:id" element={<SquadPage />} />
        <Route path="player/:id" element={<PlayerPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:id" element={<RevealNewsPage />} />
        <Route
          path="messages"
          element={
            <RequireAuth>
              <ConversationsPage />
            </RequireAuth>
          }
        />
        <Route path="search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
};

export default App;
