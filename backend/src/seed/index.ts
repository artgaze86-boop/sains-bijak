import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { prisma } from '../lib/prisma';
import {
  YEAR_LEVELS,
  BADGES,
  generateExperiment,
  generateFlashcards,
  generateGames,
} from './content-data';
import { generateQuizQuestions } from './quiz-generator';
import { generateVideos } from './video-generator';

async function main() {
  console.log('🌱 Mula menyemai pangkalan data Sains Bijak...\n');

  // Clear existing data
  console.log('🗑️  Memadam data sedia ada...');
  await prisma.flashcardFavorite.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.topicProgress.deleteMany();
  await prisma.teacherAssignment.deleteMany();
  await prisma.classStudent.deleteMany();
  await prisma.class.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.parentChildLink.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.flashcard.deleteMany();
  await prisma.experiment.deleteMany();
  await prisma.game.deleteMany();
  await prisma.note.deleteMany();
  await prisma.learningVideo.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.yearLevel.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // Seed badges
  console.log('🏅 Menyemai lencana...');
  for (const badge of BADGES) {
    await prisma.badge.create({ data: badge });
  }

  // Seed year levels, topics, notes, quizzes, experiments, flashcards
  let totalTopics = 0;
  let totalQuestions = 0;
  let totalVideos = 0;

  for (const yearData of YEAR_LEVELS) {
    console.log(`\n📚 Menyemai ${yearData.title}...`);

    const yearLevel = await prisma.yearLevel.create({
      data: {
        year: yearData.year,
        title: yearData.title,
        description: yearData.description,
        color: yearData.color,
        icon: yearData.imageUrl,
        imageUrl: yearData.imageUrl,
      },
    });

    for (const topicData of yearData.topics) {
      const topic = await prisma.topic.create({
        data: {
          yearLevelId: yearLevel.id,
          title: topicData.title,
          slug: topicData.slug,
          description: topicData.description,
          icon: topicData.imageUrl,
          imageUrl: topicData.imageUrl,
          order: topicData.order,
          isFreeSample: topicData.isFreeSample ?? false,
        },
      });

      await prisma.note.create({
        data: {
          topicId: topic.id,
          explanation: topicData.note.explanation,
          keyPoints: JSON.stringify(topicData.note.keyPoints),
          vocabulary: JSON.stringify(topicData.note.vocabulary),
          funFact: topicData.note.funFact,
          recap: topicData.note.recap,
          icon: topicData.imageUrl,
          imageUrl: topicData.note.imageUrl,
        },
      });

      const quiz = await prisma.quiz.create({
        data: {
          topicId: topic.id,
          title: `Kuiz: ${topicData.title}`,
        },
      });

      const questions = generateQuizQuestions(topicData, 10);
      for (const q of questions) {
        await prisma.quizQuestion.create({
          data: {
            quizId: quiz.id,
            type: q.type,
            question: q.question,
            options: JSON.stringify(q.options),
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            imageUrl: q.imageUrl,
            order: q.order,
          },
        });
        totalQuestions++;
      }

      const experiment = generateExperiment(topicData, yearData.year);
      await prisma.experiment.create({
        data: {
          topicId: topic.id,
          yearLevel: yearData.year,
          title: experiment.title,
          materials: JSON.stringify(experiment.materials),
          safetyReminder: experiment.safetyReminder,
          steps: JSON.stringify(experiment.steps),
          observationQuestions: JSON.stringify(experiment.observationQuestions),
          learningOutcome: experiment.learningOutcome,
          supervisionReminder: experiment.supervisionReminder,
        },
      });

      const flashcards = generateFlashcards(topicData);
      for (const fc of flashcards) {
        await prisma.flashcard.create({
          data: {
            topicId: topic.id,
            front: fc.front,
            back: fc.back,
            category: fc.category,
            imageUrl: fc.imageUrl,
          },
        });
      }

      const videos = generateVideos(topicData, yearData.year);
      for (const video of videos) {
        await prisma.learningVideo.create({
          data: {
            topicId: topic.id,
            title: video.title,
            description: video.description,
            type: video.type,
            youtubeId: video.youtubeId,
            slidesJson: video.slidesJson,
            durationMin: video.durationMin,
            order: video.order,
            thumbnailUrl: video.thumbnailUrl,
          },
        });
        totalVideos++;
      }

      totalTopics++;
    }

    const games = generateGames(yearData.year);
    for (const game of games) {
      await prisma.game.create({
        data: {
          yearLevel: yearData.year,
          type: game.type,
          title: game.title,
          description: game.description,
          instructions: game.instructions,
          config: JSON.stringify(game.config),
          difficulty: game.difficulty,
        },
      });
    }
  }

  // Seed default users
  console.log('\n👤 Menyemai pengguna lalai...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@sainsbijak.my',
      password: adminPassword,
      name: 'Admin Sains Bijak',
      role: Role.ADMIN,
      isPremium: true,
      profile: { create: {} },
    },
  });

  const studentPassword = await bcrypt.hash('murid123', 10);
  const student = await prisma.user.create({
    data: {
      email: 'murid@sainsbijak.my',
      password: studentPassword,
      name: 'Ahmad Murid',
      role: Role.STUDENT,
      yearLevel: 1,
      classCode: 'BIJAK1',
      isPremium: true,
      profile: {
        create: {
          avatar: 'student-boy',
          dyslexiaFont: false,
          highContrast: false,
          audioEnabled: true,
        },
      },
    },
  });

  const teacherPassword = await bcrypt.hash('guru123', 10);
  const teacher = await prisma.user.create({
    data: {
      email: 'guru@sainsbijak.my',
      password: teacherPassword,
      name: 'Cikgu Sains',
      role: Role.TEACHER,
      isPremium: true,
      profile: { create: {} },
    },
  });

  const parentPassword = await bcrypt.hash('ibu123', 10);
  const parent = await prisma.user.create({
    data: {
      email: 'ibu@sainsbijak.my',
      password: parentPassword,
      name: 'Puan Siti (Ibu Bapa)',
      role: Role.PARENT,
      isPremium: true,
      profile: { create: {} },
    },
  });

  await prisma.parentChildLink.create({
    data: { parentId: parent.id, childId: student.id },
  });

  const demoClass = await prisma.class.create({
    data: {
      name: 'Tahun 1 Bijak',
      code: 'BIJAK1',
      teacherId: teacher.id,
    },
  });

  await prisma.classStudent.create({
    data: { classId: demoClass.id, studentId: student.id },
  });

  await prisma.subscription.create({
    data: {
      userId: student.id,
      type: 'PARENT',
      status: 'ACTIVE',
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('\n✅ Penyemaian selesai!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📊 Statistik:`);
  console.log(`   • Tahun persekolahan: ${YEAR_LEVELS.length}`);
  console.log(`   • Topik: ${totalTopics}`);
  console.log(`   • Soalan kuiz: ${totalQuestions}`);
  console.log(`   • Video pembelajaran: ${totalVideos}`);
  console.log(`   • Lencana: ${BADGES.length}`);
  console.log(`   • Permainan: ${YEAR_LEVELS.length * 3}`);
  console.log('\n🔑 Akaun lalai:');
  console.log('   Admin:   admin@sainsbijak.my / admin123');
  console.log('   Murid:   murid@sainsbijak.my / murid123');
  console.log('   Guru:    guru@sainsbijak.my / guru123');
  console.log('   Ibu bapa: ibu@sainsbijak.my / ibu123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error('❌ Ralat penyemaian:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });