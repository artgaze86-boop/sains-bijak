import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSettings } from '../../src/context/SettingsContext';
import { DragDropSort } from '../../src/components/DragDropSort';
import { QuizOption } from '../../src/components/QuizOption';
import { FriendlyMessage } from '../../src/components/FriendlyMessage';
import { gameData } from '../../src/data/offline-fallback';
import { spacing, borderRadius, touchTarget } from '../../src/theme/spacing';

type GameId = 'padankan-haiwan' | 'susun-planet' | 'kuiz-pantas';

export default function PermainanScreen() {
  const { gameId } = useLocalSearchParams<{ gameId: string }>();
  const { themeColors, textStyles } = useSettings();

  if (gameId === 'padankan-haiwan') return <PadankanHaiwan />;
  if (gameId === 'susun-planet') return <SusunPlanet />;
  if (gameId === 'kuiz-pantas') return <KuizPantas />;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={textStyles.h3}>Permainan tidak dijumpai</Text>
    </View>
  );
}

function PadankanHaiwan() {
  const { themeColors, textStyles } = useSettings();
  const data = gameData['padankan-haiwan'];
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongPair, setWrongPair] = useState(false);

  const items = data.pairs.map((p) => p.item);
  const matches = data.pairs.map((p) => p.match);

  const handleItemPress = (id: string, type: 'item' | 'match') => {
    if (matched.includes(id) || finished) return;

    if (!selectedItem) {
      setSelectedItem(`${type}-${id}`);
      return;
    }

    const [selType, selId] = selectedItem.split('-');
    if (selType === type) {
      setSelectedItem(`${type}-${id}`);
      return;
    }

    const pair = data.pairs.find(
      (p) =>
        (selType === 'item' && selId === p.id && type === 'match' && id === p.id) ||
        (selType === 'match' && selId === p.id && type === 'item' && id === p.id)
    );

    if (pair) {
      setMatched((m) => [...m, pair.id]);
      setScore((s) => s + 1);
      if (matched.length + 1 === data.pairs.length) setFinished(true);
    } else {
      setWrongPair(true);
      setTimeout(() => setWrongPair(false), 800);
    }
    setSelectedItem(null);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[textStyles.h2, { color: themeColors.text }]}>🐾 Padankan Haiwan</Text>
      <Text style={[textStyles.body, { color: themeColors.textSecondary, marginBottom: spacing.md }]}>
        Padankan haiwan dengan habitatnya!
      </Text>
      <Text style={[textStyles.h3, { color: themeColors.primary }]}>Skor: {score}/{data.pairs.length}</Text>

      {wrongPair && <FriendlyMessage type="error" message="Bukan padanan! Cuba lagi 💪" />}

      <Text style={[textStyles.h3, { color: themeColors.text, marginTop: spacing.md }]}>Haiwan</Text>
      <View style={styles.matchGrid}>
        {data.pairs.map((pair) => (
          <TouchableOpacity
            key={`item-${pair.id}`}
            style={[
              styles.matchCard,
              { backgroundColor: themeColors.surface },
              matched.includes(pair.id) && styles.matched,
              selectedItem === `item-${pair.id}` && styles.selected,
            ]}
            onPress={() => handleItemPress(pair.id, 'item')}
            disabled={matched.includes(pair.id)}
          >
            <Text style={styles.matchEmoji}>{pair.item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[textStyles.h3, { color: themeColors.text, marginTop: spacing.md }]}>Habitat</Text>
      <View style={styles.matchGrid}>
        {data.pairs.map((pair) => (
          <TouchableOpacity
            key={`match-${pair.id}`}
            style={[
              styles.matchCard,
              { backgroundColor: themeColors.surface },
              matched.includes(pair.id) && styles.matched,
              selectedItem === `match-${pair.id}` && styles.selected,
            ]}
            onPress={() => handleItemPress(pair.id, 'match')}
            disabled={matched.includes(pair.id)}
          >
            <Text style={styles.matchEmoji}>{pair.match}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {finished && (
        <FriendlyMessage type="success" title="Tahniah! 🎉" message="Kamu berjaya padankan semua haiwan!" />
      )}
    </ScrollView>
  );
}

function SusunPlanet() {
  const { themeColors, textStyles } = useSettings();
  const data = gameData['susun-planet'];
  const [order, setOrder] = useState([...data.items].sort(() => Math.random() - 0.5));
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleCheck = () => {
    setChecked(true);
    const correct = order.every((item, i) => item === data.correctOrder[i]);
    if (correct) setFinished(true);
  };

  const isCorrect = order.every((item, i) => item === data.correctOrder[i]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[textStyles.h2, { color: themeColors.text }]}>🪐 Susun Planet</Text>
      <Text style={[textStyles.body, { color: themeColors.textSecondary, marginBottom: spacing.lg }]}>
        Susun planet dari terdekat ke terjauh dari Matahari
      </Text>

      <DragDropSort
        items={order}
        onOrderChange={(newOrder) => {
          setOrder(newOrder);
          setChecked(false);
        }}
        correctOrder={checked ? data.correctOrder : undefined}
        showFeedback={checked}
      />

      {!finished && (
        <TouchableOpacity
          style={[styles.checkButton, { backgroundColor: themeColors.purple }]}
          onPress={handleCheck}
        >
          <Text style={[textStyles.button, { color: '#FFFFFF' }]}>Semak Susunan ✓</Text>
        </TouchableOpacity>
      )}

      {checked && (
        <FriendlyMessage
          type={isCorrect ? 'success' : 'encourage'}
          title={isCorrect ? 'Hebat! 🌟' : 'Hampir betul!'}
          message={isCorrect ? 'Susunan planet kamu betul!' : 'Cuba susun semula. Utarid paling dekat dengan Matahari.'}
        />
      )}
    </ScrollView>
  );
}

function KuizPantas() {
  const { themeColors, textStyles } = useSettings();
  const data = gameData['kuiz-pantas'];
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const question = data.questions[currentQ];

  useEffect(() => {
    if (finished) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleAnswer(null);
          return 10;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQ, finished]);

  const handleAnswer = (answer: string | null) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (answer && answer.toLowerCase().includes(question.answer.toLowerCase())) {
      setScore((s) => s + timeLeft);
    }
    if (currentQ < data.questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setTimeLeft(10);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const maxScore = data.questions.length * 10;
    return (
      <View style={[styles.resultBox, { backgroundColor: themeColors.background }]}>
        <Text style={styles.resultEmoji}>⚡</Text>
        <Text style={[textStyles.h1, { color: themeColors.secondary }]}>Tamat!</Text>
        <Text style={[textStyles.h2, { color: themeColors.text }]}>Skor: {score}/{maxScore}</Text>
        <FriendlyMessage
          type="success"
          message={score >= maxScore * 0.7 ? 'Laju dan bijak! 🚀' : 'Bagus! Cuba lagi untuk skor lebih tinggi!'}
        />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.timerRow}>
        <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>
          Soalan {currentQ + 1}/{data.questions.length}
        </Text>
        <View style={[styles.timer, { backgroundColor: timeLeft <= 3 ? themeColors.error : themeColors.secondary }]}>
          <Text style={styles.timerText}>⏱️ {timeLeft}s</Text>
        </View>
      </View>

      <Text style={[textStyles.h2, { color: themeColors.text, marginVertical: spacing.lg }]}>
        {question.question}
      </Text>

      {question.options.map((opt, i) => (
        <QuizOption
          key={i}
          label={opt}
          index={i}
          selected={selected === opt}
          onPress={() => {
            setSelected(opt);
            handleAnswer(opt);
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  matchGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  matchCard: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  matchEmoji: { fontSize: 36 },
  matched: { opacity: 0.4, borderColor: '#4CAF50' },
  selected: { borderColor: '#2196F3', borderWidth: 3 },
  checkButton: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.lg,
    minHeight: touchTarget.large,
    justifyContent: 'center',
  },
  timerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timer: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.full },
  timerText: { color: '#FFFFFF', fontWeight: 'bold' },
  resultBox: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  resultEmoji: { fontSize: 72, marginBottom: spacing.md },
});