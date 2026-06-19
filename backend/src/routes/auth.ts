import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { AuthRequest, authenticate, signToken } from '../middleware/auth';

const router = Router();

router.post('/register', async (req, res: Response) => {
  try {
    const { email, password, name, role, classCode, yearLevel, childEmail } = req.body;

    if (!email || !password || !name || !role) {
      res.status(400).json({ error: 'E-mel, kata laluan, nama dan peranan diperlukan' });
      return;
    }

    const validRoles: Role[] = [Role.STUDENT, Role.PARENT, Role.TEACHER];
    if (!validRoles.includes(role)) {
      res.status(400).json({ error: 'Peranan tidak sah untuk pendaftaran awam' });
      return;
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ error: 'E-mel sudah didaftarkan' });
      return;
    }

    if (role === Role.STUDENT) {
      if (!yearLevel || yearLevel < 1 || yearLevel > 6) {
        res.status(400).json({ error: 'Tahun persekolahan (1-6) diperlukan untuk murid' });
        return;
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        classCode: role === Role.STUDENT ? classCode : undefined,
        yearLevel: role === Role.STUDENT ? yearLevel : undefined,
        profile: { create: {} },
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        classCode: true,
        yearLevel: true,
        isPremium: true,
        createdAt: true,
      },
    });

    if (role === Role.PARENT && childEmail) {
      const child = await prisma.user.findUnique({ where: { email: childEmail } });
      if (child && child.role === Role.STUDENT) {
        await prisma.parentChildLink.create({
          data: { parentId: user.id, childId: child.id },
        });
      }
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Ralat pendaftaran' });
  }
});

router.post('/login', async (req, res: Response) => {
  try {
    const { email, password, classCode } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'E-mel dan kata laluan diperlukan' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });

    if (!user) {
      res.status(401).json({ error: 'E-mel atau kata laluan tidak betul' });
      return;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(401).json({ error: 'E-mel atau kata laluan tidak betul' });
      return;
    }

    if (user.role === Role.STUDENT && classCode && user.classCode && user.classCode !== classCode) {
      res.status(401).json({ error: 'Kod kelas tidak sepadan' });
      return;
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    const { password: _, ...safeUser } = user;

    res.json({ user: safeUser, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Ralat log masuk' });
  }
});

router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      include: {
        profile: true,
        userBadges: { include: { badge: true } },
        subscriptions: { where: { status: 'ACTIVE' } },
      },
    });

    if (!user) {
      res.status(404).json({ error: 'Pengguna tidak dijumpai' });
      return;
    }

    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan profil' });
  }
});

router.put('/profile', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { name, avatar, dyslexiaFont, highContrast, audioEnabled, settings } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user!.userId },
      data: {
        ...(name && { name }),
        profile: {
          update: {
            ...(avatar !== undefined && { avatar }),
            ...(dyslexiaFont !== undefined && { dyslexiaFont }),
            ...(highContrast !== undefined && { highContrast }),
            ...(audioEnabled !== undefined && { audioEnabled }),
            ...(settings !== undefined && { settings: JSON.stringify(settings) }),
          },
        },
      },
      include: { profile: true },
    });

    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Ralat mengemas kini profil' });
  }
});

export default router;