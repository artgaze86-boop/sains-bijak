import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

interface FloatingEmojiProps {
  emoji: string;
  size?: number;
  left: number;
  top: number;
  delay?: number;
}

function FloatingEmoji({ emoji, size = 28, left, top, delay = 0 }: FloatingEmojiProps) {
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withDelay(delay, withTiming(-12, { duration: 2000, easing: Easing.inOut(Easing.sin) })),
        withTiming(12, { duration: 2000, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      true
    );
    rotate.value = withRepeat(
      withSequence(
        withDelay(delay, withTiming(-8, { duration: 3000 })),
        withTiming(8, { duration: 3000 })
      ),
      -1,
      true
    );
  }, [delay, rotate, translateY]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.emoji, { left, top }, style]}>
      <Text style={{ fontSize: size }}>{emoji}</Text>
    </Animated.View>
  );
}

interface FloatingEmojisProps {
  emojis?: string[];
}

export function FloatingEmojis({
  emojis = ['🔬', '🧪', '🌱', '⚡', '🪐', '🦋'],
}: FloatingEmojisProps) {
  const positions = [
    { left: 20, top: 30 },
    { left: 280, top: 50 },
    { left: 60, top: 120 },
    { left: 300, top: 140 },
    { left: 150, top: 20 },
    { left: 220, top: 100 },
  ];

  return (
    <View style={styles.container} pointerEvents="none">
      {emojis.map((emoji, i) => (
        <FloatingEmoji
          key={emoji}
          emoji={emoji}
          left={positions[i % positions.length].left}
          top={positions[i % positions.length].top}
          delay={i * 200}
          size={24 + (i % 3) * 6}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  emoji: {
    position: 'absolute',
    opacity: 0.35,
  },
});