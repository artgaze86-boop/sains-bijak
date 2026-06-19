import { QuestionType } from '@prisma/client';
import { ALL_YEARS_TOPICS } from './topics-content';
import { TopicSeed, getTopicImageUrl } from './content-data';

export interface GeneratedQuestion {
  type: QuestionType;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  imageUrl?: string;
  order: number;
}

export function generateQuizQuestions(topic: TopicSeed, count = 10): GeneratedQuestion[] {
  const year = parseInt(topic.slug.split('-')[1] ?? '1', 10);
  const def = ALL_YEARS_TOPICS[year]?.find((t) => t.title === topic.title);

  if (!def?.quizQuestions?.length) {
    return [];
  }

  return def.quizQuestions.slice(0, count).map((q, index) => ({
    type: QuestionType.MCQ,
    question: q.question,
    options: q.options,
    correctAnswer: q.correct,
    explanation: q.explanation,
    imageUrl: q.imagePrompt ? getTopicImageUrl(topic.slug) : undefined,
    order: index + 1,
  }));
}