import { Router, Response } from 'express';
import { Role } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { param } from '../lib/params';
import { AuthRequest, authenticate, requireRole } from '../middleware/auth';

const router = Router();

router.use(authenticate, requireRole(Role.PARENT, Role.ADMIN));

router.get('/children', async (req: AuthRequest, res: Response) => {
  try {
    const links = await prisma.parentChildLink.findMany({
      where: { parentId: req.user!.userId },
      include: {
        child: {
          select: {
            id: true,
            name: true,
            email: true,
            yearLevel: true,
            classCode: true,
            isPremium: true,
            createdAt: true,
            profile: true,
          },
        },
      },
    });

    res.json(links.map((l) => l.child));
  } catch (error) {
    console.error('Children error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan senarai anak' });
  }
});

router.post('/children/link', async (req: AuthRequest, res: Response) => {
  try {
    const { childEmail } = req.body;

    if (!childEmail) {
      res.status(400).json({ error: 'E-mel anak diperlukan' });
      return;
    }

    const child = await prisma.user.findUnique({ where: { email: childEmail } });
    if (!child || child.role !== Role.STUDENT) {
      res.status(404).json({ error: 'Akaun murid tidak dijumpai' });
      return;
    }

    const link = await prisma.parentChildLink.upsert({
      where: {
        parentId_childId: {
          parentId: req.user!.userId,
          childId: child.id,
        },
      },
      create: {
        parentId: req.user!.userId,
        childId: child.id,
      },
      update: {},
    });

    res.status(201).json(link);
  } catch (error) {
    console.error('Link child error:', error);
    res.status(500).json({ error: 'Ralat memautkan akaun anak' });
  }
});

router.delete('/children/:childId', async (req: AuthRequest, res: Response) => {
  try {
    await prisma.parentChildLink.deleteMany({
      where: {
        parentId: req.user!.userId,
        childId: param(req.params.childId),
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Unlink child error:', error);
    res.status(500).json({ error: 'Ralat memutuskan pautan' });
  }
});

router.get('/children/:childId/progress', async (req: AuthRequest, res: Response) => {
  try {
    const link = await prisma.parentChildLink.findUnique({
      where: {
        parentId_childId: {
          parentId: req.user!.userId,
          childId: param(req.params.childId),
        },
      },
    });

    if (!link && req.user!.role !== Role.ADMIN) {
      res.status(403).json({ error: 'Anak tidak dipautkan kepada akaun ini' });
      return;
    }

    const [progress, attempts, badges] = await Promise.all([
      prisma.topicProgress.findMany({
        where: { userId: param(req.params.childId) },
        include: {
          topic: {
            select: { title: true, slug: true, yearLevel: { select: { year: true } } },
          },
        },
        orderBy: { lastAccessed: 'desc' },
      }),
      prisma.quizAttempt.findMany({
        where: { userId: param(req.params.childId) },
        include: { quiz: { select: { title: true } } },
        orderBy: { completedAt: 'desc' },
        take: 20,
      }),
      prisma.userBadge.findMany({
        where: { userId: param(req.params.childId) },
        include: { badge: true },
      }),
    ]);

    res.json({ progress, attempts, badges });
  } catch (error) {
    console.error('Child progress error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan kemajuan anak' });
  }
});

router.get('/children/:childId/summary', async (req: AuthRequest, res: Response) => {
  try {
    const link = await prisma.parentChildLink.findUnique({
      where: {
        parentId_childId: {
          parentId: req.user!.userId,
          childId: param(req.params.childId),
        },
      },
    });

    if (!link && req.user!.role !== Role.ADMIN) {
      res.status(403).json({ error: 'Anak tidak dipautkan kepada akaun ini' });
      return;
    }

    const child = await prisma.user.findUnique({
      where: { id: param(req.params.childId) },
      select: { name: true, yearLevel: true, email: true },
    });

    const [progress, attempts, badgeCount] = await Promise.all([
      prisma.topicProgress.findMany({ where: { userId: param(req.params.childId) } }),
      prisma.quizAttempt.findMany({ where: { userId: param(req.params.childId) } }),
      prisma.userBadge.count({ where: { userId: param(req.params.childId) } }),
    ]);

    const byYear: Record<number, { started: number; completed: number }> = {};

    for (const p of progress) {
      const topic = await prisma.topic.findUnique({
        where: { id: p.topicId },
        include: { yearLevel: true },
      });
      const year = topic?.yearLevel.year ?? 0;
      if (!byYear[year]) byYear[year] = { started: 0, completed: 0 };
      byYear[year].started++;
      if (p.notesCompleted && p.quizCompleted) byYear[year].completed++;
    }

    res.json({
      child,
      topicsStarted: progress.length,
      topicsCompleted: progress.filter((p) => p.notesCompleted && p.quizCompleted).length,
      quizzesTaken: attempts.length,
      totalStars: attempts.reduce((s, a) => s + a.stars, 0),
      badgesEarned: badgeCount,
      progressByYear: byYear,
      recentActivity: progress.slice(0, 5).map((p) => ({
        topicId: p.topicId,
        lastAccessed: p.lastAccessed,
        notesCompleted: p.notesCompleted,
        quizCompleted: p.quizCompleted,
      })),
    });
  } catch (error) {
    console.error('Child summary error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan ringkasan anak' });
  }
});

router.get('/dashboard', async (req: AuthRequest, res: Response) => {
  try {
    const children = await prisma.parentChildLink.findMany({
      where: { parentId: req.user!.userId },
      include: {
        child: {
          select: { id: true, name: true, yearLevel: true },
        },
      },
    });

    const summaries = await Promise.all(
      children.map(async ({ child }) => {
        const [progress, attempts, badges] = await Promise.all([
          prisma.topicProgress.count({ where: { userId: child.id } }),
          prisma.quizAttempt.count({ where: { userId: child.id } }),
          prisma.userBadge.count({ where: { userId: child.id } }),
        ]);

        const lastActivity = await prisma.topicProgress.findFirst({
          where: { userId: child.id },
          orderBy: { lastAccessed: 'desc' },
        });

        return {
          ...child,
          topicsStarted: progress,
          quizzesTaken: attempts,
          badgesEarned: badges,
          lastActivity: lastActivity?.lastAccessed,
        };
      })
    );

    res.json({ children: summaries });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan papan pemuka ibu bapa' });
  }
});

export default router;