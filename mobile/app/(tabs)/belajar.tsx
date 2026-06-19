import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useSettings } from '../../src/context/SettingsContext';
import { yearColors } from '../../src/theme/colors';
import { spacing, borderRadius, shadows } from '../../src/theme/spacing';
import { FadeInUp } from '../../src/components/animations/FadeInUp';
import { BouncePressable } from '../../src/components/animations/BouncePressable';

const learningModes = [
  { id: 'nota', title: 'Nota', emoji: '📝', description: 'Baca nota ringkas dan mudah difahami', color: '#4CAF50' },
  { id: 'eksperimen', title: 'Eksperimen', emoji: '🧪', description: 'Cuba aktiviti sains di rumah', color: '#FF9800' },
  { id: 'kad-imbas', title: 'Kad Imbas', emoji: '🃏', description: 'Ulangkaji dengan kad imbas', color: '#2196F3' },
  { id: 'video', title: 'Video', emoji: '🎬', description: 'Tonton video pembelajaran', color: '#9C27B0' },
];

export default function BelajarScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { themeColors, textStyles } = useSettings();
  const defaultYear = user?.year ?? 1;

  const handleModePress = (modeId: string) => {
    router.push(`/year/${defaultYear}?mode=${modeId}`);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <FadeInUp>
        <Text style={[textStyles.h2, { color: themeColors.text }]}>Pusat Belajar 📖</Text>
        <Text style={[textStyles.body, { color: themeColors.textSecondary, marginBottom: spacing.lg }]}>
          Pilih cara belajar kegemaran kamu!
        </Text>
      </FadeInUp>

      <FadeInUp delay={100}>
        <Text style={[textStyles.h3, { color: themeColors.text, marginBottom: spacing.md }]}>
          Tahun Saya (T{defaultYear})
        </Text>
        <BouncePressable
          style={[styles.yearBanner, { backgroundColor: yearColors[defaultYear] }, shadows.md]}
          onPress={() => router.push(`/year/${defaultYear}`)}
        >
          <Text style={styles.yearEmoji}>📚</Text>
          <View>
            <Text style={[textStyles.h3, { color: '#FFFFFF' }]}>Topik Tahun {defaultYear}</Text>
            <Text style={{ color: 'rgba(255,255,255,0.9)' }}>Lihat semua topik →</Text>
          </View>
        </BouncePressable>
      </FadeInUp>

      <FadeInUp delay={200}>
        <Text style={[textStyles.h3, { color: themeColors.text, marginTop: spacing.lg, marginBottom: spacing.md }]}>
          Mod Belajar
        </Text>
      </FadeInUp>
      {learningModes.map((mode, index) => (
        <FadeInUp key={mode.id} delay={250 + index * 80}>
          <BouncePressable
            style={[styles.modeCard, { backgroundColor: themeColors.surface, borderLeftColor: mode.color }, shadows.sm]}
            onPress={() => handleModePress(mode.id)}
          >
            <Text style={styles.modeEmoji}>{mode.emoji}</Text>
            <View style={styles.modeContent}>
              <Text style={[textStyles.h3, { color: themeColors.text }]}>{mode.title}</Text>
              <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>{mode.description}</Text>
            </View>
          </BouncePressable>
        </FadeInUp>
      ))}

      <FadeInUp delay={600}>
        <Text style={[textStyles.h3, { color: themeColors.text, marginTop: spacing.lg, marginBottom: spacing.md }]}>
          Semua Tahun
        </Text>
        <View style={styles.yearList}>
          {[1, 2, 3, 4, 5, 6].map((year) => (
            <BouncePressable
              key={year}
              style={[styles.yearPill, { backgroundColor: yearColors[year] }]}
              onPress={() => router.push(`/year/${year}`)}
            >
              <Text style={styles.yearPillText}>T{year}</Text>
            </BouncePressable>
          ))}
        </View>
      </FadeInUp>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  yearBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    gap: spacing.md,
  },
  yearEmoji: { fontSize: 40 },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    marginBottom: spacing.sm,
  },
  modeEmoji: { fontSize: 36, marginRight: spacing.md },
  modeContent: { flex: 1 },
  yearList: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.xl },
  yearPill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  yearPillText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});