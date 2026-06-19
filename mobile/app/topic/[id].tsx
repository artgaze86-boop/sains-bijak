import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useSettings } from '../../src/context/SettingsContext';
import { useOffline } from '../../src/context/OfflineContext';
import { useProgress } from '../../src/hooks/useProgress';
import { StarRating } from '../../src/components/StarRating';
import { BadgeCard } from '../../src/components/BadgeCard';
import { Topic, Badge } from '../../src/types';
import { yearColors } from '../../src/theme/colors';
import { spacing, borderRadius, shadows } from '../../src/theme/spacing';
import { getFallbackBadges } from '../../src/data/offline-fallback';
import { api } from '../../src/services/api';
import { TopicImage } from '../../src/components/TopicImage';
import { FadeInUp } from '../../src/components/animations/FadeInUp';
import { ScaleIn } from '../../src/components/animations/ScaleIn';
import { BouncePressable } from '../../src/components/animations/BouncePressable';

const hubItems = [
  { id: 'nota', title: 'Nota', label: 'N', route: 'nota', color: '#4CAF50' },
  { id: 'video', title: 'Video', label: 'V', route: 'video', color: '#9C27B0' },
  { id: 'kuiz', title: 'Kuiz', label: 'K', route: 'kuiz', color: '#FF9800' },
  { id: 'eksperimen', title: 'Eksperimen', label: 'E', route: 'eksperimen', color: '#2196F3' },
  { id: 'permainan', title: 'Permainan', label: 'P', route: 'permainan', color: '#E91E63' },
  { id: 'kad-imbas', title: 'Kad Imbas', label: 'I', route: 'kad-imbas', color: '#673AB7' },
  { id: 'lencana', title: 'Lencana', label: 'L', route: 'lencana', color: '#FFC107' },
];

export default function TopicHubScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { themeColors, textStyles } = useSettings();
  const { isOnline, getTopic, cacheTopic } = useOffline();
  const { getTopicProgress } = useProgress();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBadges, setShowBadges] = useState(false);

  useEffect(() => {
    loadTopic();
  }, [id]);

  async function loadTopic() {
    setLoading(true);
    try {
      if (isOnline) {
        const data = await api.topics.getBySlug(id ?? '');
        await cacheTopic(id ?? '', data);
        setTopic(data);
      } else {
        setTopic((await getTopic(id ?? '')) ?? null);
      }
    } catch {
      setTopic((await getTopic(id ?? '')) ?? null);
    }
    setBadges(getFallbackBadges(id ?? ''));
    setLoading(false);
  }

  if (loading) {
    return <ActivityIndicator size="large" color={themeColors.primary} style={styles.loader} />;
  }

  if (!topic) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <Text style={[textStyles.h3, { color: themeColors.text, textAlign: 'center' }]}>
          Topik tidak dijumpai
        </Text>
      </View>
    );
  }

  const progress = getTopicProgress(topic.id);
  const accentColor = yearColors[topic.year] ?? themeColors.primary;

  const handleHubPress = (item: typeof hubItems[0]) => {
    if (item.id === 'lencana') {
      setShowBadges(!showBadges);
      return;
    }
    if (item.id === 'permainan') {
      const gameId = topic.year === 1 ? 'padankan-haiwan' : topic.year === 5 ? 'susun-planet' : 'kuiz-pantas';
      router.push(`/permainan/${gameId}`);
      return;
    }
    if (item.id === 'kad-imbas') {
      router.push(`/kad-imbas/${topic.id}`);
      return;
    }
    if (item.id === 'video') {
      router.push(`/video/${topic.id}` as never);
      return;
    }
    router.push(`/${item.route}/${topic.id}` as `/nota/${string}`);
  };

  return (
    <>
      <Stack.Screen options={{ title: topic.title, headerStyle: { backgroundColor: accentColor } }} />
      <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
        <FadeInUp>
          <View style={[styles.header, { backgroundColor: accentColor }]}>
            <TopicImage imageUrl={topic.imageUrl ?? topic.icon} size={100} />
            <Text style={[textStyles.h2, { color: '#FFFFFF' }]}>{topic.title}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center' }}>{topic.description}</Text>
            <View style={styles.starsRow}>
              <StarRating rating={progress.stars} size={28} />
              {progress.completed && <Text style={styles.completedText}>✅ Selesai</Text>}
            </View>
          </View>
        </FadeInUp>

        <View style={styles.hubGrid}>
          {hubItems.map((item, index) => (
            <ScaleIn key={item.id} delay={index * 80} style={styles.hubItemWrap}>
              <BouncePressable
                style={[styles.hubItem, { backgroundColor: themeColors.surface }, shadows.sm]}
                onPress={() => handleHubPress(item)}
              >
                <View style={[styles.hubIcon, { backgroundColor: item.color + '20' }]}>
                  <Text style={[styles.hubLabel, { color: item.color }]}>{item.label}</Text>
                </View>
                <Text style={[textStyles.body, { color: themeColors.text, fontWeight: '600' }]}>
                  {item.title}
                </Text>
              </BouncePressable>
            </ScaleIn>
          ))}
        </View>

        {showBadges && (
          <View style={styles.badgesSection}>
            <Text style={[textStyles.h3, { color: themeColors.text, marginBottom: spacing.md }]}>
              Lencana 🏅
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {badges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center' },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topicIcon: { fontSize: 64, marginBottom: spacing.sm },
  starsRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md, gap: spacing.sm },
  completedText: { color: '#FFFFFF', fontWeight: '600' },
  hubGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.sm,
    justifyContent: 'center',
  },
  hubItemWrap: {
    width: '30%',
    minWidth: 100,
  },
  hubItem: {
    width: '100%',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  hubIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  hubLabel: { fontSize: 22, fontWeight: '800' },
  badgesSection: { padding: spacing.md },
});