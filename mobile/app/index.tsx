import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, borderRadius, shadows, touchTarget } from '../src/theme/spacing';
import { useSettings } from '../src/context/SettingsContext';
import { FadeInUp } from '../src/components/animations/FadeInUp';
import { BouncePressable } from '../src/components/animations/BouncePressable';
import { PulseView } from '../src/components/animations/PulseView';
import { FloatingEmojis } from '../src/components/animations/FloatingEmojis';

const roles = [
  { id: 'murid', label: 'Murid', emoji: '🎒', description: 'Belajar sains dengan seronok!', route: '/(auth)/login?role=murid' },
  { id: 'parent', label: 'Ibu Bapa', emoji: '👨‍👩‍👧', description: 'Pantau kemajuan anak', route: '/(auth)/login?role=parent' },
  { id: 'teacher', label: 'Guru', emoji: '👩‍🏫', description: 'Urus kelas dan pelajar', route: '/(auth)/login?role=teacher' },
];

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { themeColors, textStyles } = useSettings();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.heroBanner, { backgroundColor: themeColors.primary }]}>
        <FloatingEmojis />
        <FadeInUp>
          <PulseView>
            <Text style={styles.logo}>🔬</Text>
          </PulseView>
        </FadeInUp>
        <FadeInUp delay={150}>
          <Text style={[textStyles.display, { color: '#FFFFFF', textAlign: 'center' }]}>
            Sains Tahun 1-6 Bijak
          </Text>
        </FadeInUp>
        <FadeInUp delay={300}>
          <Text style={[textStyles.body, { color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: spacing.sm }]}>
            Belajar Sains KSSR dengan cara yang menyeronokkan!
          </Text>
        </FadeInUp>
      </View>

      <View style={styles.rolesContainer}>
        <FadeInUp delay={400}>
          <Text style={[textStyles.h3, { color: themeColors.text, marginBottom: spacing.md }]}>
            Pilih peranan anda:
          </Text>
        </FadeInUp>
        {roles.map((role, index) => (
          <FadeInUp key={role.id} delay={500 + index * 120}>
            <BouncePressable
              style={[styles.roleCard, { backgroundColor: themeColors.surface }, shadows.md]}
              onPress={() => router.push(role.route as `/(auth)/login?role=${string}`)}
              accessibilityRole="button"
              accessibilityLabel={role.label}
            >
              <Text style={styles.roleEmoji}>{role.emoji}</Text>
              <View style={styles.roleInfo}>
                <Text style={[textStyles.h3, { color: themeColors.text }]}>{role.label}</Text>
                <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>
                  {role.description}
                </Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </BouncePressable>
          </FadeInUp>
        ))}
      </View>

      <FadeInUp delay={900}>
        <Text style={[textStyles.caption, styles.footer, { color: themeColors.textSecondary }]}>
          © 2026 Sains Bijak • KSSR Tahun 1-6
        </Text>
      </FadeInUp>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  heroBanner: {
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  logo: {
    fontSize: 72,
    marginBottom: spacing.md,
  },
  rolesContainer: {
    flex: 1,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    minHeight: touchTarget.large + 20,
  },
  roleEmoji: {
    fontSize: 48,
    marginRight: spacing.md,
  },
  roleInfo: {
    flex: 1,
  },
  arrow: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});