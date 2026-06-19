import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { param } from '../lib/params';
import { AuthRequest, authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.use(authenticate, requireRole(Role.ADMIN));

// --- Analytics ---
router.get('/analytics', async (_req, res: Response) => {
  try {
    const [
      userCount,
      studentCount,
      teacherCount,
      parentCount,
      topicCount,
      quizAttemptCount,
      premiumCount,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: Role.STUDENT } }),
      prisma.user.count({ where: { role: Role.TEACHER } }),
      prisma.user.count({ where: { role: Role.PARENT } }),
      prisma.topic.count(),
      prisma.quizAttempt.count(),
      prisma.user.count({ where: { isPremium: true } }),
    ]);

    const attemptsByMonth = await prisma.quizAttempt.groupBy({
      by: ['completedAt'],
      _count: true,
    });

    res.json({
      users: { total: userCount, students: studentCount, teachers: teacherCount, parents: parentCount, premium: premiumCount },
      content: { topics: topicCount },
      engagement: { quizAttempts: quizAttemptCount, attemptsByMonth: attemptsByMonth.length },
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan analitik' });
  }
});

// --- Users CRUD ---
router.get('/users', async (req, res: Response) => {
  try {
    const role = req.query.role as Role | undefined;
    const users = await prisma.user.findMany({
      where: role ? { role } : undefined,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        yearLevel: true,
        classCode: true,
        isPremium: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mendapatkan pengguna' });
  }
});

router.post('/users', async (req, res: Response) => {
  try {
    const { email, password, name, role, yearLevel, isPremium } = req.body;
    const hashed = await bcrypt.hash(password || 'password123', 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        role: role || Role.STUDENT,
        yearLevel,
        isPremium: isPremium ?? false,
        profile: { create: {} },
      },
      select: { id: true, email: true, name: true, role: true },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mencipta pengguna' });
  }
});

router.put('/users/:id', async (req, res: Response) => {
  try {
    const { name, role, yearLevel, isPremium, password } = req.body;

    const user = await prisma.user.update({
      where: { id: param(req.params.id) },
      data: {
        ...(name && { name }),
        ...(role && { role }),
        ...(yearLevel !== undefined && { yearLevel }),
        ...(isPremium !== undefined && { isPremium }),
        ...(password && { password: await bcrypt.hash(password, 10) }),
      },
      select: { id: true, email: true, name: true, role: true, isPremium: true },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mengemas kini pengguna' });
  }
});

router.delete('/users/:id', async (req, res: Response) => {
  try {
    await prisma.user.delete({ where: { id: param(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ralat memadam pengguna' });
  }
});

// --- Year Levels ---
router.post('/year-levels', async (req, res: Response) => {
  try {
    const yearLevel = await prisma.yearLevel.create({ data: req.body });
    res.status(201).json(yearLevel);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mencipta tahun' });
  }
});

router.put('/year-levels/:id', async (req, res: Response) => {
  try {
    const yearLevel = await prisma.yearLevel.update({
      where: { id: param(req.params.id) },
      data: req.body,
    });
    res.json(yearLevel);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mengemas kini tahun' });
  }
});

// --- Topics ---
router.get('/topics', async (_req, res: Response) => {
  try {
    const topics = await prisma.topic.findMany({
      include: { yearLevel: true },
      orderBy: [{ yearLevel: { year: 'asc' } }, { order: 'asc' }],
    });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mendapatkan topik' });
  }
});

router.post('/topics', async (req, res: Response) => {
  try {
    const topic = await prisma.topic.create({ data: req.body });
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mencipta topik' });
  }
});

router.put('/topics/:id', async (req, res: Response) => {
  try {
    const topic = await prisma.topic.update({
      where: { id: param(req.params.id) },
      data: req.body,
    });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mengemas kini topik' });
  }
});

router.delete('/topics/:id', async (req, res: Response) => {
  try {
    await prisma.topic.delete({ where: { id: param(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ralat memadam topik' });
  }
});

// --- Notes ---
router.post('/notes', async (req, res: Response) => {
  try {
    const { keyPoints, vocabulary, ...rest } = req.body;
    const note = await prisma.note.create({
      data: {
        ...rest,
        keyPoints: JSON.stringify(keyPoints ?? []),
        vocabulary: JSON.stringify(vocabulary ?? []),
      },
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mencipta nota' });
  }
});

router.put('/notes/:id', async (req, res: Response) => {
  try {
    const { keyPoints, vocabulary, ...rest } = req.body;
    const note = await prisma.note.update({
      where: { id: param(req.params.id) },
      data: {
        ...rest,
        ...(keyPoints && { keyPoints: JSON.stringify(keyPoints) }),
        ...(vocabulary && { vocabulary: JSON.stringify(vocabulary) }),
      },
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mengemas kini nota' });
  }
});

router.delete('/notes/:id', async (req, res: Response) => {
  try {
    await prisma.note.delete({ where: { id: param(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ralat memadam nota' });
  }
});

// --- Quizzes & Questions ---
router.post('/quizzes', async (req, res: Response) => {
  try {
    const quiz = await prisma.quiz.create({ data: req.body });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mencipta kuiz' });
  }
});

router.post('/quiz-questions', async (req, res: Response) => {
  try {
    const { options, ...rest } = req.body;
    const question = await prisma.quizQuestion.create({
      data: {
        ...rest,
        options: JSON.stringify(options ?? []),
      },
    });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mencipta soalan' });
  }
});

router.put('/quiz-questions/:id', async (req, res: Response) => {
  try {
    const { options, ...rest } = req.body;
    const question = await prisma.quizQuestion.update({
      where: { id: param(req.params.id) },
      data: {
        ...rest,
        ...(options && { options: JSON.stringify(options) }),
      },
    });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mengemas kini soalan' });
  }
});

router.delete('/quiz-questions/:id', async (req, res: Response) => {
  try {
    await prisma.quizQuestion.delete({ where: { id: param(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ralat memadam soalan' });
  }
});

// --- Experiments ---
router.post('/experiments', async (req, res: Response) => {
  try {
    const { materials, steps, observationQuestions, ...rest } = req.body;
    const experiment = await prisma.experiment.create({
      data: {
        ...rest,
        materials: JSON.stringify(materials ?? []),
        steps: JSON.stringify(steps ?? []),
        observationQuestions: JSON.stringify(observationQuestions ?? []),
      },
    });
    res.status(201).json(experiment);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mencipta eksperimen' });
  }
});

router.put('/experiments/:id', async (req, res: Response) => {
  try {
    const { materials, steps, observationQuestions, ...rest } = req.body;
    const experiment = await prisma.experiment.update({
      where: { id: param(req.params.id) },
      data: {
        ...rest,
        ...(materials && { materials: JSON.stringify(materials) }),
        ...(steps && { steps: JSON.stringify(steps) }),
        ...(observationQuestions && { observationQuestions: JSON.stringify(observationQuestions) }),
      },
    });
    res.json(experiment);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mengemas kini eksperimen' });
  }
});

router.delete('/experiments/:id', async (req, res: Response) => {
  try {
    await prisma.experiment.delete({ where: { id: param(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ralat memadam eksperimen' });
  }
});

// --- Games ---
router.get('/games', async (_req, res: Response) => {
  try {
    const games = await prisma.game.findMany({ orderBy: [{ yearLevel: 'asc' }, { title: 'asc' }] });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mendapatkan permainan' });
  }
});

router.post('/games', async (req, res: Response) => {
  try {
    const { config, ...rest } = req.body;
    const game = await prisma.game.create({
      data: { ...rest, config: JSON.stringify(config ?? {}) },
    });
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mencipta permainan' });
  }
});

router.put('/games/:id', async (req, res: Response) => {
  try {
    const { config, ...rest } = req.body;
    const game = await prisma.game.update({
      where: { id: param(req.params.id) },
      data: { ...rest, ...(config && { config: JSON.stringify(config) }) },
    });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mengemas kini permainan' });
  }
});

router.delete('/games/:id', async (req, res: Response) => {
  try {
    await prisma.game.delete({ where: { id: param(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ralat memadam permainan' });
  }
});

// --- Flashcards ---
router.post('/flashcards', async (req, res: Response) => {
  try {
    const flashcard = await prisma.flashcard.create({ data: req.body });
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mencipta kad imbas' });
  }
});

router.put('/flashcards/:id', async (req, res: Response) => {
  try {
    const flashcard = await prisma.flashcard.update({
      where: { id: param(req.params.id) },
      data: req.body,
    });
    res.json(flashcard);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mengemas kini kad imbas' });
  }
});

router.delete('/flashcards/:id', async (req, res: Response) => {
  try {
    await prisma.flashcard.delete({ where: { id: param(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ralat memadam kad imbas' });
  }
});

// --- Badges ---
router.get('/badges', async (_req, res: Response) => {
  try {
    const badges = await prisma.badge.findMany({ orderBy: { code: 'asc' } });
    res.json(badges);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mendapatkan lencana' });
  }
});

router.post('/badges', async (req, res: Response) => {
  try {
    const badge = await prisma.badge.create({ data: req.body });
    res.status(201).json(badge);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mencipta lencana' });
  }
});

router.put('/badges/:id', async (req, res: Response) => {
  try {
    const badge = await prisma.badge.update({
      where: { id: param(req.params.id) },
      data: req.body,
    });
    res.json(badge);
  } catch (error) {
    res.status(500).json({ error: 'Ralat mengemas kini lencana' });
  }
});

router.delete('/badges/:id', async (req, res: Response) => {
  try {
    await prisma.badge.delete({ where: { id: param(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Ralat memadam lencana' });
  }
});

export default router;