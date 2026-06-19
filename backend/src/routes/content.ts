import { Router, Response } from 'express';
import { Role } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { param } from '../lib/params';
import { AuthPayload, AuthRequest, authenticate, optionalAuth, requirePremium } from '../middleware/auth';

const router = Router();

async function canAccessTopic(user: AuthPayload | undefined, topic: { isFreeSample: boolean }): Promise<boolean> {
  if (topic.isFreeSample) return true;
  if (!user) return false;
  if (user.role === Role.ADMIN || user.role === Role.TEACHER) return true;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: { isPremium: true },
  });

  return dbUser?.isPremium ?? false;
}

router.get('/year-levels', optionalAuth, async (_req, res: Response) => {
  try {
    const yearLevels = await prisma.yearLevel.findMany({
      orderBy: { year: 'asc' },
      include: {
        _count: { select: { topics: true } },
      },
    });
    res.json(yearLevels);
  } catch (error) {
    console.error('Year levels error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan tahun persekolahan' });
  }
});

router.get('/year-levels/:year', optionalAuth, async (req, res: Response) => {
  try {
    const year = parseInt(param(req.params.year), 10);
    const yearLevel = await prisma.yearLevel.findUnique({
      where: { year },
      include: {
        topics: { orderBy: { order: 'asc' } },
      },
    });

    if (!yearLevel) {
      res.status(404).json({ error: 'Tahun persekolahan tidak dijumpai' });
      return;
    }

    res.json(yearLevel);
  } catch (error) {
    console.error('Year level error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan tahun persekolahan' });
  }
});

router.get('/topics', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const year = req.query.year ? parseInt(req.query.year as string, 10) : undefined;

    const topics = await prisma.topic.findMany({
      where: year
        ? { yearLevel: { year } }
        : undefined,
      orderBy: [{ yearLevel: { year: 'asc' } }, { order: 'asc' }],
      include: { yearLevel: { select: { year: true, title: true, color: true } } },
    });

    const mapped = topics.map((t) => ({
      ...t,
      locked: !t.isFreeSample && !req.user,
    }));

    res.json(mapped);
  } catch (error) {
    console.error('Topics error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan topik' });
  }
});

router.get('/topics/:slug', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const topic = await prisma.topic.findUnique({
      where: { slug: param(req.params.slug) },
      include: {
        yearLevel: true,
        notes: true,
        quizzes: {
          include: { _count: { select: { questions: true } } },
        },
        experiments: true,
        flashcards: true,
      },
    });

    if (!topic) {
      res.status(404).json({ error: 'Topik tidak dijumpai' });
      return;
    }

    const hasAccess = await canAccessTopic(req.user, topic);
    if (!hasAccess) {
      res.status(403).json({
        error: 'Langganan premium diperlukan',
        code: 'PREMIUM_REQUIRED',
        preview: {
          title: topic.title,
          description: topic.description,
          icon: topic.icon,
          isFreeSample: topic.isFreeSample,
        },
      });
      return;
    }

    res.json(topic);
  } catch (error) {
    console.error('Topic error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan topik' });
  }
});

router.get('/topics/:slug/notes', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const topic = await prisma.topic.findUnique({ where: { slug: param(req.params.slug) } });
    if (!topic) {
      res.status(404).json({ error: 'Topik tidak dijumpai' });
      return;
    }

    if (!(await canAccessTopic(req.user, topic))) {
      res.status(403).json({ error: 'Langganan premium diperlukan', code: 'PREMIUM_REQUIRED' });
      return;
    }

    const notes = await prisma.note.findMany({ where: { topicId: topic.id } });
    const parsed = notes.map((n) => ({
      ...n,
      topicTitle: topic.title,
      keyPoints: JSON.parse(n.keyPoints),
      vocabulary: JSON.parse(n.vocabulary),
    }));

    res.json(parsed);
  } catch (error) {
    console.error('Notes error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan nota' });
  }
});

router.get('/topics/:slug/quizzes', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const topic = await prisma.topic.findUnique({ where: { slug: param(req.params.slug) } });
    if (!topic) {
      res.status(404).json({ error: 'Topik tidak dijumpai' });
      return;
    }

    if (!(await canAccessTopic(req.user, topic))) {
      res.status(403).json({ error: 'Langganan premium diperlukan', code: 'PREMIUM_REQUIRED' });
      return;
    }

    const quizzes = await prisma.quiz.findMany({
      where: { topicId: topic.id },
      include: { _count: { select: { questions: true } } },
    });

    res.json(quizzes);
  } catch (error) {
    console.error('Quizzes error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan kuiz' });
  }
});

router.get('/quizzes/:id', authenticate, requirePremium, async (req: AuthRequest, res: Response) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: param(req.params.id) },
      include: {
        topic: { include: { yearLevel: true } },
        questions: { orderBy: { order: 'asc' } },
      },
    });

    if (!quiz) {
      res.status(404).json({ error: 'Kuiz tidak dijumpai' });
      return;
    }

    const questions = quiz.questions.map((q) => ({
      ...q,
      options: JSON.parse(q.options),
      // Hide correct answer from client until submission
      correctAnswer: undefined,
    }));

    res.json({ ...quiz, questions });
  } catch (error) {
    console.error('Quiz error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan kuiz' });
  }
});

router.get('/topics/:slug/experiments', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const topic = await prisma.topic.findUnique({ where: { slug: param(req.params.slug) } });
    if (!topic) {
      res.status(404).json({ error: 'Topik tidak dijumpai' });
      return;
    }

    if (!(await canAccessTopic(req.user, topic))) {
      res.status(403).json({ error: 'Langganan premium diperlukan', code: 'PREMIUM_REQUIRED' });
      return;
    }

    const experiments = await prisma.experiment.findMany({ where: { topicId: topic.id } });
    const parsed = experiments.map((e) => ({
      ...e,
      materials: JSON.parse(e.materials),
      steps: JSON.parse(e.steps),
      observationQuestions: JSON.parse(e.observationQuestions),
    }));

    res.json(parsed);
  } catch (error) {
    console.error('Experiments error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan eksperimen' });
  }
});

router.get('/topics/:slug/videos', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const topic = await prisma.topic.findUnique({ where: { slug: param(req.params.slug) } });
    if (!topic) {
      res.status(404).json({ error: 'Topik tidak dijumpai' });
      return;
    }

    if (!(await canAccessTopic(req.user, topic))) {
      res.status(403).json({ error: 'Langganan premium diperlukan', code: 'PREMIUM_REQUIRED' });
      return;
    }

    const videos = await prisma.learningVideo.findMany({
      where: { topicId: topic.id },
      orderBy: { order: 'asc' },
    });

    const parsed = videos.map((v) => ({
      ...v,
      slides: v.slidesJson ? JSON.parse(v.slidesJson) : undefined,
    }));

    res.json(parsed);
  } catch (error) {
    console.error('Videos error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan video' });
  }
});

router.get('/videos/:id', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const video = await prisma.learningVideo.findUnique({
      where: { id: param(req.params.id) },
      include: { topic: true },
    });

    if (!video) {
      res.status(404).json({ error: 'Video tidak dijumpai' });
      return;
    }

    if (!(await canAccessTopic(req.user, video.topic))) {
      res.status(403).json({ error: 'Langganan premium diperlukan', code: 'PREMIUM_REQUIRED' });
      return;
    }

    res.json({
      ...video,
      slides: video.slidesJson ? JSON.parse(video.slidesJson) : undefined,
      topicTitle: video.topic.title,
      topicSlug: video.topic.slug,
    });
  } catch (error) {
    console.error('Video error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan video' });
  }
});

router.get('/games', optionalAuth, async (req, res: Response) => {
  try {
    const year = req.query.year ? parseInt(req.query.year as string, 10) : undefined;
    const games = await prisma.game.findMany({
      where: year ? { yearLevel: year } : undefined,
      orderBy: [{ yearLevel: 'asc' }, { difficulty: 'asc' }],
    });

    const parsed = games.map((g) => ({
      ...g,
      config: JSON.parse(g.config),
    }));

    res.json(parsed);
  } catch (error) {
    console.error('Games error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan permainan' });
  }
});

router.get('/topics/:slug/flashcards', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const topic = await prisma.topic.findUnique({ where: { slug: param(req.params.slug) } });
    if (!topic) {
      res.status(404).json({ error: 'Topik tidak dijumpai' });
      return;
    }

    if (!(await canAccessTopic(req.user, topic))) {
      res.status(403).json({ error: 'Langganan premium diperlukan', code: 'PREMIUM_REQUIRED' });
      return;
    }

    const flashcards = await prisma.flashcard.findMany({ where: { topicId: topic.id } });
    res.json(flashcards);
  } catch (error) {
    console.error('Flashcards error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan kad imbas' });
  }
});

router.post('/flashcards/:id/favorite', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const favorite = await prisma.flashcardFavorite.upsert({
      where: {
        userId_flashcardId: {
          userId: req.user!.userId,
          flashcardId: param(req.params.id),
        },
      },
      create: {
        userId: req.user!.userId,
        flashcardId: param(req.params.id),
      },
      update: {},
    });

    res.json(favorite);
  } catch (error) {
    console.error('Favorite error:', error);
    res.status(500).json({ error: 'Ralat menambah kegemaran' });
  }
});

router.delete('/flashcards/:id/favorite', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.flashcardFavorite.deleteMany({
      where: {
        userId: req.user!.userId,
        flashcardId: param(req.params.id),
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Unfavorite error:', error);
    res.status(500).json({ error: 'Ralat membuang kegemaran' });
  }
});

export default router;