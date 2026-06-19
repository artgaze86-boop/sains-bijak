import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { VideoSlide } from '../types';
import { resolveImageUri } from './TopicImage';
import { spacing, borderRadius } from '../theme/spacing';
import { useSettings } from '../context/SettingsContext';
import { ProgressBar } from './ProgressBar';

interface SlideVideoPlayerProps {
  slides: VideoSlide[];
  onComplete?: () => void;
}

const SLIDE_DURATION_MS = 5000;

export function SlideVideoPlayer({ slides, onComplete }: SlideVideoPlayerProps) {
  const { themeColors, textStyles, speak } = useSettings();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const opacity = useSharedValue(1);

  const current = slides[index];
  const progress = slides.length > 0 ? Math.round(((index + 1) / slides.length) * 100) : 0;

  const goNext = useCallback(() => {
    if (index < slides.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setPlaying(false);
      onComplete?.();
    }
  }, [index, slides.length, onComplete]);

  const animateToNext = useCallback(() => {
    opacity.value = withTiming(0, { duration: 300 }, (finished) => {
      if (finished) {
        runOnJS(goNext)();
        opacity.value = withTiming(1, { duration: 400 });
      }
    });
  }, [goNext, opacity]);

  useEffect(() => {
    if (!playing || !current) return;
    speak(current.narration ?? current.text);
    const timer = setTimeout(animateToNext, SLIDE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [index, playing, current, animateToNext, speak]);

  if (!current) return null;

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} label={`Slaid ${index + 1} / ${slides.length}`} />

      <Animated.View style={[styles.slide, animatedStyle]}>
        <Image
          source={{ uri: resolveImageUri(current.imageUrl) }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={[styles.textBox, { backgroundColor: themeColors.surface }]}>
          <Text style={[textStyles.bodyLarge, { color: themeColors.text, lineHeight: 28, textAlign: 'center' }]}>
            {current.text}
          </Text>
        </View>
      </Animated.View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.ctrlBtn, { backgroundColor: themeColors.primary }]}
          onPress={() => setPlaying((p) => !p)}
        >
          <Text style={styles.ctrlText}>{playing ? '⏸ Jeda' : '▶ Main'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.ctrlBtn, { backgroundColor: themeColors.secondary }]}
          onPress={() => {
            if (index > 0) setIndex(index - 1);
          }}
          disabled={index === 0}
        >
          <Text style={styles.ctrlText}>◀ Sebelum</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.ctrlBtn, { backgroundColor: themeColors.accent }]}
          onPress={animateToNext}
        >
          <Text style={styles.ctrlText}>Seterusnya ▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  slide: { flex: 1, marginTop: spacing.md },
  image: {
    width: '100%',
    height: 220,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  textBox: {
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    minHeight: 120,
    justifyContent: 'center',
  },
  controls: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  ctrlBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    minWidth: 100,
    alignItems: 'center',
  },
  ctrlText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});