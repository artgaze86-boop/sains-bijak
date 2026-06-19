import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter, Link, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/context/AuthContext';
import { useSettings } from '../../src/context/SettingsContext';
import { spacing, borderRadius, touchTarget, shadows } from '../../src/theme/spacing';
import { FadeInUp } from '../../src/components/animations/FadeInUp';
import { BouncePressable } from '../../src/components/animations/BouncePressable';
import { FloatingEmojis } from '../../src/components/animations/FloatingEmojis';
import { PulseView } from '../../src/components/animations/PulseView';

const DEMO_ACCOUNTS = [
  { label: 'Murid', email: 'murid@sainsbijak.my', password: 'murid123', emoji: '🎒' },
  { label: 'Guru', email: 'guru@sainsbijak.my', password: 'guru123', emoji: '👩‍🏫' },
  { label: 'Ibu Bapa', email: 'ibu@sainsbijak.my', password: 'ibu123', emoji: '👨‍👩‍👧' },
];

const ROLE_LABELS: Record<string, string> = {
  murid: 'Murid',
  parent: 'Ibu Bapa',
  teacher: 'Guru',
};

export default function LoginScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();
  const { login } = useAuth();
  const { themeColors, textStyles } = useSettings();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const roleLabel = role ? ROLE_LABELS[role] ?? 'Pengguna' : 'Pengguna';

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Ralat', 'Sila isi emel dan kata laluan.');
      return;
    }
    setLoading(true);
    try {
      const user = await login(email.trim(), password);
      if (user.role === 'parent') {
        router.replace('/parent');
      } else if (user.role === 'teacher') {
        router.replace('/teacher');
      } else {
        router.replace('/(tabs)');
      }
    } catch {
      Alert.alert('Ralat', 'Log masuk gagal. Sila cuba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (account: (typeof DEMO_ACCOUNTS)[0]) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.hero, { backgroundColor: themeColors.primary }]}>
            <FloatingEmojis />
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
              accessibilityLabel="Kembali"
            >
              <Text style={styles.backText}>← Kembali</Text>
            </TouchableOpacity>
            <FadeInUp delay={0}>
              <PulseView>
                <Text style={styles.heroEmoji}>🔬</Text>
              </PulseView>
            </FadeInUp>
            <FadeInUp delay={100}>
              <Text style={[textStyles.h1, styles.heroTitle]}>Sains Bijak</Text>
            </FadeInUp>
            <FadeInUp delay={200}>
              <Text style={styles.heroSubtitle}>
                Log masuk sebagai {roleLabel}
              </Text>
            </FadeInUp>
          </View>

          <View style={[styles.formCard, { backgroundColor: themeColors.surface }, shadows.lg]}>
            <FadeInUp delay={300}>
              <Text style={[textStyles.h2, { color: themeColors.text, marginBottom: spacing.xs }]}>
                Selamat Kembali!
              </Text>
              <Text style={[textStyles.body, { color: themeColors.textSecondary, marginBottom: spacing.lg }]}>
                Masukkan emel dan kata laluan anda
              </Text>
            </FadeInUp>

            <FadeInUp delay={400}>
              <Text style={[textStyles.caption, styles.label, { color: themeColors.text }]}>Emel</Text>
              <TextInput
                style={[styles.input, { backgroundColor: themeColors.background, color: themeColors.text, borderColor: themeColors.border }]}
                placeholder="nama@emel.com"
                placeholderTextColor={themeColors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                accessibilityLabel="Emel"
              />
            </FadeInUp>

            <FadeInUp delay={500}>
              <Text style={[textStyles.caption, styles.label, { color: themeColors.text }]}>Kata Laluan</Text>
              <TextInput
                style={[styles.input, { backgroundColor: themeColors.background, color: themeColors.text, borderColor: themeColors.border }]}
                placeholder="Kata laluan anda"
                placeholderTextColor={themeColors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                accessibilityLabel="Kata laluan"
              />
            </FadeInUp>

            <FadeInUp delay={600}>
              <BouncePressable
                style={[styles.button, { backgroundColor: themeColors.primary }]}
                onPress={handleLogin}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Log masuk"
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={[textStyles.button, { color: '#FFFFFF' }]}>Log Masuk 🚀</Text>
                )}
              </BouncePressable>
            </FadeInUp>

            <FadeInUp delay={700}>
              <Text style={[textStyles.caption, { color: themeColors.textSecondary, textAlign: 'center', marginTop: spacing.lg, marginBottom: spacing.sm }]}>
                Akaun demo (ketik untuk isi automatik):
              </Text>
              <View style={styles.demoRow}>
                {DEMO_ACCOUNTS.map((account) => (
                  <BouncePressable
                    key={account.label}
                    style={[styles.demoChip, { borderColor: themeColors.primary }]}
                    onPress={() => fillDemo(account)}
                  >
                    <Text style={styles.demoEmoji}>{account.emoji}</Text>
                    <Text style={[textStyles.caption, { color: themeColors.primary, fontWeight: '600' }]}>
                      {account.label}
                    </Text>
                  </BouncePressable>
                ))}
              </View>
            </FadeInUp>

            <FadeInUp delay={800}>
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity style={styles.linkButton}>
                  <Text style={[textStyles.body, { color: themeColors.accent }]}>
                    Belum ada akaun? Daftar sekarang
                  </Text>
                </TouchableOpacity>
              </Link>
            </FadeInUp>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#4CAF50' },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  hero: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    minHeight: 220,
    overflow: 'hidden',
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.sm,
  },
  backText: { color: 'rgba(255,255,255,0.9)', fontWeight: '600', fontSize: 15 },
  heroEmoji: { fontSize: 72, textAlign: 'center', marginBottom: spacing.sm },
  heroTitle: { color: '#FFFFFF', textAlign: 'center' },
  heroSubtitle: { color: 'rgba(255,255,255,0.9)', textAlign: 'center', fontSize: 16, marginTop: spacing.xs },
  formCard: {
    flex: 1,
    marginTop: -spacing.xl,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  label: { marginBottom: spacing.xs, marginTop: spacing.sm },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    minHeight: touchTarget.minHeight,
  },
  button: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
    minHeight: touchTarget.large,
    justifyContent: 'center',
  },
  demoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  demoChip: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    minWidth: 90,
  },
  demoEmoji: { fontSize: 24, marginBottom: 2 },
  linkButton: {
    marginTop: spacing.lg,
    alignItems: 'center',
    padding: spacing.sm,
  },
});