import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './containers/Layout';
import RequireAuth from './hoc/RequireAuth';
import AccountPage from './pages/AccountPage';
import AllLeaguesPage from './pages/AllLeaguesPage';
import EditPage from './pages/EditPage';
import HomePage from './pages/HomePage';
import LeaguePage from './pages/LeaguePage';
import NewsPage from './pages/NewsPage';
import ObservePage from './pages/ObservePage';
import PlayerPage from './pages/PlayerPage';
import RegistrationPage from './pages/RegistrationPage';
import SignInPage from './pages/SignInPage';
import SquadPage from './pages/SquadPage';
import ToDoPage from './pages/ToDoPage';
import VideosPage from './pages/VideosPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="account"
          element={
            <RequireAuth>
              <AccountPage />
            </RequireAuth>
          }
        >
          <Route path="todo" element={<ToDoPage />} />
          <Route path="observe" element={<ObservePage />} />
          <Route path="edit" element={<EditPage />} />
        </Route>
        <Route path="leagues" element={<AllLeaguesPage />} />
        <Route path="leagues/all" element={<Navigate to="/leagues" replace />} />
        <Route path="leagues/:country/:id" element={<LeaguePage />} />
        <Route path="squad/:id" element={<SquadPage />} />
        <Route path="player/:id" element={<PlayerPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="videos" element={<VideosPage />} />
        <Route path="registr" element={<RegistrationPage />} />
        <Route path="signin" element={<SignInPage />} />
      </Route>
    </Routes>
  );
};

export default App;
