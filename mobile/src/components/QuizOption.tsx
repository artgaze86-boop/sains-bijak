import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { borderRadius, spacing, touchTarget } from '../theme/spacing';
import { useSettings } from '../context/SettingsContext';

interface QuizOptionProps {
  label: string;
  onPress: () => void;
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
  index?: number;
}

const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

export function QuizOption({
  label,
  onPress,
  selected = false,
  correct = false,
  incorrect = false,
  disabled = false,
  index = 0,
}: QuizOptionProps) {
  const { themeColors, textStyles } = useSettings();

  let backgroundColor = themeColors.surface;
  let borderColor = themeColors.border;
  let textColor = themeColors.text;

  if (correct) {
    backgroundColor = themeColors.primaryLight;
    borderColor = themeColors.success;
    textColor = themeColors.success;
  } else if (incorrect) {
    backgroundColor = '#FFEBEE';
    borderColor = themeColors.error;
    textColor = themeColors.error;
  } else if (selected) {
    backgroundColor = '#E3F2FD';
    borderColor = themeColors.accent;
    textColor = themeColors.accent;
  }

  return (
    <TouchableOpacity
      style={[
        styles.option,
        { backgroundColor, borderColor },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Pilihan ${optionLetters[index]}: ${label}`}
    >
      <Text style={[styles.letter, { color: borderColor }]}>{optionLetters[index]}</Text>
      <Text style={[textStyles.bodyLarge, { color: textColor, flex: 1 }]}>{label}</Text>
      {correct && <Text style={styles.feedbackIcon}>✅</Text>}
      {incorrect && <Text style={styles.feedbackIcon}>❌</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    marginBottom: spacing.sm,
    minHeight: touchTarget.minHeight,
  },
  letter: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: spacing.md,
    width: 28,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.7,
  },
  feedbackIcon: {
    fontSize: 20,
    marginLeft: spacing.sm,
  },
});