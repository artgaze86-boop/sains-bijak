import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getStoredUser, setAuthToken, setStoredUser, api } from '../services/api';

const navItems = [
  { to: '/', icon: '📊', label: 'Dashboard', end: true },
  { to: '/year-levels', icon: '📚', label: 'Tahun Darjah' },
  { to: '/topics', icon: '📖', label: 'Topik' },
  { to: '/notes', icon: '📝', label: 'Nota' },
  { to: '/quizzes', icon: '❓', label: 'Kuiz' },
  { to: '/experiments', icon: '🔬', label: 'Eksperimen' },
  { to: '/games', icon: '🎮', label: 'Permainan' },
  { to: '/flashcards', icon: '🃏', label: 'Kad Imbas' },
  { to: '/users', icon: '👥', label: 'Pengguna' },
  { to: '/badges', icon: '🏅', label: 'Lencana' },
];

export default function Layout() {
  const navigate = useNavigate();
  const user = getStoredUser();

  async function handleLogout() {
    try {
      await api.auth.logout();
    } catch {
      // ignore offline errors
    }
    setAuthToken(null);
    setStoredUser(null);
    navigate('/login');
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h1>🔬 Sains Bijak</h1>
          <span>Panel Pentadbir</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            👤 {user?.name ?? 'Admin'}
            <br />
            <small>{user?.email}</small>
          </div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleLogout}>
            Log Keluar
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}