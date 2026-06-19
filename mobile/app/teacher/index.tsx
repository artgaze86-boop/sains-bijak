import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useSettings } from '../../src/context/SettingsContext';
import { ProgressBar } from '../../src/components/ProgressBar';
import { User } from '../../src/types';
import { yearColors } from '../../src/theme/colors';
import { spacing, borderRadius, shadows } from '../../src/theme/spacing';
import { api } from '../../src/services/api';

export default function TeacherDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { themeColors, textStyles } = useSettings();
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const classes = (await api.teacher.getClasses()) as {
        students?: { student: User }[];
      }[];
      const data = classes.flatMap((c) => c.students?.map((s) => s.student) ?? []);
      setStudents(data);
    } catch {
      setStudents([
        { id: 's1', name: 'Ahmad bin Ali', email: 'ahmad@cinta.com', role: 'murid', year: 3 },
        { id: 's2', name: 'Siti Aminah', email: 'siti@cinta.com', role: 'murid', year: 3 },
        { id: 's3', name: 'Kumar', email: 'kumar@cinta.com', role: 'murid', year: 3 },
        { id: 's4', name: 'Nurul', email: 'nurul@cinta.com', role: 'murid', year: 3 },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const classStats = {
    avgProgress: 62,
    activeStudents: students.length,
    topPerformers: 2,
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { backgroundColor: themeColors.accent }, shadows.md]}>
        <Text style={styles.headerEmoji}>👩‍🏫</Text>
        <Text style={[textStyles.h2, { color: '#FFFFFF' }]}>Papan Guru</Text>
        <Text style={{ color: 'rgba(255,255,255,0.9)' }}>Cikgu {user?.name}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: themeColors.surface }, shadows.sm]}>
          <Text style={styles.statEmoji}>👥</Text>
          <Text style={[textStyles.h2, { color: themeColors.text }]}>{classStats.activeStudents}</Text>
          <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>Pelajar</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: themeColors.surface }, shadows.sm]}>
          <Text style={styles.statEmoji}>📈</Text>
          <Text style={[textStyles.h2, { color: themeColors.text }]}>{classStats.avgProgress}%</Text>
          <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>Purata</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: themeColors.surface }, shadows.sm]}>
          <Text style={styles.statEmoji}>⭐</Text>
          <Text style={[textStyles.h2, { color: themeColors.text }]}>{classStats.topPerformers}</Text>
          <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>Cemerlang</Text>
        </View>
      </View>

      <Text style={[textStyles.h3, { color: themeColors.text, marginBottom: spacing.md }]}>
        Kemajuan Mengikut Tahun
      </Text>
      {[1, 2, 3, 4, 5, 6].map((year) => (
        <View key={year} style={styles.yearProgress}>
          <View style={[styles.yearDot, { backgroundColor: yearColors[year] }]}>
            <Text style={styles.yearDotText}>T{year}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <ProgressBar progress={Math.random() * 40 + 30} color={yearColors[year]} height={10} />
          </View>
        </View>
      ))}

      <Text style={[textStyles.h3, { color: themeColors.text, marginTop: spacing.lg, marginBottom: spacing.md }]}>
        Senarai Pelajar
      </Text>

      {loading ? (
        <ActivityIndicator color={themeColors.primary} />
      ) : (
        students.map((student) => (
          <View key={student.id} style={[styles.studentCard, { backgroundColor: themeColors.surface }, shadows.sm]}>
            <Text style={styles.studentAvatar}>🎒</Text>
            <View style={{ flex: 1 }}>
              <Text style={[textStyles.bodyLarge, { color: themeColors.text, fontWeight: '600' }]}>
                {student.name}
              </Text>
              <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>
                Tahun {student.year}
              </Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: themeColors.primaryLight }]}>
              <Text style={{ color: themeColors.primary, fontSize: 12, fontWeight: '600' }}>Aktif</Text>
            </View>
          </View>
        ))
      )}

      <TouchableOpacity
        style={[styles.backButton, { borderColor: themeColors.accent }]}
        onPress={async () => {
          await logout();
          router.replace('/');
        }}
      >
        <Text style={[textStyles.button, { color: themeColors.accent }]}>Log Keluar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  header: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerEmoji: { fontSize: 48, marginBottom: spacing.sm },
  statsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  statCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  statEmoji: { fontSize: 24, marginBottom: spacing.xs },
  yearProgress: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, gap: spacing.sm },
  yearDot: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearDotText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  studentAvatar: { fontSize: 32, marginRight: spacing.md },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  backButton: {
    borderWidth: 2,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
  },
});