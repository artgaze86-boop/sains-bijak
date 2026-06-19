import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { borderRadius, shadows, spacing } from '../theme/spacing';
import { useSettings } from '../context/SettingsContext';

interface FlashCardProps {
  front: string;
  back: string;
  emoji: string;
  onFlip?: () => void;
}

export function FlashCard({ front, back, emoji, onFlip }: FlashCardProps) {
  const { themeColors, textStyles } = useSettings();
  const [isFlipped, setIsFlipped] = useState(false);
  const rotation = useSharedValue(0);

  const handleFlip = () => {
    const next = !isFlipped;
    rotation.value = withTiming(next ? 180 : 0, { duration: 400 });
    setIsFlipped(next);
    onFlip?.();
  };

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(rotation.value, [0, 180], [0, 180])}deg` }],
    opacity: interpolate(rotation.value, [0, 90, 180], [1, 0, 0]),
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${interpolate(rotation.value, [0, 180], [180, 360])}deg` }],
    opacity: interpolate(rotation.value, [0, 90, 180], [0, 0, 1]),
  }));

  return (
    <TouchableOpacity onPress={handleFlip} activeOpacity={0.9} style={styles.wrapper}>
      <Animated.View
        style={[
          styles.card,
          { backgroundColor: themeColors.primary },
          frontStyle,
          shadows.lg,
        ]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={[textStyles.h2, styles.cardText]}>{front}</Text>
        <Text style={styles.hint}>👆 Ketik untuk balik</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.card,
          styles.cardBack,
          { backgroundColor: themeColors.secondary },
          backStyle,
          shadows.lg,
        ]}
      >
        <Text style={[textStyles.bodyLarge, styles.cardText]}>{back}</Text>
        <Text style={styles.hint}>👆 Ketik untuk balik</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 280,
    marginVertical: spacing.md,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    position: 'absolute',
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  cardText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  hint: {
    position: 'absolute',
    bottom: spacing.md,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
});