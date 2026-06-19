import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSettings } from '../../src/context/SettingsContext';
import { useOffline } from '../../src/context/OfflineContext';
import { Experiment } from '../../src/types';
import { spacing, borderRadius, shadows } from '../../src/theme/spacing';
import { api } from '../../src/services/api';

export default function EksperimenScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { themeColors, textStyles, speak } = useSettings();
  const { isOnline, getExperiment, cacheExperiment } = useOffline();
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperiment();
  }, [id]);

  async function loadExperiment() {
    setLoading(true);
    try {
      if (isOnline) {
        const data = await api.experiments.getByTopic(id ?? '');
        await cacheExperiment(id ?? '', data);
        setExperiment(data);
      } else {
        setExperiment(await getExperiment(id ?? ''));
      }
    } catch {
      setExperiment(await getExperiment(id ?? ''));
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <ActivityIndicator size="large" color={themeColors.primary} style={styles.loader} />;
  }

  if (!experiment) return null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { backgroundColor: themeColors.accent }, shadows.md]}>
        <Text style={styles.emoji}>🧪</Text>
        <Text style={[textStyles.h2, { color: '#FFFFFF' }]}>{experiment.title}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center' }}>{experiment.description}</Text>
      </View>

      <View style={[styles.section, { backgroundColor: themeColors.surface }, shadows.sm]}>
        <Text style={[textStyles.h3, { color: themeColors.text }]}>📦 Bahan-bahan</Text>
        {experiment.materials.map((item, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={[styles.bullet, { color: themeColors.secondary }]}>•</Text>
            <Text style={[textStyles.body, { color: themeColors.text }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: themeColors.surface }, shadows.sm]}>
        <Text style={[textStyles.h3, { color: themeColors.text }]}>📋 Langkah-langkah</Text>
        {experiment.steps.map((step, i) => (
          <View key={i} style={styles.stepItem}>
            <View style={[styles.stepNumber, { backgroundColor: themeColors.primary }]}>
              <Text style={styles.stepNumberText}>{i + 1}</Text>
            </View>
            <Text style={[textStyles.body, { color: themeColors.text, flex: 1 }]}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.safetyCard, { backgroundColor: '#FFEBEE', borderColor: themeColors.error }]}>
        <Text style={[textStyles.h3, { color: themeColors.error }]}>⚠️ Keselamatan</Text>
        {experiment.safetyTips.map((tip, i) => (
          <Text key={i} style={[textStyles.body, { color: themeColors.text, marginTop: spacing.xs }]}>
            • {tip}
          </Text>
        ))}
      </View>

      <View style={[styles.funFact, { backgroundColor: '#FFF8E1' }]}>
        <Text style={styles.funEmoji}>💡</Text>
        <View style={{ flex: 1 }}>
          <Text style={[textStyles.h3, { color: themeColors.secondary }]}>Fakta Menarik</Text>
          <Text style={[textStyles.body, { color: themeColors.text }]}>{experiment.funFact}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  loader: { flex: 1, justifyContent: 'center' },
  header: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emoji: { fontSize: 56, marginBottom: spacing.sm },
  section: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  listItem: { flexDirection: 'row', marginTop: spacing.sm },
  bullet: { marginRight: spacing.sm, fontSize: 18 },
  stepItem: { flexDirection: 'row', alignItems: 'flex-start', marginTop: spacing.md },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepNumberText: { color: '#FFFFFF', fontWeight: 'bold' },
  safetyCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    marginBottom: spacing.md,
  },
  funFact: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  funEmoji: { fontSize: 32 },
});