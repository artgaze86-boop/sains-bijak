import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { borderRadius, spacing, touchTarget } from '../theme/spacing';
import { useSettings } from '../context/SettingsContext';

interface DragDropSortProps {
  items: string[];
  onOrderChange: (newOrder: string[]) => void;
  correctOrder?: string[];
  showFeedback?: boolean;
}

export function DragDropSort({
  items: initialItems,
  onOrderChange,
  correctOrder,
  showFeedback = false,
}: DragDropSortProps) {
  const { themeColors, textStyles } = useSettings();
  const [items, setItems] = useState(initialItems);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleItemPress = (index: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      const newItems = [...items];
      const temp = newItems[selectedIndex];
      newItems[selectedIndex] = newItems[index];
      newItems[index] = temp;
      setItems(newItems);
      onOrderChange(newItems);
      setSelectedIndex(null);
    }
  };

  const getItemStyle = (index: number, item: string) => {
    let borderColor = themeColors.border;
    let backgroundColor = themeColors.surface;

    if (selectedIndex === index) {
      borderColor = themeColors.accent;
      backgroundColor = '#E3F2FD';
    }

    if (showFeedback && correctOrder) {
      if (item === correctOrder[index]) {
        borderColor = themeColors.success;
        backgroundColor = themeColors.primaryLight;
      } else {
        borderColor = themeColors.error;
        backgroundColor = '#FFEBEE';
      }
    }

    return { borderColor, backgroundColor };
  };

  return (
    <View style={styles.container}>
      <Text style={[textStyles.caption, { color: themeColors.textSecondary, marginBottom: spacing.sm }]}>
        Ketik dua item untuk menukar kedudukannya
      </Text>
      {items.map((item, index) => {
        const { borderColor, backgroundColor } = getItemStyle(index, item);
        return (
          <TouchableOpacity
            key={`${item}-${index}`}
            style={[
              styles.item,
              { borderColor, backgroundColor },
              selectedIndex === index && styles.selected,
            ]}
            onPress={() => handleItemPress(index)}
            activeOpacity={0.7}
          >
            <View style={[styles.number, { backgroundColor: themeColors.primary }]}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <Text style={[textStyles.bodyLarge, { color: themeColors.text, flex: 1 }]}>
              {item}
            </Text>
            <Text style={styles.dragIcon}>↕️</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    marginBottom: spacing.sm,
    minHeight: touchTarget.minHeight,
  },
  selected: {
    transform: [{ scale: 1.02 }],
  },
  number: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  numberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dragIcon: {
    fontSize: 20,
    marginLeft: spacing.sm,
  },
});