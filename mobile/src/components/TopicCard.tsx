import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Topic } from '../types';
import { TopicImage } from './TopicImage';
import { yearColors } from '../theme/colors';
import { borderRadius, shadows, spacing } from '../theme/spacing';
import { useSettings } from '../context/SettingsContext';
import { StarRating } from './StarRating';

interface TopicCardProps {
  topic: Topic;
  onPress: () => void;
  stars?: number;
  completed?: boolean;
}

export function TopicCard({ topic, onPress, stars = 0, completed = false }: TopicCardProps) {
  const { themeColors, textStyles } = useSettings();
  const accentColor = yearColors[topic.year] ?? themeColors.primary;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: themeColors.surface, borderLeftColor: accentColor }, shadows.sm]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={topic.title}
    >
      <TopicImage imageUrl={topic.imageUrl ?? topic.icon} size={72} />
      <View style={styles.content}>
        <Text style={[textStyles.h3, { color: themeColors.text }]}>{topic.title}</Text>
        <Text style={[textStyles.caption, { color: themeColors.textSecondary }]} numberOfLines={2}>
          {topic.description}
        </Text>
        <View style={styles.footer}>
          <StarRating rating={stars} size={16} />
          {completed && <Text style={styles.completedBadge}>✅ Selesai</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  completedBadge: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
});