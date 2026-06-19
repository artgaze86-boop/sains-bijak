import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { useOffline } from '../context/OfflineContext';

export interface TopicProgress {
  completed: boolean;
  score: number;
  stars: number;
  lastAccessed: string;
}

type ProgressMap = Record<string, TopicProgress>;

const PROGRESS_KEY = 'user_progress';

export function useProgress() {
  const { isOnline } = useOffline();
  const [progress, setProgress] = useState<ProgressMap>({});
  const [isLoading, setIsLoading] = useState(true);

  const loadProgress = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isOnline) {
        try {
          const serverProgress = await api.progress.get();
          const mapped: ProgressMap = {};
          Object.entries(serverProgress).forEach(([topicId, data]) => {
            mapped[topicId] = {
              ...data,
              lastAccessed: new Date().toISOString(),
            };
          });
          setProgress(mapped);
          await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(mapped));
          return;
        } catch {
          // fall through to local
        }
      }
      const stored = await AsyncStorage.getItem(PROGRESS_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Gagal memuatkan kemajuan:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isOnline]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const updateProgress = useCallback(
    async (topicId: string, updates: Partial<TopicProgress>) => {
      setProgress((prev) => {
        const current = prev[topicId] ?? {
          completed: false,
          score: 0,
          stars: 0,
          lastAccessed: new Date().toISOString(),
        };
        const updated: TopicProgress = {
          ...current,
          ...updates,
          lastAccessed: new Date().toISOString(),
        };
        const newProgress = { ...prev, [topicId]: updated };
        AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));

        if (isOnline) {
          api.progress
            .update(topicId, {
              notesCompleted: updates.completed,
              quizCompleted: updates.completed || (updates.stars ?? 0) > 0,
            })
            .catch(() => {});
        }

        return newProgress;
      });
    },
    [isOnline]
  );

  const getTopicProgress = useCallback(
    (topicId: string): TopicProgress => {
      return (
        progress[topicId] ?? {
          completed: false,
          score: 0,
          stars: 0,
          lastAccessed: '',
        }
      );
    },
    [progress]
  );

  const getYearProgress = useCallback(
    (year: number, topicIds: string[]) => {
      if (topicIds.length === 0) return { completed: 0, total: 0, percentage: 0, avgStars: 0 };
      const yearProgress = topicIds.map((id) => progress[id]).filter(Boolean);
      const completed = yearProgress.filter((p) => p.completed).length;
      const totalStars = yearProgress.reduce((sum, p) => sum + p.stars, 0);
      return {
        completed,
        total: topicIds.length,
        percentage: Math.round((completed / topicIds.length) * 100),
        avgStars: yearProgress.length > 0 ? totalStars / yearProgress.length : 0,
      };
    },
    [progress]
  );

  const getTotalStats = useCallback(() => {
    const all = Object.values(progress);
    const completed = all.filter((p) => p.completed).length;
    const totalStars = all.reduce((sum, p) => sum + p.stars, 0);
    const totalScore = all.reduce((sum, p) => sum + p.score, 0);
    return {
      topicsCompleted: completed,
      totalTopics: all.length,
      totalStars,
      totalScore,
      badgesEarned: Math.floor(totalStars / 3),
    };
  }, [progress]);

  return {
    progress,
    isLoading,
    updateProgress,
    getTopicProgress,
    getYearProgress,
    getTotalStats,
    refresh: loadProgress,
  };
}