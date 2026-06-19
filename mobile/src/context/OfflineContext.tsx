import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import { Topic, Note, Quiz, Experiment, FlashCard } from '../types';
import {
  getFallbackTopicsByYear,
  getFallbackTopic,
  getFallbackNote,
  getFallbackQuiz,
  getFallbackExperiment,
  getFallbackFlashcards,
} from '../data/offline-fallback';

interface OfflineContextType {
  isOnline: boolean;
  isChecking: boolean;
  cacheTopics: (year: number, topics: Topic[]) => Promise<void>;
  getTopics: (year: number) => Promise<Topic[]>;
  cacheNote: (topicId: string, note: Note) => Promise<void>;
  getNote: (topicId: string) => Promise<Note>;
  cacheQuiz: (topicId: string, quiz: Quiz) => Promise<void>;
  getQuiz: (topicId: string) => Promise<Quiz>;
  cacheExperiment: (topicId: string, experiment: Experiment) => Promise<void>;
  getExperiment: (topicId: string) => Promise<Experiment>;
  cacheFlashcards: (topicId: string, cards: FlashCard[]) => Promise<void>;
  getFlashcards: (topicId: string) => Promise<FlashCard[]>;
  getTopic: (id: string) => Promise<Topic | undefined>;
  cacheTopic: (id: string, topic: Topic) => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

const CACHE_PREFIX = 'offline_cache_';

export function OfflineProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = useCallback(async () => {
    setIsChecking(true);
    try {
      const state = await Network.getNetworkStateAsync();
      setIsOnline(state.isConnected ?? true);
    } catch {
      setIsOnline(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, [checkConnection]);

  async function setCache<T>(key: string, data: T) {
    try {
      await AsyncStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(data));
    } catch (error) {
      console.error('Gagal cache data:', error);
    }
  }

  async function getCache<T>(key: string): Promise<T | null> {
    try {
      const stored = await AsyncStorage.getItem(`${CACHE_PREFIX}${key}`);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  const cacheTopics = useCallback(async (year: number, topics: Topic[]) => {
    await setCache(`topics_${year}`, topics);
  }, []);

  const getTopics = useCallback(async (year: number): Promise<Topic[]> => {
    const cached = await getCache<Topic[]>(`topics_${year}`);
    return cached ?? getFallbackTopicsByYear(year);
  }, []);

  const getTopic = useCallback(async (id: string): Promise<Topic | undefined> => {
    const cached = await getCache<Topic>(`topic_${id}`);
    if (cached) return cached;
    for (let year = 1; year <= 6; year++) {
      const topics = await getTopics(year);
      const found = topics.find((t) => t.id === id);
      if (found) return found;
    }
    return getFallbackTopic(id);
  }, [getTopics]);

  const cacheTopic = useCallback(async (id: string, topic: Topic) => {
    await setCache(`topic_${id}`, topic);
  }, []);

  const cacheNote = useCallback(async (topicId: string, note: Note) => {
    await setCache(`note_${topicId}`, note);
  }, []);

  const getNote = useCallback(async (topicId: string): Promise<Note> => {
    const cached = await getCache<Note>(`note_${topicId}`);
    return cached ?? getFallbackNote(topicId);
  }, []);

  const cacheQuiz = useCallback(async (topicId: string, quiz: Quiz) => {
    await setCache(`quiz_${topicId}`, quiz);
  }, []);

  const getQuiz = useCallback(async (topicId: string): Promise<Quiz> => {
    const cached = await getCache<Quiz>(`quiz_${topicId}`);
    return cached ?? getFallbackQuiz(topicId);
  }, []);

  const cacheExperiment = useCallback(async (topicId: string, experiment: Experiment) => {
    await setCache(`experiment_${topicId}`, experiment);
  }, []);

  const getExperiment = useCallback(async (topicId: string): Promise<Experiment> => {
    const cached = await getCache<Experiment>(`experiment_${topicId}`);
    return cached ?? getFallbackExperiment(topicId);
  }, []);

  const cacheFlashcards = useCallback(async (topicId: string, cards: FlashCard[]) => {
    await setCache(`flashcards_${topicId}`, cards);
  }, []);

  const getFlashcards = useCallback(async (topicId: string): Promise<FlashCard[]> => {
    const cached = await getCache<FlashCard[]>(`flashcards_${topicId}`);
    return cached ?? getFallbackFlashcards(topicId);
  }, []);

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        isChecking,
        cacheTopics,
        getTopics,
        cacheNote,
        getNote,
        cacheQuiz,
        getQuiz,
        cacheExperiment,
        getExperiment,
        cacheFlashcards,
        getFlashcards,
        getTopic,
        cacheTopic,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline mesti digunakan dalam OfflineProvider');
  }
  return context;
}