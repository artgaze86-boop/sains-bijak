import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettings } from '../../src/context/SettingsContext';
import { useOffline } from '../../src/context/OfflineContext';
import { useProgress } from '../../src/hooks/useProgress';
import { TopicCard } from '../../src/components/TopicCard';
import { fallbackTopics } from '../../src/data/offline-fallback';
import { Topic } from '../../src/types';
import { spacing } from '../../src/theme/spacing';
import { api } from '../../src/services/api';

export default function KuizScreen() {
  const router = useRouter();
  const { themeColors, textStyles } = useSettings();
  const { isOnline, getTopics, cacheTopics } = useOffline();
  const { getTopicProgress } = useProgress();
  const [topics, setTopics] = useState<Topic[]>(fallbackTopics);

  useEffect(() => {
    loadTopics();
  }, []);

  async function loadTopics() {
    const allTopics: Topic[] = [];
    for (let year = 1; year <= 6; year++) {
      try {
        if (isOnline) {
          const yearTopics = await api.topics.getByYear(year);
          await cacheTopics(year, yearTopics);
          allTopics.push(...yearTopics);
        } else {
          const cached = await getTopics(year);
          allTopics.push(...cached);
        }
      } catch {
        const cached = await getTopics(year);
        allTopics.push(...cached);
      }
    }
    if (allTopics.length > 0) setTopics(allTopics);
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[textStyles.h2, { color: themeColors.text }]}>Pusat Kuiz ❓</Text>
      <Text style={[textStyles.body, { color: themeColors.textSecondary, marginBottom: spacing.lg }]}>
        Uji pengetahuan sains kamu!
      </Text>

      <TouchableOpacity
        style={[styles.quickQuiz, { backgroundColor: themeColors.secondary }]}
        onPress={() => router.push('/permainan/kuiz-pantas')}
      >
        <Text style={styles.quickEmoji}>⚡</Text>
        <View>
          <Text style={[textStyles.h3, { color: '#FFFFFF' }]}>Kuiz Pantas</Text>
          <Text style={{ color: 'rgba(255,255,255,0.9)' }}>Jawab secepat mungkin!</Text>
        </View>
      </TouchableOpacity>

      <Text style={[textStyles.h3, { color: themeColors.text, marginTop: spacing.lg, marginBottom: spacing.md }]}>
        Kuiz Mengikut Topik
      </Text>
      {topics.map((topic) => {
        const progress = getTopicProgress(topic.id);
        return (
          <TopicCard
            key={topic.id}
            topic={topic}
            stars={progress.stars}
            completed={progress.completed}
            onPress={() => router.push(`/kuiz/${topic.id}`)}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  quickQuiz: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: 16,
    gap: spacing.md,
  },
  quickEmoji: { fontSize: 40 },
});