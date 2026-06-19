import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import { api } from '../services/api';
import type { DashboardStats } from '../types';

const YEAR_COLORS: Record<number, string> = {
  1: '#FF6B6B',
  2: '#4ECDC4',
  3: '#45B7D1',
  4: '#96CEB4',
  5: '#FFEAA7',
  6: '#DDA0DD',
};

const defaultStats: DashboardStats = {
  totalUsers: 0,
  totalMurid: 0,
  totalTeachers: 0,
  totalParents: 0,
  totalTopics: 0,
  totalQuizzes: 0,
  totalQuizAttempts: 0,
  averageQuizScore: 0,
  activeUsersToday: 0,
  contentByYear: [],
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.dashboard
      .getStats()
      .then(setStats)
      .catch(() => setError('Tidak dapat memuatkan statistik. Pastikan pelayan API berjalan.'))
      .finally(() => setLoading(false));
  }, []);

  const maxTopics = Math.max(...stats.contentByYear.map((y) => y.topics), 1);

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Ringkasan analitik aplikasi Sains Tahun 1-6 Bijak</p>
      </div>

      {error && <div className="alert alert-info">{error}</div>}

      <div className="stat-grid">
        <StatCard icon="👥" label="Jumlah Pengguna" value={loading ? '...' : stats.totalUsers} />
        <StatCard icon="🎒" label="Murid" value={loading ? '...' : stats.totalMurid} color="orange" />
        <StatCard icon="👨‍🏫" label="Guru" value={loading ? '...' : stats.totalTeachers} color="blue" />
        <StatCard icon="👨‍👩‍👧" label="Ibu Bapa" value={loading ? '...' : stats.totalParents} color="purple" />
        <StatCard icon="📖" label="Jumlah Topik" value={loading ? '...' : stats.totalTopics} />
        <StatCard icon="❓" label="Jumlah Kuiz" value={loading ? '...' : stats.totalQuizzes} color="orange" />
        <StatCard icon="📝" label="Percubaan Kuiz" value={loading ? '...' : stats.totalQuizAttempts} color="blue" />
        <StatCard
          icon="⭐"
          label="Purata Skor Kuiz"
          value={loading ? '...' : `${stats.averageQuizScore}%`}
          color="pink"
        />
        <StatCard
          icon="🟢"
          label="Aktif Hari Ini"
          value={loading ? '...' : stats.activeUsersToday}
          color="green"
        />
      </div>

      <div className="chart-card">
        <h3>📊 Kandungan Mengikut Tahun</h3>
        {loading ? (
          <p className="table-loading">Memuatkan...</p>
        ) : stats.contentByYear.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>Tiada data tahun darjah.</p>
        ) : (
          stats.contentByYear.map((item) => (
            <div key={item.year} className="year-bar">
              <span className="year-bar-label">Tahun {item.year}</span>
              <div className="year-bar-track">
                <div
                  className="year-bar-fill"
                  style={{
                    width: `${(item.topics / maxTopics) * 100}%`,
                    background: YEAR_COLORS[item.year] ?? 'var(--primary)',
                  }}
                >
                  {item.topics} topik · {item.quizzes} kuiz
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}