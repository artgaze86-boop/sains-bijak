import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { resolveImageUri } from '../../src/components/TopicImage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSettings } from '../../src/context/SettingsContext';
import { useOffline } from '../../src/context/OfflineContext';
import { Note } from '../../src/types';
import { spacing, borderRadius, shadows, touchTarget } from '../../src/theme/spacing';
import { api } from '../../src/services/api';

export default function NotaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { themeColors, textStyles, speak } = useSettings();
  const { isOnline, getNote, cacheNote } = useOffline();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNote();
  }, [id]);

  async function loadNote() {
    setLoading(true);
    try {
      if (isOnline) {
        const data = await api.notes.getByTopic(id ?? '');
        await cacheNote(id ?? '', data);
        setNote(data);
      } else {
        setNote(await getNote(id ?? ''));
      }
    } catch {
      setNote(await getNote(id ?? ''));
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <ActivityIndicator size="large" color={themeColors.primary} style={styles.loader} />;
  }

  if (!note) return null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {note.imageUrl && (
        <Image
          source={{ uri: resolveImageUri(note.imageUrl) }}
          style={styles.heroImage}
          resizeMode="cover"
        />
      )}
      <View style={[styles.titleCard, { backgroundColor: themeColors.primary }, shadows.md]}>
        <Text style={[textStyles.h2, { color: '#FFFFFF' }]}>{note.title}</Text>
        <TouchableOpacity onPress={() => speak(note.content)} style={styles.speakButton}>
          <Text style={styles.speakText}>🔊 Dengar</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { backgroundColor: themeColors.surface }, shadows.sm]}>
        <Text style={[textStyles.h3, { color: themeColors.text, marginBottom: spacing.sm }]}>
          📖 Penjelasan
        </Text>
        <Text style={[textStyles.bodyLarge, { color: themeColors.text, lineHeight: 28 }]}>
          {note.content}
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: themeColors.surface }, shadows.sm]}>
        <Text style={[textStyles.h3, { color: themeColors.text, marginBottom: spacing.sm }]}>
          ⭐ Perkara Penting
        </Text>
        {note.keyPoints.map((point, index) => (
          <View key={index} style={styles.keyPoint}>
            <Text style={[styles.bullet, { color: themeColors.primary }]}>●</Text>
            <Text style={[textStyles.body, { color: themeColors.text, flex: 1 }]}>{point}</Text>
          </View>
        ))}
      </View>

      {note.vocabulary.length > 0 && (
        <View style={[styles.section, { backgroundColor: themeColors.surface }, shadows.sm]}>
          <Text style={[textStyles.h3, { color: themeColors.text, marginBottom: spacing.sm }]}>
            📚 Perbendaharaan Kata
          </Text>
          {note.vocabulary.map((item, index) => (
            <View key={index} style={styles.vocabItem}>
              <Text style={[textStyles.body, { color: themeColors.primary, fontWeight: '700' }]}>
                {item.term}
              </Text>
              <Text style={[textStyles.body, { color: themeColors.text, marginTop: 2 }]}>
                {item.definition}
              </Text>
            </View>
          ))}
        </View>
      )}

      {note.recap ? (
        <View style={[styles.recapBox, { backgroundColor: '#E8F5E9', borderColor: themeColors.primary }]}>
          <Text style={[textStyles.h3, { color: themeColors.primary, marginBottom: spacing.xs }]}>
            📝 Rumusan
          </Text>
          <Text style={[textStyles.body, { color: themeColors.text, lineHeight: 24 }]}>
            {note.recap}
          </Text>
        </View>
      ) : null}

      <View style={[styles.funFact, { backgroundColor: '#FFF8E1', borderColor: themeColors.secondary }]}>
        <Text style={styles.funFactEmoji}>💡</Text>
        <View style={{ flex: 1 }}>
          <Text style={[textStyles.h3, { color: themeColors.secondary }]}>Fakta Menarik!</Text>
          <Text style={[textStyles.body, { color: themeColors.text }]}>{note.funFact}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.quizButton, { backgroundColor: themeColors.secondary }]}
        onPress={() => router.push(`/kuiz/${id}`)}
      >
        <Text style={[textStyles.button, { color: '#FFFFFF' }]}>Mula Kuiz 🚀</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  loader: { flex: 1, justifyContent: 'center' },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  titleCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emoji: { fontSize: 48, marginBottom: spacing.sm },
  speakButton: {
    marginTop: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  speakText: { color: '#FFFFFF', fontWeight: '600' },
  section: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  keyPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  bullet: { fontSize: 16, marginRight: spacing.sm, marginTop: 2 },
  vocabItem: {
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  recapBox: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    marginBottom: spacing.md,
  },
  funFact: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  funFactEmoji: { fontSize: 32 },
  quizButton: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.xxl,
    minHeight: touchTarget.large,
    justifyContent: 'center',
  },
});