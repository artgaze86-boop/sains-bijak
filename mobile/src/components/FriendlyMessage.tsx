import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { borderRadius, spacing } from '../theme/spacing';
import { useSettings } from '../context/SettingsContext';

type MessageType = 'success' | 'error' | 'info' | 'encourage';

interface FriendlyMessageProps {
  type: MessageType;
  message: string;
  title?: string;
}

const messageConfig: Record<MessageType, { emoji: string; bgColor: string; borderColor: string }> = {
  success: { emoji: '🎉', bgColor: '#E8F5E9', borderColor: '#4CAF50' },
  error: { emoji: '💪', bgColor: '#FFF3E0', borderColor: '#FF9800' },
  info: { emoji: '💡', bgColor: '#E3F2FD', borderColor: '#2196F3' },
  encourage: { emoji: '🌟', bgColor: '#FFF8E1', borderColor: '#FFC107' },
};

export function FriendlyMessage({ type, message, title }: FriendlyMessageProps) {
  const { themeColors, textStyles } = useSettings();
  const config = messageConfig[type];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: config.bgColor, borderColor: config.borderColor },
      ]}
      accessibilityRole="alert"
    >
      <Text style={styles.emoji}>{config.emoji}</Text>
      <View style={styles.textContainer}>
        {title && (
          <Text style={[textStyles.h3, { color: themeColors.text }]}>{title}</Text>
        )}
        <Text style={[textStyles.body, { color: themeColors.text }]}>{message}</Text>
      </View>
    </View>
  );
}

export const quizFeedback = {
  correct: [
    'Hebat! Jawapan kamu betul! 🎉',
    'Wah, pandai! Teruskan! ⭐',
    'Syabas! Kamu bijak! 🌟',
    'Bagus sekali! 💯',
  ],
  incorrect: [
    'Jangan putus asa, cuba lagi! 💪',
    'Hampir betul! Cuba sekali lagi! 🤔',
    'Tidak mengapa, belajar dari kesilapan! 📚',
    'Teruskan usaha! Kamu boleh! 🌈',
  ],
  complete: [
    'Tahniah! Kamu telah selesai kuiz! 🏆',
    'Cemerlang! Kerja yang bagus! 🎊',
    'Wah, hebat betul! 🌟',
  ],
};

export function getRandomFeedback(type: 'correct' | 'incorrect' | 'complete'): string {
  const messages = quizFeedback[type];
  return messages[Math.floor(Math.random() * messages.length)];
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  emoji: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
});