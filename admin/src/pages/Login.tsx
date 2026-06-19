import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { api, setAuthToken, setStoredUser, getToken, getStoredUser } from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = getToken();
  const user = getStoredUser();
  if (token && user && (user.role === 'admin' || user.role === 'teacher')) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user: loggedIn, token: authToken } = await api.auth.login(email, password);

      if (loggedIn.role !== 'admin' && loggedIn.role !== 'teacher') {
        setError('Akses ditolak. Hanya pentadbir atau guru dibenarkan.');
        return;
      }

      setAuthToken(authToken);
      setStoredUser(loggedIn);
      navigate('/');
    } catch {
      setError('Log masuk gagal. Semak e-mel dan kata laluan anda.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <span className="emoji">🔬</span>
          <h1>Sains Tahun 1-6 Bijak</h1>
          <p>Panel Pentadbir</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mel</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sainsbijak.my"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Kata Laluan</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Log masuk...' : 'Log Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
}