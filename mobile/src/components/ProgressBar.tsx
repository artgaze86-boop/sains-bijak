import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { borderRadius, spacing } from '../theme/spacing';
import { useSettings } from '../context/SettingsContext';

interface ProgressBarProps {
  progress: number;
  label?: string;
  color?: string;
  height?: number;
  showPercentage?: boolean;
}

export function ProgressBar({
  progress,
  label,
  color,
  height = 12,
  showPercentage = true,
}: ProgressBarProps) {
  const { themeColors, textStyles } = useSettings();
  const barColor = color ?? themeColors.primary;
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View style={styles.container}>
      {(label || showPercentage) && (
        <View style={styles.header}>
          {label && (
            <Text style={[textStyles.caption, { color: themeColors.text }]}>{label}</Text>
          )}
          {showPercentage && (
            <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>
              {clampedProgress}%
            </Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.track,
          { height, backgroundColor: themeColors.border },
        ]}
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: clampedProgress }}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress}%`,
              backgroundColor: barColor,
              height,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  track: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: borderRadius.full,
  },
});