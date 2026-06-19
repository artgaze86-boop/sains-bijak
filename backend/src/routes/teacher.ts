import { Router, Response } from 'express';
import { Role } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { param } from '../lib/params';
import { AuthRequest, authenticate, requireRole } from '../middleware/auth';

const router = Router();

function generateClassCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

router.use(authenticate, requireRole(Role.TEACHER, Role.ADMIN));

router.get('/classes', async (req: AuthRequest, res: Response) => {
  try {
    const classes = await prisma.class.findMany({
      where: req.user!.role === Role.ADMIN ? {} : { teacherId: req.user!.userId },
      include: {
        _count: { select: { students: true, assignments: true } },
        teacher: { select: { name: true, email: true } },
      },
      orderBy: { name: 'asc' },
    });

    res.json(classes);
  } catch (error) {
    console.error('Classes error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan kelas' });
  }
});

router.post('/classes', async (req: AuthRequest, res: Response) => {
  try {
    const { name, code } = req.body;

    if (!name) {
      res.status(400).json({ error: 'Nama kelas diperlukan' });
      return;
    }

    const classCode = code || generateClassCode();

    const existing = await prisma.class.findUnique({ where: { code: classCode } });
    if (existing) {
      res.status(409).json({ error: 'Kod kelas sudah wujud' });
      return;
    }

    const newClass = await prisma.class.create({
      data: {
        name,
        code: classCode,
        teacherId: req.user!.userId,
      },
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({ error: 'Ralat mencipta kelas' });
  }
});

router.get('/classes/:id', async (req: AuthRequest, res: Response) => {
  try {
    const classId = param(req.params.id);
    const classData = await prisma.class.findUnique({
      where: { id: classId },
    });

    if (!classData) {
      res.status(404).json({ error: 'Kelas tidak dijumpai' });
      return;
    }

    if (req.user!.role !== Role.ADMIN && classData.teacherId !== req.user!.userId) {
      res.status(403).json({ error: 'Akses ditolak' });
      return;
    }

    const [students, assignments] = await Promise.all([
      prisma.classStudent.findMany({
        where: { classId },
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              yearLevel: true,
              classCode: true,
            },
          },
        },
      }),
      prisma.teacherAssignment.findMany({
        where: { classId },
        include: {
          topic: { select: { title: true, slug: true } },
          quiz: { select: { title: true } },
        },
        orderBy: { assignedAt: 'desc' },
      }),
    ]);

    res.json({
      ...classData,
      students: students.map((s) => s.student),
      assignments,
    });
  } catch (error) {
    console.error('Class detail error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan kelas' });
  }
});

router.post('/classes/:id/students', async (req: AuthRequest, res: Response) => {
  try {
    const { studentId, studentEmail } = req.body;

    const classId = param(req.params.id);
    const classData = await prisma.class.findUnique({ where: { id: classId } });
    if (!classData) {
      res.status(404).json({ error: 'Kelas tidak dijumpai' });
      return;
    }

    if (req.user!.role !== Role.ADMIN && classData.teacherId !== req.user!.userId) {
      res.status(403).json({ error: 'Akses ditolak' });
      return;
    }

    let student;
    if (studentId) {
      student = await prisma.user.findUnique({ where: { id: studentId } });
    } else if (studentEmail) {
      student = await prisma.user.findUnique({ where: { email: studentEmail } });
    }

    if (!student || student.role !== Role.STUDENT) {
      res.status(404).json({ error: 'Murid tidak dijumpai' });
      return;
    }

    await prisma.$transaction([
      prisma.classStudent.upsert({
        where: {
          classId_studentId: { classId, studentId: student.id },
        },
        create: { classId, studentId: student.id },
        update: {},
      }),
      prisma.user.update({
        where: { id: student.id },
        data: { classCode: classData.code },
      }),
    ]);

    res.status(201).json({ success: true, studentId: student.id });
  } catch (error) {
    console.error('Add student error:', error);
    res.status(500).json({ error: 'Ralat menambah murid' });
  }
});

router.delete('/classes/:id/students/:studentId', async (req: AuthRequest, res: Response) => {
  try {
    const classId = param(req.params.id);
    const classData = await prisma.class.findUnique({ where: { id: classId } });
    if (!classData) {
      res.status(404).json({ error: 'Kelas tidak dijumpai' });
      return;
    }

    if (req.user!.role !== Role.ADMIN && classData.teacherId !== req.user!.userId) {
      res.status(403).json({ error: 'Akses ditolak' });
      return;
    }

    await prisma.classStudent.deleteMany({
      where: {
        classId,
        studentId: param(req.params.studentId),
      },
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Remove student error:', error);
    res.status(500).json({ error: 'Ralat membuang murid' });
  }
});

router.post('/assignments', async (req: AuthRequest, res: Response) => {
  try {
    const { classId, topicId, quizId, dueDate } = req.body;

    if (!classId || (!topicId && !quizId)) {
      res.status(400).json({ error: 'classId dan topicId atau quizId diperlukan' });
      return;
    }

    const classData = await prisma.class.findUnique({ where: { id: classId } });
    if (!classData) {
      res.status(404).json({ error: 'Kelas tidak dijumpai' });
      return;
    }

    if (req.user!.role !== Role.ADMIN && classData.teacherId !== req.user!.userId) {
      res.status(403).json({ error: 'Akses ditolak' });
      return;
    }

    const assignment = await prisma.teacherAssignment.create({
      data: {
        classId,
        topicId,
        quizId,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
      include: {
        topic: { select: { title: true } },
        quiz: { select: { title: true } },
      },
    });

    res.status(201).json(assignment);
  } catch (error) {
    console.error('Assignment error:', error);
    res.status(500).json({ error: 'Ralat menetapkan tugasan' });
  }
});

router.get('/classes/:id/performance', async (req: AuthRequest, res: Response) => {
  try {
    const classId = param(req.params.id);
    const classData = await prisma.class.findUnique({
      where: { id: classId },
    });

    if (!classData) {
      res.status(404).json({ error: 'Kelas tidak dijumpai' });
      return;
    }

    if (req.user!.role !== Role.ADMIN && classData.teacherId !== req.user!.userId) {
      res.status(403).json({ error: 'Akses ditolak' });
      return;
    }

    const classStudents = await prisma.classStudent.findMany({
      where: { classId },
      include: { student: true },
    });

    const performance = await Promise.all(
      classStudents.map(async ({ student }) => {
        const [progress, attempts] = await Promise.all([
          prisma.topicProgress.findMany({ where: { userId: student.id } }),
          prisma.quizAttempt.findMany({ where: { userId: student.id } }),
        ]);

        const avgScore =
          attempts.length > 0
            ? Math.round(
                (attempts.reduce((s, a) => s + a.score, 0) / attempts.length) * 100
              ) / 100
            : 0;

        return {
          student: {
            id: student.id,
            name: student.name,
            yearLevel: student.yearLevel,
          },
          topicsStarted: progress.length,
          topicsCompleted: progress.filter((p) => p.notesCompleted && p.quizCompleted).length,
          quizzesTaken: attempts.length,
          averageScore: avgScore,
          totalStars: attempts.reduce((s, a) => s + a.stars, 0),
        };
      })
    );

    res.json({
      class: { id: classData.id, name: classData.name, code: classData.code },
      performance,
    });
  } catch (error) {
    console.error('Performance error:', error);
    res.status(500).json({ error: 'Ralat mendapatkan prestasi kelas' });
  }
});

export default router;