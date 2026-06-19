export type UserRole = 'murid' | 'parent' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  year?: number;
  avatar?: string;
  password?: string;
  createdAt?: string;
}

export interface YearLevel {
  id: string;
  year: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  active: boolean;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  year: number;
  icon: string;
  order: number;
}

export interface Note {
  id: string;
  topicId: string;
  title: string;
  content: string;
  keyPoints: string[];
  funFact: string;
  imageUrl?: string;
}

export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'fill_blank'
  | 'matching'
  | 'ordering';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface Quiz {
  id: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit?: number;
}

export interface Experiment {
  id: string;
  topicId: string;
  title: string;
  description: string;
  materials: string[];
  steps: string[];
  safetyTips: string[];
  funFact: string;
}

export interface FlashCard {
  id: string;
  topicId: string;
  front: string;
  back: string;
  emoji: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  topicId?: string;
  criteria?: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  type: 'match' | 'sort' | 'speed_quiz';
  topicId?: string;
  year?: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalMurid: number;
  totalTeachers: number;
  totalParents: number;
  totalTopics: number;
  totalQuizzes: number;
  totalQuizAttempts: number;
  averageQuizScore: number;
  activeUsersToday: number;
  contentByYear: { year: number; topics: number; quizzes: number }[];
}