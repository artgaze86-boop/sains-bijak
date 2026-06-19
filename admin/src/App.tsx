import { Navigate, Route, Routes } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import YearLevels from './pages/YearLevels';
import Topics from './pages/Topics';
import Notes from './pages/Notes';
import Quizzes from './pages/Quizzes';
import Experiments from './pages/Experiments';
import Games from './pages/Games';
import Flashcards from './pages/Flashcards';
import Users from './pages/Users';
import Badges from './pages/Badges';
import { getStoredUser, getToken } from './services/api';

function AuthGuard({ children }: { children: ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    const user = getStoredUser();
    const isAdmin = user?.role === 'admin' || user?.role === 'teacher';
    setAuthenticated(!!token && !!user && isAdmin);
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="login-page">
        <div className="table-loading">Memeriksa sesi...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="year-levels" element={<YearLevels />} />
        <Route path="topics" element={<Topics />} />
        <Route path="notes" element={<Notes />} />
        <Route path="quizzes" element={<Quizzes />} />
        <Route path="experiments" element={<Experiments />} />
        <Route path="games" element={<Games />} />
        <Route path="flashcards" element={<Flashcards />} />
        <Route path="users" element={<Users />} />
        <Route path="badges" element={<Badges />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}