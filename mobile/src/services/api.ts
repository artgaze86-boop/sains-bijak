import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Topic, Note, Quiz, QuizQuestion, Experiment, FlashCard, Badge, Game, LearningVideo } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3001/api';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = await getStoredToken();
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Ralat rangkaian' }));
    throw new ApiError(error.error || error.message || 'Ralat rangkaian', response.status);
  }

  return response.json();
}

let cachedToken: string | null = null;

async function getStoredToken(): Promise<string | null> {
  if (cachedToken) return cachedToken;
  cachedToken = await AsyncStorage.getItem('auth_token');
  return cachedToken;
}

export function setAuthToken(token: string | null) {
  cachedToken = token;
}

function mapRole(role: string): User['role'] {
  const map: Record<string, User['role']> = {
    STUDENT: 'murid',
    PARENT: 'parent',
    TEACHER: 'teacher',
    ADMIN: 'teacher',
  };
  return map[role] ?? 'murid';
}

function mapUser(raw: Record<string, unknown>): User {
  return {
    id: String(raw.id),
    name: String(raw.name),
    email: String(raw.email),
    role: mapRole(String(raw.role)),
    year: raw.yearLevel != null ? Number(raw.yearLevel) : undefined,
    avatar: (raw.profile as { avatar?: string } | undefined)?.avatar,
  };
}

function mapTopic(raw: Record<string, unknown>): Topic {
  const yearLevel = raw.yearLevel as { year?: number } | undefined;
  const imageUrl = raw.imageUrl ? String(raw.imageUrl) : raw.icon ? String(raw.icon) : undefined;
  return {
    id: String(raw.slug ?? raw.id),
    title: String(raw.title),
    description: String(raw.description ?? ''),
    year: yearLevel?.year ?? Number(raw.year ?? 1),
    imageUrl,
    order: Number(raw.order ?? 0),
  };
}

function parseOptions(raw: unknown): { A: string; B: string; C: string; D: string } {
  const parsed =
    typeof raw === 'string'
      ? (JSON.parse(raw) as Record<string, string>)
      : (raw as Record<string, string>);
  if (parsed.A && parsed.B && parsed.C && parsed.D) {
    return { A: parsed.A, B: parsed.B, C: parsed.C, D: parsed.D };
  }
  if (Array.isArray(parsed)) {
    const arr = parsed as string[];
    return { A: arr[0] ?? '', B: arr[1] ?? '', C: arr[2] ?? '', D: arr[3] ?? '' };
  }
  return { A: '', B: '', C: '', D: '' };
}

function mapQuiz(raw: Record<string, unknown>, topicSlug: string): Quiz {
  const questions =
    (raw.questions as Record<string, unknown>[] | undefined)?.map((q) => ({
      id: String(q.id),
      type: 'multiple_choice' as const,
      question: String(q.question),
      options: parseOptions(q.options),
      correctAnswer: String(q.correctAnswer ?? 'A').toUpperCase(),
      explanation: String(q.explanation ?? ''),
      imageUrl: q.imageUrl ? String(q.imageUrl) : `/images/topics/${topicSlug}.png`,
      points: 10,
    })) ?? [];

  return {
    id: String(raw.id),
    topicId: topicSlug,
    title: String(raw.title),
    questions,
  };
}

function mapNote(raw: Record<string, unknown>, topicSlug: string, topicTitle?: string): Note {
  const keyPoints = Array.isArray(raw.keyPoints)
    ? (raw.keyPoints as string[])
    : typeof raw.keyPoints === 'string'
      ? (JSON.parse(raw.keyPoints) as string[])
      : [];

  const vocabulary = Array.isArray(raw.vocabulary)
    ? (raw.vocabulary as { term: string; definition: string }[])
    : typeof raw.vocabulary === 'string'
      ? (JSON.parse(raw.vocabulary) as { term: string; definition: string }[])
      : [];

  return {
    id: String(raw.id),
    topicId: topicSlug,
    title: topicTitle ?? String(raw.topicTitle ?? 'Nota Topik'),
    content: String(raw.explanation ?? ''),
    keyPoints,
    vocabulary,
    funFact: String(raw.funFact ?? ''),
    recap: String(raw.recap ?? ''),
    imageUrl: raw.imageUrl
      ? String(raw.imageUrl)
      : `/images/topics/${topicSlug}.png`,
  };
}

function mapExperiment(raw: Record<string, unknown>, topicSlug: string): Experiment {
  const parseJson = <T>(val: unknown, fallback: T): T => {
    if (Array.isArray(val)) return val as T;
    if (typeof val === 'string') {
      try {
        return JSON.parse(val) as T;
      } catch {
        return fallback;
      }
    }
    return fallback;
  };

  return {
    id: String(raw.id),
    topicId: topicSlug,
    title: String(raw.title),
    description: String(raw.learningOutcome ?? ''),
    materials: parseJson<string[]>(raw.materials, []),
    steps: parseJson<string[]>(raw.steps, []),
    safetyTips: [String(raw.safetyReminder ?? ''), String(raw.supervisionReminder ?? '')].filter(Boolean),
    funFact: String(raw.learningOutcome ?? ''),
  };
}

function mapVideo(raw: Record<string, unknown>, topicSlug: string): LearningVideo {
  const slides = Array.isArray(raw.slides)
    ? (raw.slides as LearningVideo['slides'])
    : typeof raw.slidesJson === 'string'
      ? (JSON.parse(raw.slidesJson) as LearningVideo['slides'])
      : undefined;

  return {
    id: String(raw.id),
    topicId: topicSlug,
    title: String(raw.title),
    description: String(raw.description ?? ''),
    type: (raw.type as LearningVideo['type']) ?? 'slides',
    youtubeId: raw.youtubeId ? String(raw.youtubeId) : undefined,
    slides,
    durationMin: Number(raw.durationMin ?? 3),
    order: Number(raw.order ?? 1),
    thumbnailUrl: raw.thumbnailUrl ? String(raw.thumbnailUrl) : undefined,
  };
}

function mapFlashcard(raw: Record<string, unknown>, topicSlug: string): FlashCard {
  return {
    id: String(raw.id),
    topicId: topicSlug,
    front: String(raw.front),
    back: String(raw.back),
    emoji: String(raw.category ?? '🃏'),
  };
}

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const res = await request<{ user: Record<string, unknown>; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      return { user: mapUser(res.user), token: res.token };
    },
    register: async (data: { name: string; email: string; password: string; role: string; year?: number }) => {
      const roleMap: Record<string, string> = {
        murid: 'STUDENT',
        parent: 'PARENT',
        teacher: 'TEACHER',
      };
      const res = await request<{ user: Record<string, unknown>; token: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: roleMap[data.role] ?? 'STUDENT',
          yearLevel: data.year,
        }),
      });
      return { user: mapUser(res.user), token: res.token };
    },
    me: async () => {
      const res = await request<Record<string, unknown>>('/auth/me');
      return mapUser(res);
    },
  },

  topics: {
    getByYear: async (year: number) => {
      const data = await request<Record<string, unknown>[]>(`/content/topics?year=${year}`);
      return data.map(mapTopic);
    },
    getBySlug: async (slug: string) => {
      const data = await request<Record<string, unknown>>(`/content/topics/${slug}`);
      return mapTopic(data);
    },
  },

  notes: {
    getByTopic: async (topicSlug: string) => {
      const [topic, data] = await Promise.all([
        request<Record<string, unknown>>(`/content/topics/${topicSlug}`).catch(() => null),
        request<Record<string, unknown>[]>(`/content/topics/${topicSlug}/notes`),
      ]);
      const first = data[0];
      if (!first) throw new ApiError('Nota tidak dijumpai', 404);
      const topicTitle = topic ? String(topic.title ?? '') : undefined;
      return mapNote(first, topicSlug, topicTitle);
    },
  },

  quizzes: {
    getByTopic: async (topicSlug: string) => {
      const list = await request<{ id: string }[]>(`/content/topics/${topicSlug}/quizzes`);
      if (!list.length) throw new ApiError('Kuiz tidak dijumpai', 404);
      const full = await request<Record<string, unknown>>(`/content/quizzes/${list[0].id}`);
      return mapQuiz(full, topicSlug);
    },
    submit: (
      quizId: string,
      topicId: string,
      answers: Record<string, string | string[]>
    ) =>
      request<{ score: number; stars: number; percentage: number }>('/progress/quiz-attempts', {
        method: 'POST',
        body: JSON.stringify({ quizId, topicId, answers }),
      }),
  },

  experiments: {
    getByTopic: async (topicSlug: string) => {
      const data = await request<Record<string, unknown>[]>(`/content/topics/${topicSlug}/experiments`);
      const first = data[0];
      if (!first) throw new ApiError('Eksperimen tidak dijumpai', 404);
      return mapExperiment(first, topicSlug);
    },
  },

  videos: {
    getByTopic: async (topicSlug: string) => {
      const data = await request<Record<string, unknown>[]>(`/content/topics/${topicSlug}/videos`);
      return data.map((v) => mapVideo(v, topicSlug));
    },
    getById: async (videoId: string) => {
      const data = await request<Record<string, unknown>>(`/content/videos/${videoId}`);
      return mapVideo(data, String(data.topicSlug ?? ''));
    },
  },

  flashcards: {
    getByTopic: async (topicSlug: string) => {
      const data = await request<Record<string, unknown>[]>(`/content/topics/${topicSlug}/flashcards`);
      return data.map((c) => mapFlashcard(c, topicSlug));
    },
    favorite: (id: string) =>
      request(`/content/flashcards/${id}/favorite`, { method: 'POST' }),
  },

  badges: {
    getUserBadges: async () => {
      const data = await request<{ badge: Record<string, unknown>; earnedAt: string }[]>('/progress/badges');
      return data.map((ub) => ({
        id: String(ub.badge.id),
        name: String(ub.badge.name),
        description: String(ub.badge.description),
        icon: String(ub.badge.icon),
        earned: true,
        earnedAt: ub.earnedAt,
      })) as Badge[];
    },
  },

  games: {
    getAll: (year?: number) =>
      request<Game[]>(year ? `/content/games?year=${year}` : '/content/games'),
    getById: (id: string) => request<Game>(`/content/games/${id}`),
  },

  progress: {
    get: () => request<Record<string, { completed: boolean; score: number; stars: number }>>('/progress'),
    getSummary: () => request<Record<string, unknown>>('/progress/summary'),
    update: (topicId: string, data: { notesCompleted?: boolean; quizCompleted?: boolean }) =>
      request(`/progress/topic/${topicId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  parent: {
    getDashboard: () => request('/parent/dashboard'),
    getChildren: () => request<User[]>('/parent/children'),
    getChildProgress: (childId: string) =>
      request(`/parent/children/${childId}/progress`),
  },

  teacher: {
    getClasses: () => request('/teacher/classes'),
    getClassPerformance: (classId: string) =>
      request(`/teacher/classes/${classId}/performance`),
  },
};

export { ApiError };