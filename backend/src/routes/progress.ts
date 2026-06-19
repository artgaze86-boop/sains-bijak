import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { param } from '../lib/params';
import { AuthRequest, authenticate } from '../middleware/auth';

const router = Router();

function calculateStars(score: number, total: number): number {
  const pct = total > 0 ? (score / total) * 100 : 0;
  if (pct >= 90) return 3;
  if (pct >= 70) return 2;
  if (pct >= 50) return 1;
  return 0;
}

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const progress = await prisma.topicProgress.findMany({
      where: { userId: req.user!.userId },
      include: {
        topic: {
          select: { title: true, slug: true, icon: true, yearLevel: { select: { year: true } } },
        },
      },
      orderBy: { lastAccessed: 'desc' },
    });

    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan kemajuan' });
  }
});

router.get('/topic/:topicId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const progress = await prisma.topicProgress.findUnique({
      where: {
        userId_topicId: {
          userId: req.user!.userId,
          topicId: param(req.params.topicId),
        },
      },
    });

    res.json(progress ?? {
      notesCompleted: false,
      quizCompleted: false,
      experimentCompleted: false,
      gameCompleted: false,
      flashcardsReviewed: 0,
    });
  } catch (error) {
    console.error('Topic progress error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan kemajuan topik' });
  }
});

router.put('/topic/:topicId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const {
      notesCompleted,
      quizCompleted,
      experimentCompleted,
      gameCompleted,
      flashcardsReviewed,
    } = req.body;

    const progress = await prisma.topicProgress.upsert({
      where: {
        userId_topicId: {
          userId: req.user!.userId,
          topicId: param(req.params.topicId),
        },
      },
      create: {
        userId: req.user!.userId,
        topicId: param(req.params.topicId),
        notesCompleted: notesCompleted ?? false,
        quizCompleted: quizCompleted ?? false,
        experimentCompleted: experimentCompleted ?? false,
        gameCompleted: gameCompleted ?? false,
        flashcardsReviewed: flashcardsReviewed ?? 0,
      },
      update: {
        ...(notesCompleted !== undefined && { notesCompleted }),
        ...(quizCompleted !== undefined && { quizCompleted }),
        ...(experimentCompleted !== undefined && { experimentCompleted }),
        ...(gameCompleted !== undefined && { gameCompleted }),
        ...(flashcardsReviewed !== undefined && { flashcardsReviewed }),
        lastAccessed: new Date(),
      },
    });

    res.json(progress);
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Ralat menyimpan kemajuan' });
  }
});

router.post('/quiz-attempts', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { quizId, topicId, answers } = req.body;

    if (!quizId || !topicId || !answers) {
      res.status(400).json({ error: 'quizId, topicId dan answers diperlukan' });
      return;
    }

    const questions = await prisma.quizQuestion.findMany({
      where: { quizId },
      orderBy: { order: 'asc' },
    });

    let score = 0;
    const gradedAnswers: Record<string, { answer: unknown; correct: boolean; explanation: string }> = {};

    for (const q of questions) {
      const userAnswer = answers[q.id];
      const isCorrect =
        String(userAnswer).toUpperCase().trim() === String(q.correctAnswer).toUpperCase().trim();
      if (isCorrect) score++;
      gradedAnswers[q.id] = {
        answer: userAnswer,
        correct: isCorrect,
        explanation: q.explanation,
      };
    }

    const stars = calculateStars(score, questions.length);

    const attempt = await prisma.quizAttempt.create({
      data: {
        userId: req.user!.userId,
        quizId,
        topicId,
        score,
        stars,
        answers: JSON.stringify(gradedAnswers),
      },
    });

    await prisma.topicProgress.upsert({
      where: {
        userId_topicId: {
          userId: req.user!.userId,
          topicId,
        },
      },
      create: {
        userId: req.user!.userId,
        topicId,
        quizCompleted: stars >= 1,
      },
      update: {
        quizCompleted: stars >= 1,
        lastAccessed: new Date(),
      },
    });

    // Award badges based on performance
    if (stars === 3) {
      const badge = await prisma.badge.findUnique({ where: { code: 'QUIZ_PERFECT' } });
      if (badge) {
        await prisma.userBadge.upsert({
          where: { userId_badgeId: { userId: req.user!.userId, badgeId: badge.id } },
          create: { userId: req.user!.userId, badgeId: badge.id },
          update: {},
        });
      }
    }

    res.status(201).json({
      attempt,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100),
      gradedAnswers,
    });
  } catch (error) {
    console.error('Quiz attempt error:', error);
    res.status(500).json({ error: 'Ralat menyimpan percubaan kuiz' });
  }
});

router.get('/quiz-attempts', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const topicId = req.query.topicId as string | undefined;

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        userId: req.user!.userId,
        ...(topicId && { topicId }),
      },
      include: {
        quiz: { select: { title: true } },
      },
      orderBy: { completedAt: 'desc' },
    });

    const parsed = attempts.map((a) => ({
      ...a,
      answers: JSON.parse(a.answers),
    }));

    res.json(parsed);
  } catch (error) {
    console.error('Get attempts error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan percubaan kuiz' });
  }
});

router.get('/badges', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const badges = await prisma.userBadge.findMany({
      where: { userId: req.user!.userId },
      include: { badge: true },
      orderBy: { earnedAt: 'desc' },
    });

    res.json(badges);
  } catch (error) {
    console.error('Badges error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan lencana' });
  }
});

router.get('/summary', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;

    const [progress, attempts, badges] = await Promise.all([
      prisma.topicProgress.findMany({ where: { userId } }),
      prisma.quizAttempt.findMany({ where: { userId } }),
      prisma.userBadge.count({ where: { userId } }),
    ]);

    const topicsCompleted = progress.filter(
      (p) => p.notesCompleted && p.quizCompleted
    ).length;

    const totalStars = attempts.reduce((sum, a) => sum + a.stars, 0);
    const avgScore =
      attempts.length > 0
        ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length)
        : 0;

    res.json({
      topicsStarted: progress.length,
      topicsCompleted,
      quizzesTaken: attempts.length,
      totalStars,
      averageScore: avgScore,
      badgesEarned: badges,
    });
  } catch (error) {
    console.error('Summary error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan ringkasan' });
  }
});

export default router;