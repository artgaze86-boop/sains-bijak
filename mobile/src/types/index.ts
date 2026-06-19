export type UserRole = 'murid' | 'parent' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  year?: number;
  avatar?: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  year: number;
  icon?: string;
  imageUrl?: string;
  order: number;
}

export interface VocabularyTerm {
  term: string;
  definition: string;
}

export interface Note {
  id: string;
  topicId: string;
  title: string;
  content: string;
  keyPoints: string[];
  vocabulary: VocabularyTerm[];
  funFact: string;
  recap: string;
  imageUrl?: string;
}

export type QuestionType = 'multiple_choice';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[] | { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  explanation: string;
  imageUrl?: string;
  points: number;
}

export interface Quiz {
  id: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit?: number;
}

export interface VideoSlide {
  text: string;
  imageUrl: string;
  narration?: string;
}

export interface LearningVideo {
  id: string;
  topicId: string;
  title: string;
  description: string;
  type: 'slides' | 'youtube';
  youtubeId?: string;
  slides?: VideoSlide[];
  durationMin: number;
  order: number;
  thumbnailUrl?: string;
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
  earned: boolean;
  earnedAt?: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  type: 'match' | 'sort' | 'speed_quiz';
  topicId?: string;
  year?: number;
}

export interface Progress {
  topicId: string;
  completed: boolean;
  score: number;
  stars: number;
  lastAccessed: string;
}

export interface YearData {
  year: number;
  title: string;
  topics: Topic[];
}