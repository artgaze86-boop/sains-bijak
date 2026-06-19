import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useSettings } from '../../src/context/SettingsContext';
import { UserRole } from '../../src/types';
import { spacing, borderRadius, touchTarget } from '../../src/theme/spacing';
import { yearColors } from '../../src/theme/colors';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const { themeColors, textStyles } = useSettings();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('murid');
  const [year, setYear] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Ralat', 'Sila lengkapkan semua maklumat.');
      return;
    }
    setLoading(true);
    try {
      await register({ name: name.trim(), email: email.trim(), password, role, year: role === 'murid' ? year : undefined });
      if (role === 'parent') {
        router.replace('/parent');
      } else if (role === 'teacher') {
        router.replace('/teacher');
      } else {
        router.replace('/(tabs)');
      }
    } catch {
      Alert.alert('Ralat', 'Pendaftaran gagal. Sila cuba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <Text style={[textStyles.h2, { color: themeColors.primary }]}>Daftar Akaun Baru 📝</Text>

        <Text style={[textStyles.caption, styles.label, { color: themeColors.text }]}>Nama</Text>
        <TextInput
          style={[styles.input, { backgroundColor: themeColors.surface, color: themeColors.text, borderColor: themeColors.border }]}
          placeholder="Nama penuh"
          placeholderTextColor={themeColors.textSecondary}
          value={name}
          onChangeText={setName}
        />

        <Text style={[textStyles.caption, styles.label, { color: themeColors.text }]}>Emel</Text>
        <TextInput
          style={[styles.input, { backgroundColor: themeColors.surface, color: themeColors.text, borderColor: themeColors.border }]}
          placeholder="nama@emel.com"
          placeholderTextColor={themeColors.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={[textStyles.caption, styles.label, { color: themeColors.text }]}>Kata Laluan</Text>
        <TextInput
          style={[styles.input, { backgroundColor: themeColors.surface, color: themeColors.text, borderColor: themeColors.border }]}
          placeholder="Minimum 6 aksara"
          placeholderTextColor={themeColors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={[textStyles.caption, styles.label, { color: themeColors.text }]}>Peranan</Text>
        <View style={styles.roleRow}>
          {(['murid', 'parent', 'teacher'] as UserRole[]).map((r) => (
            <TouchableOpacity
              key={r}
              style={[
                styles.roleChip,
                { borderColor: themeColors.border },
                role === r && { backgroundColor: themeColors.primary, borderColor: themeColors.primary },
              ]}
              onPress={() => setRole(r)}
            >
              <Text style={{ color: role === r ? '#FFF' : themeColors.text, fontWeight: '600' }}>
                {r === 'murid' ? '🎒 Murid' : r === 'parent' ? '👨‍👩‍👧 Ibu Bapa' : '👩‍🏫 Guru'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {role === 'murid' && (
          <>
            <Text style={[textStyles.caption, styles.label, { color: themeColors.text }]}>Tahun</Text>
            <View style={styles.yearRow}>
              {[1, 2, 3, 4, 5, 6].map((y) => (
                <TouchableOpacity
                  key={y}
                  style={[
                    styles.yearChip,
                    { backgroundColor: year === y ? yearColors[y] : themeColors.surface, borderColor: yearColors[y] },
                  ]}
                  onPress={() => setYear(y)}
                >
                  <Text style={{ color: year === y ? '#FFF' : themeColors.text, fontWeight: 'bold' }}>T{y}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.primary }]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={[textStyles.button, { color: '#FFFFFF' }]}>Daftar Sekarang ✨</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: spacing.lg, paddingBottom: spacing.xxl },
  label: { marginBottom: spacing.xs, marginTop: spacing.md },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    minHeight: touchTarget.minHeight,
  },
  roleRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  roleChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  yearRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  yearChip: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  button: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xl,
    minHeight: touchTarget.large,
    justifyContent: 'center',
  },
});