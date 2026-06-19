import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { yearColors } from '../theme/colors';
import { borderRadius, shadows, touchTarget } from '../theme/spacing';
import { useSettings } from '../context/SettingsContext';
import { BouncePressable } from './animations/BouncePressable';

interface YearButtonProps {
  year: number;
  onPress: () => void;
  progress?: number;
}

export function YearButton({ year, onPress, progress = 0 }: YearButtonProps) {
  const { themeColors, textStyles } = useSettings();
  const color = yearColors[year] ?? themeColors.primary;

  return (
    <BouncePressable
      style={[styles.button, { backgroundColor: color }, shadows.md]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Tahun ${year}`}
    >
      <Text style={[textStyles.h2, styles.yearText]}>T{year}</Text>
      <Text style={[textStyles.caption, styles.subText]}>Tahun {year}</Text>
      {progress > 0 && (
        <View style={styles.progressBadge}>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      )}
    </BouncePressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: touchTarget.large,
    minWidth: touchTarget.large,
  },
  yearText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subText: {
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 2,
  },
  progressBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: borderRadius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  progressText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
});