import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSettings } from '../src/context/SettingsContext';
import { useProgress } from '../src/hooks/useProgress';
import { ProgressBar } from '../src/components/ProgressBar';
import { StarRating } from '../src/components/StarRating';
import { yearColors } from '../src/theme/colors';
import { spacing, borderRadius, shadows } from '../src/theme/spacing';
import { getFallbackTopicsByYear } from '../src/data/offline-fallback';

export default function KemajuanScreen() {
  const { themeColors, textStyles } = useSettings();
  const { getYearProgress, getTotalStats, getTopicProgress } = useProgress();
  const stats = getTotalStats();

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.summaryCard, { backgroundColor: themeColors.primary }, shadows.md]}>
        <Text style={styles.summaryEmoji}>📊</Text>
        <Text style={[textStyles.h2, { color: '#FFFFFF' }]}>Kemajuan Saya</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{stats.topicsCompleted}</Text>
            <Text style={styles.statLabel}>Topik Selesai</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{stats.totalStars}</Text>
            <Text style={styles.statLabel}>Bintang</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{stats.badgesEarned}</Text>
            <Text style={styles.statLabel}>Lencana</Text>
          </View>
        </View>
      </View>

      {[1, 2, 3, 4, 5, 6].map((year) => {
        const topics = getFallbackTopicsByYear(year);
        const yearProg = getYearProgress(
          year,
          topics.map((t) => t.id)
        );
        const color = yearColors[year];

        return (
          <View key={year} style={[styles.yearCard, { backgroundColor: themeColors.surface }, shadows.sm]}>
            <View style={styles.yearHeader}>
              <View style={[styles.yearBadge, { backgroundColor: color }]}>
                <Text style={styles.yearBadgeText}>T{year}</Text>
              </View>
              <Text style={[textStyles.h3, { color: themeColors.text, flex: 1 }]}>
                Tahun {year}
              </Text>
              <StarRating rating={Math.round(yearProg.avgStars)} size={18} />
            </View>
            <ProgressBar
              progress={yearProg.percentage}
              label={`${yearProg.completed}/${yearProg.total} topik`}
              color={color}
            />
            {topics.map((topic) => {
              const tp = getTopicProgress(topic.id);
              if (tp.stars === 0 && !tp.completed) return null;
              return (
                <View key={topic.id} style={styles.topicRow}>
                  <Text style={styles.topicIcon}>{topic.icon}</Text>
                  <Text style={[textStyles.caption, { color: themeColors.text, flex: 1 }]}>
                    {topic.title}
                  </Text>
                  <StarRating rating={tp.stars} size={14} />
                </View>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  summaryCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  summaryEmoji: { fontSize: 48, marginBottom: spacing.sm },
  statsGrid: { flexDirection: 'row', marginTop: spacing.md, gap: spacing.lg },
  statBox: { alignItems: 'center' },
  statNum: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold' },
  statLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  yearCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  yearHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, gap: spacing.sm },
  yearBadge: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearBadgeText: { color: '#FFFFFF', fontWeight: 'bold' },
  topicRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs, gap: spacing.sm },
  topicIcon: { fontSize: 20 },
});