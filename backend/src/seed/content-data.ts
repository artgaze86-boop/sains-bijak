import { ALL_YEARS_TOPICS, CompleteTopicDef, CompleteTopicNote } from './topics-content';
import { enrichTopicNote } from './note-enrichment';

export type { CompleteTopicDef, CompleteTopicNote };

export interface TopicSeed {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  order: number;
  isFreeSample?: boolean;
  note: CompleteTopicNote & { imageUrl: string };
}

export interface YearLevelSeed {
  year: number;
  title: string;
  description: string;
  color: string;
  imageUrl: string;
  topics: TopicSeed[];
}

const YEAR_COLORS: Record<number, string> = {
  1: '#4CAF50',
  2: '#2196F3',
  3: '#FF9800',
  4: '#9C27B0',
  5: '#E91E63',
  6: '#F44336',
};

const YEAR_BANNERS: Record<number, string> = {
  1: '/images/years/year-1-banner.png',
  2: '/images/years/year-2-banner.png',
  3: '/images/years/year-3-banner.png',
  4: '/images/years/year-4-banner.png',
  5: '/images/years/year-5-banner.png',
  6: '/images/years/year-6-banner.png',
};

function slugify(year: number, order: number, title: string): string {
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return `tahun-${year}-${String(order).padStart(2, '0')}-${base}`;
}

export function getTopicImageUrl(slug: string): string {
  return `/images/topics/${slug}.png`;
}

function mapTopic(year: number, def: CompleteTopicDef): TopicSeed {
  const slug = slugify(year, def.order, def.title);
  const imageUrl = getTopicImageUrl(slug);
  const enrichedNote = enrichTopicNote(def.note, year, def.order);
  return {
    title: def.title,
    slug,
    description: def.description,
    imageUrl,
    order: def.order,
    isFreeSample: def.isFreeSample ?? def.order === 1,
    note: { ...enrichedNote, imageUrl },
  };
}

export const YEAR_LEVELS: YearLevelSeed[] = [1, 2, 3, 4, 5, 6].map((year) => {
  const topics = ALL_YEARS_TOPICS[year] ?? [];
  return {
    year,
    title: `Sains Tahun ${year}`,
    description: `Kandungan Sains KSSR lengkap untuk murid Tahun ${year}`,
    color: YEAR_COLORS[year],
    imageUrl: YEAR_BANNERS[year],
    topics: topics.map((t) => mapTopic(year, t)),
  };
});

export const BADGES = [
  { code: 'FIRST_LOGIN', name: 'Langkah Pertama', description: 'Log masuk kali pertama ke Sains Bijak', icon: '/images/badges/first-login.png' },
  { code: 'FIRST_NOTE', name: 'Pembaca Bijak', description: 'Selesai membaca nota pertama', icon: '/images/badges/first-note.png' },
  { code: 'FIRST_QUIZ', name: 'Pencabar Kuiz', description: 'Menyelesaikan kuiz pertama', icon: '/images/badges/first-quiz.png' },
  { code: 'QUIZ_PERFECT', name: 'Bintang Tiga', description: 'Dapat markah sempurna dalam kuiz', icon: '/images/badges/quiz-perfect.png' },
  { code: 'EXPERIMENT_DONE', name: 'Ahli Makmal', description: 'Menyelesaikan eksperimen pertama', icon: '/images/badges/experiment.png' },
  { code: 'FLASHCARD_MASTER', name: 'Pakar Kad Imbas', description: 'Ulang kaji 50 kad imbas', icon: '/images/badges/flashcard.png' },
  { code: 'YEAR_COMPLETE', name: 'Juara Tahun', description: 'Selesai semua topik dalam satu tahun', icon: '/images/badges/year-complete.png' },
  { code: 'STREAK_7', name: 'Bertekun 7 Hari', description: 'Belajar 7 hari berturut-turut', icon: '/images/badges/streak.png' },
  { code: 'KBAT_THINKER', name: 'Pemikir KBAT', description: 'Jawab 10 soalan KBAT dengan betul', icon: '/images/badges/kbat.png' },
  { code: 'SCIENCE_HERO', name: 'Wira Sains', description: 'Kumpul 5 lencana', icon: '/images/badges/hero.png' },
  ...Array.from({ length: 6 }, (_, i) => ({
    code: `YEAR_${i + 1}_START`,
    name: `Penjelajah Tahun ${i + 1}`,
    description: `Mula belajar Sains Tahun ${i + 1}`,
    icon: `/images/badges/year-${i + 1}.png`,
    yearLevel: i + 1,
  })),
];

export function generateExperiment(topic: TopicSeed, year: number) {
  return {
    title: `Eksperimen: ${topic.title}`,
    materials: [
      'Bahan mudah didapati di rumah atau sekolah',
      'Alat keselamatan (sarung tangan, cermin mata keselamatan)',
      'Buku rekod pemerhatian',
      'Pen dan kertas',
    ],
    safetyReminder: 'Sentiasa mendapatkan bimbingan guru atau ibu bapa. Jangan masukkan bahan ke dalam mulut.',
    steps: [
      `Baca prosedur eksperimen tentang ${topic.title}.`,
      'Sediakan semua bahan dan alat yang diperlukan.',
      'Jalankan eksperimen dengan berhati-hati mengikut langkah.',
      'Catat pemerhatian dalam jadual rekod.',
      'Bincangkan hasil dan tarik kesimpulan.',
    ],
    observationQuestions: [
      `Apakah yang anda perhatikan tentang ${topic.title}?`,
      'Adakah hasil menyokong jangkaan anda?',
      'Bagaimana ini berkaitan dengan kehidupan seharian?',
    ],
    learningOutcome: `Murid memahami ${topic.title} melalui pemerhatian hands-on.`,
    supervisionReminder: 'Lakukan aktiviti ini dengan pengawasan ibu bapa atau guru.',
  };
}

export function generateFlashcards(topic: TopicSeed) {
  const cards = topic.note.vocabulary.map((v) => ({
    front: v.term,
    back: v.definition,
    category: 'perbendaharaan-kata',
    imageUrl: topic.imageUrl,
  }));

  topic.note.keyPoints.slice(0, 3).forEach((kp, i) => {
    cards.push({
      front: `${topic.title}: Fakta ${i + 1}`,
      back: kp,
      category: 'fakta-penting',
      imageUrl: topic.imageUrl,
    });
  });

  return cards;
}

export function generateGames(year: number) {
  return [
    {
      type: 'matching',
      title: `Padanan Istilah Tahun ${year}`,
      description: 'Padankan istilah sains dengan definisi',
      instructions: 'Pilih padanan yang betul. Dapatkan mata!',
      config: { timeLimit: 120, pairs: 6, yearLevel: year },
      difficulty: 1,
    },
    {
      type: 'sorting',
      title: 'Susun Langkah Saintifik',
      description: 'Susun langkah penyiasatan saintifik',
      instructions: 'Susun kad mengikut turutan betul.',
      config: { steps: ['Pemerhatian', 'Soalan', 'Hipotesis', 'Eksperimen', 'Kesimpulan'], yearLevel: year },
      difficulty: 2,
    },
    {
      type: 'quiz-race',
      title: `Kuiz Pantas Tahun ${year}`,
      description: 'Jawab soalan ABCD secepat mungkin',
      instructions: 'Pilih A, B, C atau D sebelum masa tamat!',
      config: { questionCount: 10, timePerQuestion: 15, yearLevel: year },
      difficulty: year >= 4 ? 3 : 2,
    },
  ];
}

export function getAllTopicSlugs(): { slug: string; title: string; year: number; imagePrompt: string }[] {
  const result: { slug: string; title: string; year: number; imagePrompt: string }[] = [];
  for (const yearData of YEAR_LEVELS) {
    for (const topic of yearData.topics) {
      const def = ALL_YEARS_TOPICS[yearData.year]?.find((t) => t.title === topic.title);
      const prompt =
        def?.quizQuestions[0]?.imagePrompt ??
        `cute colorful cartoon science illustration about ${topic.title} for Malaysian primary school children, bright cheerful style, no text`;
      result.push({ slug: topic.slug, title: topic.title, year: yearData.year, imagePrompt: prompt });
    }
  }
  return result;
}