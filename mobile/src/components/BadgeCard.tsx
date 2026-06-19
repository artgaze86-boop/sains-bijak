import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from '../types';
import { borderRadius, shadows, spacing } from '../theme/spacing';
import { useSettings } from '../context/SettingsContext';

interface BadgeCardProps {
  badge: Badge;
}

export function BadgeCard({ badge }: BadgeCardProps) {
  const { themeColors, textStyles } = useSettings();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: badge.earned ? themeColors.surface : themeColors.disabled + '30',
          opacity: badge.earned ? 1 : 0.6,
        },
        shadows.sm,
      ]}
    >
      <Text style={styles.icon}>{badge.earned ? badge.icon : '🔒'}</Text>
      <Text style={[textStyles.h3, { color: themeColors.text, textAlign: 'center' }]}>
        {badge.name}
      </Text>
      <Text style={[textStyles.caption, { color: themeColors.textSecondary, textAlign: 'center' }]}>
        {badge.description}
      </Text>
      {badge.earned && badge.earnedAt && (
        <Text style={[textStyles.caption, styles.earnedDate]}>
          Diperoleh: {new Date(badge.earnedAt).toLocaleDateString('ms-MY')}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  earnedDate: {
    color: '#4CAF50',
    marginTop: spacing.xs,
    fontWeight: '600',
  },
});