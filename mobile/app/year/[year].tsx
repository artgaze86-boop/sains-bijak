import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useSettings } from '../../src/context/SettingsContext';
import { useOffline } from '../../src/context/OfflineContext';
import { useProgress } from '../../src/hooks/useProgress';
import { TopicCard } from '../../src/components/TopicCard';
import { ProgressBar } from '../../src/components/ProgressBar';
import { Topic } from '../../src/types';
import { yearColors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { api } from '../../src/services/api';
import { FadeInUp } from '../../src/components/animations/FadeInUp';

const MODE_LABELS: Record<string, { emoji: string; label: string }> = {
  nota: { emoji: '📝', label: 'Nota' },
  eksperimen: { emoji: '🧪', label: 'Eksperimen' },
  'kad-imbas': { emoji: '🃏', label: 'Kad Imbas' },
  video: { emoji: '🎬', label: 'Video' },
};

export default function YearScreen() {
  const { year, mode } = useLocalSearchParams<{ year: string; mode?: string }>();
  const yearNum = parseInt(year ?? '1', 10);
  const router = useRouter();
  const { themeColors, textStyles } = useSettings();
  const { isOnline, getTopics, cacheTopics } = useOffline();
  const { getTopicProgress, getYearProgress } = useProgress();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopics();
  }, [yearNum]);

  async function loadTopics() {
    setLoading(true);
    try {
      if (isOnline) {
        const data = await api.topics.getByYear(yearNum);
        await cacheTopics(yearNum, data);
        setTopics(data);
      } else {
        setTopics(await getTopics(yearNum));
      }
    } catch {
      setTopics(await getTopics(yearNum));
    } finally {
      setLoading(false);
    }
  }

  const yearProgress = getYearProgress(
    yearNum,
    topics.map((t) => t.id)
  );
  const accentColor = yearColors[yearNum] ?? themeColors.primary;
  const modeInfo = mode ? MODE_LABELS[mode] : undefined;

  const handleTopicPress = (topic: Topic) => {
    if (mode === 'video') {
      router.push(`/video/${topic.id}` as never);
      return;
    }
    if (mode === 'nota') {
      router.push(`/nota/${topic.id}`);
      return;
    }
    if (mode === 'eksperimen') {
      router.push(`/eksperimen/${topic.id}`);
      return;
    }
    if (mode === 'kad-imbas') {
      router.push(`/kad-imbas/${topic.id}`);
      return;
    }
    router.push(`/topic/${topic.id}`);
  };

  return (
    <>
      <Stack.Screen options={{ title: `Tahun ${yearNum}`, headerStyle: { backgroundColor: accentColor } }} />
      <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
        <FadeInUp>
        <View style={[styles.header, { backgroundColor: accentColor }]}>
          <Text style={styles.headerEmoji}>{modeInfo?.emoji ?? '📚'}</Text>
          <Text style={[textStyles.h2, { color: '#FFFFFF' }]}>Sains Tahun {yearNum}</Text>
          <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
            {modeInfo ? `Mod ${modeInfo.label} • ${topics.length} topik` : `${topics.length} topik tersedia`}
          </Text>
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={yearProgress.percentage}
              label="Kemajuan tahun ini"
              color="#FFFFFF"
            />
          </View>
        </View>
        </FadeInUp>

        {loading ? (
          <ActivityIndicator size="large" color={accentColor} style={styles.loader} />
        ) : (
          <View style={styles.topicList}>
            {topics.map((topic, index) => {
              const progress = getTopicProgress(topic.id);
              return (
                <FadeInUp key={topic.id} delay={index * 60}>
                  <TopicCard
                    topic={topic}
                    stars={progress.stars}
                    completed={progress.completed}
                    onPress={() => handleTopicPress(topic)}
                  />
                </FadeInUp>
              );
            })}
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerEmoji: { fontSize: 48, marginBottom: spacing.sm },
  progressContainer: { width: '100%', marginTop: spacing.md },
  loader: { marginTop: spacing.xxl },
  topicList: { padding: spacing.md },
});