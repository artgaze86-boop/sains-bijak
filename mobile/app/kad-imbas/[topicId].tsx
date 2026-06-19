import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSettings } from '../../src/context/SettingsContext';
import { useOffline } from '../../src/context/OfflineContext';
import { FlashCard as FlashCardComponent } from '../../src/components/FlashCard';
import { FlashCard } from '../../src/types';
import { spacing, borderRadius, touchTarget } from '../../src/theme/spacing';
import { api } from '../../src/services/api';

export default function KadImbasScreen() {
  const { topicId } = useLocalSearchParams<{ topicId: string }>();
  const { themeColors, textStyles } = useSettings();
  const { isOnline, getFlashcards, cacheFlashcards } = useOffline();
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [known, setKnown] = useState(0);

  useEffect(() => {
    loadCards();
  }, [topicId]);

  async function loadCards() {
    setLoading(true);
    try {
      if (isOnline) {
        const data = await api.flashcards.getByTopic(topicId ?? '');
        await cacheFlashcards(topicId ?? '', data);
        setCards(data);
      } else {
        setCards(await getFlashcards(topicId ?? ''));
      }
    } catch {
      setCards(await getFlashcards(topicId ?? ''));
    } finally {
      setLoading(false);
    }
  }

  const handleNext = (remembered: boolean) => {
    if (remembered) setKnown((k) => k + 1);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  if (loading) {
    return <ActivityIndicator size="large" color={themeColors.primary} style={styles.loader} />;
  }

  if (cards.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <Text style={[textStyles.h3, { color: themeColors.text, textAlign: 'center' }]}>
          Tiada kad imbas tersedia
        </Text>
      </View>
    );
  }

  const currentCard = cards[currentIndex];
  const isLast = currentIndex === cards.length - 1;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[textStyles.caption, styles.counter, { color: themeColors.textSecondary }]}>
        Kad {currentIndex + 1} / {cards.length} • Tahu: {known}
      </Text>

      <FlashCardComponent
        front={currentCard.front}
        back={currentCard.back}
        emoji={currentCard.emoji}
      />

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: themeColors.border }]}
          onPress={handlePrev}
          disabled={currentIndex === 0}
        >
          <Text style={[textStyles.button, { color: themeColors.text }]}>← Sebelum</Text>
        </TouchableOpacity>
      </View>

      {!isLast ? (
        <View style={styles.answerRow}>
          <TouchableOpacity
            style={[styles.answerBtn, { backgroundColor: themeColors.error }]}
            onPress={() => handleNext(false)}
          >
            <Text style={styles.answerText}>😕 Belum Tahu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.answerBtn, { backgroundColor: themeColors.primary }]}
            onPress={() => handleNext(true)}
          >
            <Text style={styles.answerText}>😊 Tahu!</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.completeCard, { backgroundColor: themeColors.primaryLight }]}>
          <Text style={styles.completeEmoji}>🎉</Text>
          <Text style={[textStyles.h3, { color: themeColors.primary }]}>
            Tamat! Kamu tahu {known} daripada {cards.length} kad
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  loader: { flex: 1, justifyContent: 'center' },
  counter: { textAlign: 'center', marginBottom: spacing.sm },
  controls: { flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.md },
  navButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    minHeight: touchTarget.minHeight,
    justifyContent: 'center',
  },
  answerRow: { flexDirection: 'row', gap: spacing.md },
  answerBtn: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    minHeight: touchTarget.large,
    justifyContent: 'center',
  },
  answerText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  completeCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  completeEmoji: { fontSize: 48, marginBottom: spacing.sm },
});