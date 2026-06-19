import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useSettings } from '../../src/context/SettingsContext';
import { ProgressBar } from '../../src/components/ProgressBar';
import { StarRating } from '../../src/components/StarRating';
import { User } from '../../src/types';
import { spacing, borderRadius, shadows } from '../../src/theme/spacing';
import { api } from '../../src/services/api';

export default function ParentDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { themeColors, textStyles } = useSettings();
  const [children, setChildren] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChildren();
  }, []);

  async function loadChildren() {
    try {
      const data = await api.parent.getChildren();
      setChildren(data);
    } catch {
      setChildren([
        { id: 'child-1', name: 'Ahmad', email: 'ahmad@demo.com', role: 'murid', year: 3 },
        { id: 'child-2', name: 'Siti', email: 'siti@demo.com', role: 'murid', year: 5 },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { backgroundColor: themeColors.pink }, shadows.md]}>
        <Text style={styles.headerEmoji}>👨‍👩‍👧</Text>
        <Text style={[textStyles.h2, { color: '#FFFFFF' }]}>Papan Ibu Bapa</Text>
        <Text style={{ color: 'rgba(255,255,255,0.9)' }}>Selamat datang, {user?.name}</Text>
      </View>

      <Text style={[textStyles.h3, { color: themeColors.text, marginBottom: spacing.md }]}>
        Anak-anak Saya
      </Text>

      {loading ? (
        <ActivityIndicator color={themeColors.primary} />
      ) : (
        children.map((child) => (
          <View key={child.id} style={[styles.childCard, { backgroundColor: themeColors.surface }, shadows.sm]}>
            <Text style={styles.childAvatar}>🧒</Text>
            <View style={styles.childInfo}>
              <Text style={[textStyles.h3, { color: themeColors.text }]}>{child.name}</Text>
              <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>
                Tahun {child.year ?? '-'}
              </Text>
              <ProgressBar progress={45} label="Kemajuan keseluruhan" />
              <StarRating rating={2} size={18} />
            </View>
          </View>
        ))
      )}

      <View style={[styles.tipsCard, { backgroundColor: '#E8F5E9' }]}>
        <Text style={[textStyles.h3, { color: themeColors.primary }]}>💡 Tip untuk Ibu Bapa</Text>
        <Text style={[textStyles.body, { color: themeColors.text, marginTop: spacing.sm }]}>
          • Encourage anak belajar 15 minit sehari{'\n'}
          • Cuba eksperimen bersama di rumah{'\n'}
          • Raikan setiap pencapaian kecil!
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.backButton, { borderColor: themeColors.primary }]}
        onPress={async () => {
          await logout();
          router.replace('/');
        }}
      >
        <Text style={[textStyles.button, { color: themeColors.primary }]}>Log Keluar</Text>
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
  childCard: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  childAvatar: { fontSize: 48, marginRight: spacing.md },
  childInfo: { flex: 1 },
  tipsCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
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