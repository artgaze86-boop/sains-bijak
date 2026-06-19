import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSettings } from '../../src/context/SettingsContext';
import { useOffline } from '../../src/context/OfflineContext';
import { useProgress } from '../../src/hooks/useProgress';
import { QuizOption } from '../../src/components/QuizOption';
import { FriendlyMessage, getRandomFeedback } from '../../src/components/FriendlyMessage';
import { StarRating } from '../../src/components/StarRating';
import { ProgressBar } from '../../src/components/ProgressBar';
import { resolveImageUri } from '../../src/components/TopicImage';
import { Quiz, QuizQuestion } from '../../src/types';
import { spacing, borderRadius, touchTarget } from '../../src/theme/spacing';
import { api } from '../../src/services/api';

const LETTERS = ['A', 'B', 'C', 'D'] as const;

function getOptionEntries(question: QuizQuestion): { letter: string; text: string }[] {
  if (question.options && typeof question.options === 'object' && !Array.isArray(question.options)) {
    const opts = question.options as Record<string, string>;
    return LETTERS.filter((l) => opts[l]).map((l) => ({ letter: l, text: opts[l] }));
  }
  if (Array.isArray(question.options)) {
    return question.options.slice(0, 4).map((text, i) => ({
      letter: LETTERS[i],
      text: String(text),
    }));
  }
  return [];
}

export default function KuizScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { themeColors, textStyles, speak } = useSettings();
  const { isOnline, getQuiz, cacheQuiz } = useOffline();
  const { updateProgress } = useProgress();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    loadQuiz();
  }, [id]);

  async function loadQuiz() {
    setLoading(true);
    try {
      if (isOnline) {
        const data = await api.quizzes.getByTopic(id ?? '');
        await cacheQuiz(id ?? '', data);
        setQuiz(data);
      } else {
        setQuiz(await getQuiz(id ?? ''));
      }
    } catch {
      setQuiz(await getQuiz(id ?? ''));
    } finally {
      setLoading(false);
    }
  }

  const currentQuestion = quiz?.questions[currentIndex];

  const handleSubmitAnswer = () => {
    if (!currentQuestion || !selectedLetter) return;

    const correct = selectedLetter.toUpperCase() === String(currentQuestion.correctAnswer).toUpperCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    setFeedbackMsg(getRandomFeedback(correct ? 'correct' : 'incorrect'));

    if (correct) {
      setScore((s) => s + currentQuestion.points);
      speak('Hebat! Betul!');
    } else {
      speak('Cuba lagi, anda pasti boleh!');
    }

    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: selectedLetter }));
  };

  const handleNext = () => {
    if (!quiz) return;
    setShowFeedback(false);
    setSelectedLetter(null);

    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!quiz) return;
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    const stars = percentage >= 90 ? 3 : percentage >= 70 ? 2 : percentage >= 40 ? 1 : 0;

    setFinished(true);
    setFeedbackMsg(getRandomFeedback('complete'));
    updateProgress(id ?? '', { completed: true, score: percentage, stars });
    speak(`Tahniah! Anda mendapat ${stars} bintang!`);
  };

  if (loading) {
    return <ActivityIndicator size="large" color={themeColors.primary} style={styles.loader} />;
  }

  if (!quiz) return null;

  if (finished) {
    const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    const stars = percentage >= 90 ? 3 : percentage >= 70 ? 2 : percentage >= 40 ? 1 : 0;

    return (
      <View style={[styles.resultContainer, { backgroundColor: themeColors.background }]}>
        <Image source={{ uri: resolveImageUri('/images/badges/quiz-perfect.png') }} style={styles.resultImage} />
        <Text style={[textStyles.h1, { color: themeColors.primary }]}>Tahniah!</Text>
        <FriendlyMessage type="success" message={feedbackMsg} />
        <Text style={[textStyles.h2, { color: themeColors.text, marginVertical: spacing.md }]}>
          Skor: {percentage}%
        </Text>
        <StarRating rating={stars} size={40} />
        <Text style={[textStyles.body, { color: themeColors.textSecondary, marginTop: spacing.md }]}>
          {score} / {totalPoints} mata
        </Text>
      </View>
    );
  }

  if (!currentQuestion) return null;

  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;
  const optionEntries = getOptionEntries(currentQuestion);
  const questionImage = resolveImageUri(currentQuestion.imageUrl);

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={styles.progressHeader}>
        <Text style={[textStyles.caption, { color: themeColors.textSecondary }]}>
          Soalan {currentIndex + 1} / {quiz.questions.length}
        </Text>
        <ProgressBar progress={progress} showPercentage={false} height={8} />
      </View>

      {questionImage && (
        <Image source={{ uri: questionImage }} style={styles.questionImage} resizeMode="cover" />
      )}

      <View style={[styles.questionCard, { backgroundColor: themeColors.surface }]}>
        <Text style={[textStyles.h3, { color: themeColors.text, flex: 1 }]}>
          {currentQuestion.question}
        </Text>
        <TouchableOpacity onPress={() => speak(currentQuestion.question)} style={styles.speakBtn}>
          <Text style={textStyles.caption}>Audio</Text>
        </TouchableOpacity>
      </View>

      <Text style={[textStyles.caption, { color: themeColors.textSecondary, marginBottom: spacing.sm }]}>
        Pilih jawapan A, B, C atau D:
      </Text>

      {optionEntries.map(({ letter, text }, i) => (
        <QuizOption
          key={letter}
          label={text}
          index={i}
          selected={selectedLetter === letter}
          correct={showFeedback && letter === String(currentQuestion.correctAnswer).toUpperCase()}
          incorrect={
            showFeedback &&
            selectedLetter === letter &&
            letter !== String(currentQuestion.correctAnswer).toUpperCase()
          }
          disabled={showFeedback}
          onPress={() => setSelectedLetter(letter)}
        />
      ))}

      {showFeedback && (
        <>
          <FriendlyMessage
            type={isCorrect ? 'success' : 'error'}
            message={feedbackMsg}
            title={isCorrect ? 'Hebat!' : 'Belum tepat'}
          />
          <View style={[styles.explanation, { backgroundColor: '#E3F2FD' }]}>
            <Text style={[textStyles.caption, { color: themeColors.accent }]}>
              Jawapan betul: {String(currentQuestion.correctAnswer).toUpperCase()}
            </Text>
            <Text style={[textStyles.body, { color: themeColors.text, marginTop: spacing.xs }]}>
              {currentQuestion.explanation}
            </Text>
          </View>
        </>
      )}

      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor: showFeedback ? themeColors.primary : themeColors.secondary,
            opacity: !showFeedback && !selectedLetter ? 0.5 : 1,
          },
        ]}
        onPress={showFeedback ? handleNext : handleSubmitAnswer}
        disabled={!showFeedback && !selectedLetter}
      >
        <Text style={[textStyles.button, { color: '#FFFFFF' }]}>
          {showFeedback
            ? currentIndex < quiz.questions.length - 1
              ? 'Seterusnya'
              : 'Lihat Keputusan'
            : 'Semak Jawapan'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  loader: { flex: 1, justifyContent: 'center' },
  progressHeader: { marginBottom: spacing.md },
  questionImage: {
    width: '100%',
    height: 180,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  questionCard: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  speakBtn: { marginLeft: spacing.sm, padding: spacing.xs },
  explanation: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  actionButton: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginBottom: spacing.xxl,
    minHeight: touchTarget.large,
    justifyContent: 'center',
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  resultImage: { width: 120, height: 120, borderRadius: borderRadius.lg, marginBottom: spacing.md },
});