import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useSettings } from '../../src/context/SettingsContext';
import { useProgress } from '../../src/hooks/useProgress';
import { StarRating } from '../../src/components/StarRating';
import { spacing, borderRadius, shadows, touchTarget } from '../../src/theme/spacing';

export default function ProfilScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const {
    themeColors,
    textStyles,
    dyslexiaFont,
    highContrast,
    audioEnabled,
    largeText,
    toggleDyslexiaFont,
    toggleHighContrast,
    toggleAudio,
    toggleLargeText,
  } = useSettings();
  const { getTotalStats } = useProgress();
  const stats = getTotalStats();

  const handleLogout = () => {
    Alert.alert('Log Keluar', 'Adakah anda pasti mahu log keluar?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Log Keluar',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/');
        },
      },
    ]);
  };

  const SettingRow = ({
    label,
    description,
    value,
    onToggle,
    emoji,
  }: {
    label: string;
    description: string;
    value: boolean;
    onToggle: () => void;
    emoji: string;
  }) => (
    <View style={[styles.settingRow, { backgroundColor: themeColors.surface }]}>
      <Text style={styles.settingEmoji}>{emoji}</Text>
      <View style={styles.settingInfo}>
        <Text style={[textStyles.bodyLarge, { color: themeColors.text }]}>{label}</Text>
        <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: themeColors.border, true: themeColors.primaryLight }}
        thumbColor={value ? themeColors.primary : themeColors.disabled}
        accessibilityLabel={label}
      />
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.profileCard, { backgroundColor: themeColors.primary }, shadows.md]}>
        <Text style={styles.avatar}>🧑‍🎓</Text>
        <Text style={[textStyles.h2, { color: '#FFFFFF' }]}>{user?.name ?? 'Murid'}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.9)' }}>{user?.email}</Text>
        {user?.year && (
          <View style={styles.yearBadge}>
            <Text style={styles.yearBadgeText}>Tahun {user.year}</Text>
          </View>
        )}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{stats.topicsCompleted}</Text>
            <Text style={styles.statLabel}>Topik</Text>
          </View>
          <View style={styles.stat}>
            <StarRating rating={Math.min(3, Math.round(stats.totalStars / Math.max(stats.topicsCompleted, 1)))} size={20} />
            <Text style={styles.statLabel}>Bintang</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{stats.badgesEarned}</Text>
            <Text style={styles.statLabel}>Lencana</Text>
          </View>
        </View>
      </View>

      <Text style={[textStyles.h3, styles.sectionTitle, { color: themeColors.text }]}>
        ♿ Aksesibiliti
      </Text>
      <SettingRow
        emoji="🔤"
        label="Fon Disleksia"
        description="Huruf lebih jelas untuk pembaca disleksia"
        value={dyslexiaFont}
        onToggle={toggleDyslexiaFont}
      />
      <SettingRow
        emoji="🔆"
        label="Kontras Tinggi"
        description="Warna lebih terang untuk penglihatan"
        value={highContrast}
        onToggle={toggleHighContrast}
      />
      <SettingRow
        emoji="🔠"
        label="Teks Besar"
        description="Saiz huruf lebih besar"
        value={largeText}
        onToggle={toggleLargeText}
      />
      <SettingRow
        emoji="🔊"
        label="Audio"
        description="Bacaan suara untuk kandungan"
        value={audioEnabled}
        onToggle={toggleAudio}
      />

      <Text style={[textStyles.h3, styles.sectionTitle, { color: themeColors.text }]}>
        📱 Akaun
      </Text>
      <TouchableOpacity
        style={[styles.menuItem, { backgroundColor: themeColors.surface }]}
        onPress={() => router.push('/kemajuan')}
      >
        <Text style={styles.menuEmoji}>📊</Text>
        <Text style={[textStyles.bodyLarge, { color: themeColors.text, flex: 1 }]}>Kemajuan Saya</Text>
        <Text style={styles.menuArrow}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.logoutButton, { borderColor: themeColors.error }]}
        onPress={handleLogout}
      >
        <Text style={[textStyles.button, { color: themeColors.error }]}>Log Keluar 🚪</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  profileCard: {
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  avatar: { fontSize: 64, marginBottom: spacing.sm },
  yearBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginTop: spacing.sm,
  },
  yearBadgeText: { color: '#FFFFFF', fontWeight: '600' },
  statsRow: { flexDirection: 'row', marginTop: spacing.lg, gap: spacing.xl },
  stat: { alignItems: 'center' },
  statNumber: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  sectionTitle: { marginBottom: spacing.sm, marginTop: spacing.md },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  settingEmoji: { fontSize: 28, marginRight: spacing.md },
  settingInfo: { flex: 1 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    minHeight: touchTarget.minHeight,
  },
  menuEmoji: { fontSize: 24, marginRight: spacing.md },
  menuArrow: { color: '#4CAF50', fontSize: 18 },
  logoutButton: {
    borderWidth: 2,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
    minHeight: touchTarget.minHeight,
    justifyContent: 'center',
  },
});