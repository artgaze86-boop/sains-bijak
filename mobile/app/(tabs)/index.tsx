import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useSettings } from '../../src/context/SettingsContext';
import { useOffline } from '../../src/context/OfflineContext';
import { useProgress } from '../../src/hooks/useProgress';
import { YearButton } from '../../src/components/YearButton';
import { ProgressBar } from '../../src/components/ProgressBar';
import { spacing, borderRadius, shadows } from '../../src/theme/spacing';
import { getFallbackTopicsByYear } from '../../src/data/offline-fallback';
import { FadeInUp } from '../../src/components/animations/FadeInUp';
import { BouncePressable } from '../../src/components/animations/BouncePressable';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { themeColors, textStyles } = useSettings();
  const { isOnline } = useOffline();
  const { getYearProgress, getTotalStats } = useProgress();
  const stats = getTotalStats();

  const getYearPercentage = (year: number) => {
    const topics = getFallbackTopicsByYear(year);
    const topicIds = topics.map((t) => t.id);
    return getYearProgress(year, topicIds).percentage;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <FadeInUp>
        <View style={[styles.welcomeCard, { backgroundColor: themeColors.primary }, shadows.md]}>
          <Text style={styles.welcomeEmoji}>👋</Text>
          <Text style={[textStyles.h2, { color: '#FFFFFF' }]}>
            Hai, {user?.name ?? 'Murid'}!
          </Text>
          <Text style={[textStyles.body, { color: 'rgba(255,255,255,0.9)' }]}>
            {user?.year ? `Tahun ${user.year}` : 'Mari belajar sains hari ini!'}
          </Text>
          {!isOnline && (
            <View style={styles.offlineBadge}>
              <Text style={styles.offlineText}>📴 Mod Luar Talian</Text>
            </View>
          )}
        </View>
      </FadeInUp>

      <FadeInUp delay={150}>
        <Text style={[textStyles.h3, styles.sectionTitle, { color: themeColors.text }]}>
          Pilih Tahun 📚
        </Text>
      </FadeInUp>
      <View style={styles.yearGrid}>
        {[1, 2, 3, 4, 5, 6].map((year, index) => (
          <FadeInUp key={year} delay={200 + index * 60}>
            <YearButton
              year={year}
              progress={getYearPercentage(year)}
              onPress={() => router.push(`/year/${year}`)}
            />
          </FadeInUp>
        ))}
      </View>

      <FadeInUp delay={600}>
      <BouncePressable
        style={[styles.actionCard, { backgroundColor: themeColors.surface }, shadows.sm]}
        onPress={() => router.push('/kemajuan')}
      >
        <Text style={styles.actionEmoji}>📊</Text>
        <View style={styles.actionContent}>
          <Text style={[textStyles.h3, { color: themeColors.text }]}>Kemajuan Saya</Text>
          <ProgressBar progress={stats.topicsCompleted > 0 ? Math.round((stats.topicsCompleted / Math.max(stats.totalTopics, 1)) * 100) : 0} label={`${stats.topicsCompleted} topik selesai`} />
          <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>
            ⭐ {stats.totalStars} bintang • 🏅 {stats.badgesEarned} lencana
          </Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </BouncePressable>
      </FadeInUp>

      <FadeInUp delay={700}>
      <BouncePressable
        style={[styles.actionCard, { backgroundColor: themeColors.surface }, shadows.sm]}
        onPress={() => router.push('/(tabs)/profil')}
      >
        <Text style={styles.actionEmoji}>⚙️</Text>
        <View style={styles.actionContent}>
          <Text style={[textStyles.h3, { color: themeColors.text }]}>Profil & Tetapan</Text>
          <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>
            Aksesibiliti, audio, dan akaun
          </Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </BouncePressable>
      </FadeInUp>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  welcomeCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  welcomeEmoji: { fontSize: 48, marginBottom: spacing.sm },
  offlineBadge: {
    marginTop: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  offlineText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  sectionTitle: { marginBottom: spacing.md },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  actionEmoji: { fontSize: 36, marginRight: spacing.md },
  actionContent: { flex: 1 },
  arrow: { fontSize: 20, color: '#4CAF50', fontWeight: 'bold' },
});