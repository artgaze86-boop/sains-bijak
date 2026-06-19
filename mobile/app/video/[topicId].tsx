import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSettings } from '../../src/context/SettingsContext';
import { useOffline } from '../../src/context/OfflineContext';
import { LearningVideo } from '../../src/types';
import { api } from '../../src/services/api';
import { resolveImageUri } from '../../src/components/TopicImage';
import { spacing, borderRadius, shadows } from '../../src/theme/spacing';
import { FadeInUp } from '../../src/components/animations/FadeInUp';
import { BouncePressable } from '../../src/components/animations/BouncePressable';

export default function VideoListScreen() {
  const { topicId } = useLocalSearchParams<{ topicId: string }>();
  const router = useRouter();
  const { themeColors, textStyles } = useSettings();
  const { isOnline } = useOffline();
  const [videos, setVideos] = useState<LearningVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, [topicId]);

  async function loadVideos() {
    setLoading(true);
    try {
      if (isOnline) {
        setVideos(await api.videos.getByTopic(topicId ?? ''));
      }
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <ActivityIndicator size="large" color={themeColors.primary} style={styles.loader} />;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <FadeInUp>
        <Text style={[textStyles.h2, { color: themeColors.text }]}>🎬 Video Pembelajaran</Text>
        <Text style={[textStyles.body, { color: themeColors.textSecondary, marginBottom: spacing.lg }]}>
          Tonton video animasi dan rujukan untuk topik ini
        </Text>
      </FadeInUp>

      {videos.length === 0 ? (
        <FadeInUp delay={200}>
          <View style={[styles.empty, { backgroundColor: themeColors.surface }]}>
            <Text style={{ fontSize: 48 }}>📡</Text>
            <Text style={[textStyles.body, { color: themeColors.textSecondary, textAlign: 'center' }]}>
              Sambung internet untuk memuatkan video pembelajaran.
            </Text>
          </View>
        </FadeInUp>
      ) : (
        videos.map((video, i) => (
          <FadeInUp key={video.id} delay={150 + i * 100}>
            <BouncePressable
              style={[styles.card, { backgroundColor: themeColors.surface }, shadows.md]}
              onPress={() => router.push(`/video/play/${video.id}` as never)}
            >
              {video.thumbnailUrl ? (
                <Image
                  source={{ uri: resolveImageUri(video.thumbnailUrl) }}
                  style={styles.thumb}
                  resizeMode="cover"
                />
              ) : (
                <View style={[styles.thumb, styles.thumbPlaceholder]}>
                  <Text style={{ fontSize: 40 }}>{video.type === 'youtube' ? '▶️' : '🎞️'}</Text>
                </View>
              )}
              <View style={styles.cardBody}>
                <View style={[styles.badge, { backgroundColor: video.type === 'youtube' ? '#FF000020' : '#9C27B020' }]}>
                  <Text style={[textStyles.caption, { color: video.type === 'youtube' ? '#CC0000' : '#9C27B0', fontWeight: '700' }]}>
                    {video.type === 'youtube' ? 'YouTube' : 'Animasi'}
                  </Text>
                </View>
                <Text style={[textStyles.h3, { color: themeColors.text }]}>{video.title}</Text>
                <Text style={[textStyles.caption, { color: themeColors.textSecondary }]} numberOfLines={2}>
                  {video.description}
                </Text>
                <Text style={[textStyles.caption, { color: themeColors.primary, marginTop: spacing.xs }]}>
                  ⏱ {video.durationMin} min • Ketik untuk tonton
                </Text>
              </View>
            </BouncePressable>
          </FadeInUp>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  loader: { flex: 1, justifyContent: 'center' },
  empty: {
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  thumb: { width: 120, height: 100 },
  thumbPlaceholder: {
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: { flex: 1, padding: spacing.md },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
});