import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettings } from '../../src/context/SettingsContext';
import { fallbackGames } from '../../src/data/offline-fallback';
import { spacing, borderRadius, shadows } from '../../src/theme/spacing';

const gameColors: Record<string, string> = {
  match: '#E91E63',
  sort: '#9C27B0',
  speed_quiz: '#FF9800',
};

const gameTypeLabels: Record<string, string> = {
  match: 'Padanan',
  sort: 'Susunan',
  speed_quiz: 'Kelajuan',
};

export default function PermainanScreen() {
  const router = useRouter();
  const { themeColors, textStyles } = useSettings();

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[textStyles.h2, { color: themeColors.text }]}>Permainan Sains 🎮</Text>
      <Text style={[textStyles.body, { color: themeColors.textSecondary, marginBottom: spacing.lg }]}>
        Belajar sambil bermain - lebih seronok!
      </Text>

      {fallbackGames.map((game) => (
        <TouchableOpacity
          key={game.id}
          style={[
            styles.gameCard,
            { backgroundColor: themeColors.surface, borderTopColor: gameColors[game.type] },
            shadows.md,
          ]}
          onPress={() => router.push(`/permainan/${game.id}`)}
          activeOpacity={0.8}
        >
          <View style={[styles.gameIcon, { backgroundColor: gameColors[game.type] + '20' }]}>
            <Text style={styles.gameEmoji}>
              {game.type === 'match' ? '🐾' : game.type === 'sort' ? '🪐' : '⚡'}
            </Text>
          </View>
          <View style={styles.gameInfo}>
            <Text style={[textStyles.h3, { color: themeColors.text }]}>{game.title}</Text>
            <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>
              {game.description}
            </Text>
            <View style={[styles.badge, { backgroundColor: gameColors[game.type] }]}>
              <Text style={styles.badgeText}>{gameTypeLabels[game.type]}</Text>
            </View>
          </View>
          <Text style={styles.playButton}>▶️</Text>
        </TouchableOpacity>
      ))}

      <View style={[styles.tipCard, { backgroundColor: '#FFF8E1' }]}>
        <Text style={styles.tipEmoji}>💡</Text>
        <Text style={[textStyles.body, { color: themeColors.text, flex: 1 }]}>
          Main permainan untuk mengukuhkan pembelajaran. Dapatkan bintang bonus!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderTopWidth: 4,
    marginBottom: spacing.md,
  },
  gameIcon: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  gameEmoji: { fontSize: 32 },
  gameInfo: { flex: 1 },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    marginTop: spacing.xs,
  },
  badgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
  playButton: { fontSize: 28 },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.md,
    marginTop: spacing.md,
  },
  tipEmoji: { fontSize: 28 },
});