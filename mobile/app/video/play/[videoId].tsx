import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { WebView } from 'react-native-webview';
import { useSettings } from '../../../src/context/SettingsContext';
import { useOffline } from '../../../src/context/OfflineContext';
import { LearningVideo } from '../../../src/types';
import { api } from '../../../src/services/api';
import { SlideVideoPlayer } from '../../../src/components/SlideVideoPlayer';
import { spacing } from '../../../src/theme/spacing';
import { FadeInUp } from '../../../src/components/animations/FadeInUp';

const { width } = Dimensions.get('window');

export default function VideoPlayScreen() {
  const { videoId } = useLocalSearchParams<{ videoId: string }>();
  const { themeColors, textStyles } = useSettings();
  const { isOnline } = useOffline();
  const [video, setVideo] = useState<LearningVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    loadVideo();
  }, [videoId]);

  async function loadVideo() {
    setLoading(true);
    try {
      if (isOnline) {
        setVideo(await api.videos.getById(videoId ?? ''));
      }
    } catch {
      setVideo(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <ActivityIndicator size="large" color={themeColors.primary} style={styles.loader} />;
  }

  if (!video) {
    return (
      <View style={[styles.center, { backgroundColor: themeColors.background }]}>
        <Text style={[textStyles.h3, { color: themeColors.text }]}>Video tidak dijumpai</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: video.title }} />
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        {completed && (
          <FadeInUp>
            <View style={[styles.completeBanner, { backgroundColor: '#E8F5E9' }]}>
              <Text style={[textStyles.h3, { color: themeColors.primary }]}>
                🎉 Tahniah! Video selesai ditonton!
              </Text>
            </View>
          </FadeInUp>
        )}

        {video.type === 'youtube' && video.youtubeId ? (
          <FadeInUp>
            <View style={styles.webviewWrap}>
              <WebView
                style={styles.webview}
                source={{
                  uri: `https://www.youtube.com/embed/${video.youtubeId}?playsinline=1&rel=0&modestbranding=1`,
                }}
                allowsFullscreenVideo
                mediaPlaybackRequiresUserAction={false}
                javaScriptEnabled
              />
            </View>
            <Text style={[textStyles.body, { color: themeColors.textSecondary, padding: spacing.md, textAlign: 'center' }]}>
              {video.description}
            </Text>
          </FadeInUp>
        ) : video.slides && video.slides.length > 0 ? (
          <SlideVideoPlayer slides={video.slides} onComplete={() => setCompleted(true)} />
        ) : (
          <View style={styles.center}>
            <Text style={[textStyles.body, { color: themeColors.textSecondary }]}>
              Kandungan video tidak tersedia.
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  webviewWrap: {
    width,
    height: (width * 9) / 16,
    backgroundColor: '#000',
  },
  webview: { flex: 1 },
  completeBanner: {
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
});