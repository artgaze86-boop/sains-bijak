import type {
  User,
  YearLevel,
  Topic,
  Note,
  Quiz,
  Experiment,
  FlashCard,
  Badge,
  Game,
  DashboardStats,
} from '../types';

const API_BASE = '/api';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function getToken(): string | null {
  return localStorage.getItem('admin_token');
}

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem('admin_token', token);
  } else {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  }
}

export function getStoredUser(): User | null {
  const raw = localStorage.getItem('admin_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setStoredUser(user: User | null) {
  if (user) {
    localStorage.setItem('admin_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('admin_user');
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getToken();
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Ralat rangkaian' }));
    throw new ApiError(error.message || 'Ralat rangkaian', response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

function crud<T extends { id: string }>(resource: string) {
  return {
    getAll: () => request<T[]>(`/admin/${resource}`),
    getById: (id: string) => request<T>(`/admin/${resource}/${id}`),
    create: (data: Omit<T, 'id'> | Partial<T>) =>
      request<T>(`/admin/${resource}`, { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: Partial<T>) =>
      request<T>(`/admin/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: string) => request<void>(`/admin/${resource}/${id}`, { method: 'DELETE' }),
  };
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ user: User; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    me: () => request<User>('/auth/me'),
    logout: () => request<void>('/auth/logout', { method: 'POST' }),
  },

  dashboard: {
    getStats: async (): Promise<DashboardStats> => {
      const data = await request<{
        users: { total: number; students: number; teachers: number; parents: number };
        content: { topics: number };
        engagement: { quizAttempts: number };
      }>('/admin/analytics');
      return {
        totalUsers: data.users.total,
        totalMurid: data.users.students,
        totalTeachers: data.users.teachers,
        totalParents: data.users.parents,
        totalTopics: data.content.topics,
        totalQuizzes: data.content.topics,
        totalQuizAttempts: data.engagement.quizAttempts,
        averageQuizScore: 0,
        activeUsersToday: 0,
        contentByYear: [1, 2, 3, 4, 5, 6].map((year) => ({
          year,
          topics: Math.floor(data.content.topics / 6),
        })),
      };
    },
  },

  yearLevels: crud<YearLevel>('year-levels'),
  topics: crud<Topic>('topics'),
  notes: crud<Note>('notes'),
  quizzes: crud<Quiz>('quizzes'),
  experiments: crud<Experiment>('experiments'),
  games: crud<Game>('games'),
  flashcards: crud<FlashCard>('flashcards'),
  users: crud<User>('users'),
  badges: crud<Badge>('badges'),
};

export { ApiError };