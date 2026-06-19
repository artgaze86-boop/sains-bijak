import { Topic, Note, Quiz, Experiment, FlashCard, Badge, Game } from '../types';

export const fallbackTopics: Topic[] = [
  { id: 't1-y1', title: 'Haiwan Saya', description: 'Kenali haiwan peliharaan dan liar', year: 1, icon: '🐱', order: 1 },
  { id: 't2-y1', title: 'Tumbuhan Sekitar', description: 'Pelbagai jenis tumbuhan', year: 1, icon: '🌱', order: 2 },
  { id: 't1-y2', title: 'Badan Manusia', description: 'Bahagian badan dan fungsinya', year: 2, icon: '🫀', order: 1 },
  { id: 't2-y2', title: 'Makanan Sihat', description: 'Piramid makanan dan nutrisi', year: 2, icon: '🍎', order: 2 },
  { id: 't1-y3', title: 'Bahan & Sifatnya', description: 'Pepejal, cecair dan gas', year: 3, icon: '💧', order: 1 },
  { id: 't2-y3', title: 'Tenaga & Cahaya', description: 'Sumber tenaga dan cahaya', year: 3, icon: '☀️', order: 2 },
  { id: 't1-y4', title: 'Habitat Haiwan', description: 'Tempat tinggal haiwan', year: 4, icon: '🦁', order: 1 },
  { id: 't2-y4', title: 'Tanaman & Fotosintesis', description: 'Proses tumbuhan membuat makanan', year: 4, icon: '🌿', order: 2 },
  { id: 't1-y5', title: 'Sistem Suria', description: 'Planet dan bintang', year: 5, icon: '🪐', order: 1 },
  { id: 't2-y5', title: 'Tenaga Elektrik', description: 'Litar dan elektrik', year: 5, icon: '⚡', order: 2 },
  { id: 't1-y6', title: 'Interaksi Antara Hidupan', description: 'Rantai makanan dan ekosistem', year: 6, icon: '🦋', order: 1 },
  { id: 't2-y6', title: 'Kekuatan & Gerakan', description: 'Daya, geseran dan gerakan', year: 6, icon: '🚀', order: 2 },
];

export const fallbackNotes: Record<string, Note> = {
  't1-y1': {
    id: 'n1-y1',
    topicId: 't1-y1',
    title: 'Haiwan Saya',
    content: 'Haiwan adalah makhluk hidup yang boleh bergerak sendiri. Ada haiwan peliharaan seperti kucing dan anjing, serta haiwan liar seperti harimau dan gajah.',
    keyPoints: [
      'Haiwan boleh bergerak sendiri',
      'Haiwan peliharaan tinggal bersama manusia',
      'Haiwan liar hidup di hutan',
      'Haiwan memerlukan makanan dan air',
    ],
    vocabulary: [
      { term: 'habitat', definition: 'Tempat tinggal semula jadi haiwan' },
      { term: 'herbivor', definition: 'Haiwan yang makan tumbuhan' },
    ],
    funFact: 'Tahukah kamu? Gajah adalah haiwan darat terbesar di dunia! 🐘',
    recap: 'Haiwan hidup di pelbagai habitat dan memerlukan makanan serta air untuk hidup.',
  },
  't1-y5': {
    id: 'n1-y5',
    topicId: 't1-y5',
    title: 'Sistem Suria',
    content: 'Sistem Suria terdiri daripada Matahari dan lapan planet. Planet-planet ini mengelilingi Matahari.',
    keyPoints: [
      'Matahari adalah bintang di pusat sistem suria',
      'Bumi adalah planet ketiga dari Matahari',
      'Planet terdekat: Utarid, Zuhrah, Bumi, Marikh',
      'Planet terjauh: Musytari, Zuhal, Uranus, Neptune',
    ],
    vocabulary: [
      { term: 'orbit', definition: 'Laluan planet mengelilingi Matahari' },
      { term: 'revoluti', definition: 'Pergerakan planet mengelilingi Matahari' },
    ],
    funFact: 'Tahukah kamu? Satu hari di Venus lebih panjang daripada satu tahun di Venus! 🪐',
    recap: 'Sistem Suria terdiri daripada Matahari dan lapan planet yang bergerak dalam orbit.',
  },
};

export const fallbackQuizzes: Record<string, Quiz> = {
  't1-y1': {
    id: 'q1-y1',
    topicId: 't1-y1',
    title: 'Kuiz Haiwan Saya',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'Apakah ciri haiwan?',
        options: { A: 'Boleh bergerak sendiri', B: 'Tidak memerlukan air', C: 'Tidak boleh bernafas', D: 'Tidak memerlukan makanan' },
        correctAnswer: 'A',
        explanation: 'Betul! Haiwan boleh bergerak dari satu tempat ke tempat lain.',
        points: 10,
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: 'Kucing adalah haiwan peliharaan.',
        options: { A: 'Betul', B: 'Salah', C: 'Kadang-kadang', D: 'Tidak pasti' },
        correctAnswer: 'A',
        explanation: 'Betul! Kucing sering dipelihara di rumah.',
        points: 10,
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        question: 'Haiwan terbesar di dunia ialah...',
        options: { A: 'Gajah biru', B: 'Semut', C: 'Kucing', D: 'Burung' },
        correctAnswer: 'A',
        explanation: 'Gajah biru (blue whale) adalah haiwan terbesar!',
        points: 10,
      },
    ],
  },
  't1-y5': {
    id: 'q1-y5',
    topicId: 't1-y5',
    title: 'Kuiz Sistem Suria',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'Planet manakah yang paling dekat dengan Matahari?',
        options: { A: 'Utarid', B: 'Bumi', C: 'Marikh', D: 'Venus' },
        correctAnswer: 'A',
        explanation: 'Utarid (Mercury) adalah planet terdekat dengan Matahari.',
        points: 10,
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: 'Planet kedua dari Matahari ialah...',
        options: { A: 'Venus', B: 'Bumi', C: 'Marikh', D: 'Utarid' },
        correctAnswer: 'A',
        explanation: 'Urutan: Utarid, Venus, Bumi, Marikh!',
        points: 10,
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        question: 'Matahari ialah...',
        options: { A: 'Bintang', B: 'Planet', C: 'Bulan', D: 'Komet' },
        correctAnswer: 'A',
        explanation: 'Matahari adalah bintang, bukan planet!',
        points: 10,
      },
    ],
  },
};

export const fallbackExperiments: Record<string, Experiment> = {
  't1-y1': {
    id: 'e1-y1',
    topicId: 't1-y1',
    title: 'Perhatikan Haiwan',
    description: 'Amati haiwan di sekitar rumah atau taman.',
    materials: ['Buku nota', 'Pensel', 'Kanta pembesar (pilihan)'],
    steps: [
      'Pergi ke taman atau halaman rumah',
      'Perhatikan haiwan yang kamu jumpa',
      'Catat nama haiwan dan ciri-cirinya',
      'Lukis haiwan yang paling menarik',
    ],
    safetyTips: ['Jangan sentuh haiwan liar', 'Minta ibu bapa menemani'],
    funFact: 'Semut boleh mengangkat beban 50 kali berat badannya!',
  },
};

export const fallbackFlashcards: Record<string, FlashCard[]> = {
  't1-y1': [
    { id: 'fc1', topicId: 't1-y1', front: 'Kucing', back: 'Haiwan peliharaan yang suka minum susu', emoji: '🐱' },
    { id: 'fc2', topicId: 't1-y1', front: 'Anjing', back: 'Haiwan peliharaan yang setia', emoji: '🐶' },
    { id: 'fc3', topicId: 't1-y1', front: 'Gajah', back: 'Haiwan darat terbesar', emoji: '🐘' },
    { id: 'fc4', topicId: 't1-y1', front: 'Harimau', back: 'Haiwan liar pemangsa', emoji: '🐯' },
  ],
  't1-y5': [
    { id: 'fc5', topicId: 't1-y5', front: 'Matahari', back: 'Bintang di pusat sistem suria', emoji: '☀️' },
    { id: 'fc6', topicId: 't1-y5', front: 'Bumi', back: 'Planet tempat kita tinggal', emoji: '🌍' },
    { id: 'fc7', topicId: 't1-y5', front: 'Bulan', back: 'Satelit semula jadi Bumi', emoji: '🌙' },
    { id: 'fc8', topicId: 't1-y5', front: 'Jupiter', back: 'Planet terbesar dalam sistem suria', emoji: '🪐' },
  ],
};

export const fallbackBadges: Record<string, Badge[]> = {
  't1-y1': [
    { id: 'b1', name: 'Pencinta Haiwan', description: 'Selesai topik Haiwan Saya', icon: '🏅', earned: false },
    { id: 'b2', name: 'Pakar Kuiz', description: 'Dapat 3 bintang dalam kuiz', icon: '⭐', earned: false },
  ],
};

export const fallbackGames: Game[] = [
  { id: 'padankan-haiwan', title: 'Padankan Haiwan', description: 'Padankan haiwan dengan habitatnya', type: 'match', year: 1 },
  { id: 'susun-planet', title: 'Susun Planet', description: 'Susun planet mengikut jarak dari Matahari', type: 'sort', year: 5 },
  { id: 'kuiz-pantas', title: 'Kuiz Pantas', description: 'Jawab soalan secepat mungkin!', type: 'speed_quiz', year: 3 },
];

export const gameData = {
  'padankan-haiwan': {
    pairs: [
      { id: '1', item: '🐟', match: '🌊', label: 'Ikan - Laut' },
      { id: '2', item: '🦁', match: '🌳', label: 'Singa - Hutan' },
      { id: '3', item: '🐧', match: '❄️', label: 'Penguin - Kutub' },
      { id: '4', item: '🐪', match: '🏜️', label: 'Unta - Gurun' },
    ],
  },
  'susun-planet': {
    items: ['Utarid', 'Venus', 'Bumi', 'Marikh', 'Jupiter', 'Saturnus'],
    correctOrder: ['Utarid', 'Venus', 'Bumi', 'Marikh', 'Jupiter', 'Saturnus'],
  },
  'kuiz-pantas': {
    questions: [
      { question: 'Air membeku pada suhu?', answer: '0', options: ['0°C', '100°C', '50°C', '-10°C'] },
      { question: 'Planet kita dipanggil?', answer: 'Bumi', options: ['Mars', 'Bumi', 'Venus', 'Jupiter'] },
      { question: 'Tumbuhan membuat makanan melalui?', answer: 'fotosintesis', options: ['respirasi', 'fotosintesis', 'pencernaan', 'penghadaman'] },
      { question: 'Matahari terbit dari?', answer: 'timur', options: ['barat', 'utara', 'timur', 'selatan'] },
    ],
  },
};

export function getFallbackTopicsByYear(year: number): Topic[] {
  return fallbackTopics.filter((t) => t.year === year);
}

export function getFallbackTopic(id: string): Topic | undefined {
  return fallbackTopics.find((t) => t.id === id);
}

export function getFallbackNote(topicId: string): Note {
  return (
    fallbackNotes[topicId] ?? {
      id: `n-${topicId}`,
      topicId,
      title: 'Nota Sains',
      content: 'Kandungan nota akan dimuatkan dari pelayan. Sambung internet untuk membaca nota lengkap topik ini.',
      keyPoints: ['Belajar sains adalah menyeronokkan!', 'Amalkan pemerhatian setiap hari', 'Baca nota sebelum cuba kuiz'],
      vocabulary: [],
      funFact: 'Sains ada di sekeliling kita setiap hari! 🔬',
      recap: 'Teruskan belajar apabila sambungan internet tersedia.',
    }
  );
}

export function getFallbackQuiz(topicId: string): Quiz {
  return (
    fallbackQuizzes[topicId] ?? {
      id: `q-${topicId}`,
      topicId,
      title: 'Kuiz Sains',
      questions: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Sains membantu kita memahami?',
          options: ['Dunia sekeliling', 'Hanya nombor', 'Hanya warna', 'Tiada apa'],
          correctAnswer: 'Dunia sekeliling',
          explanation: 'Betul! Sains membantu kita faham dunia.',
          points: 10,
        },
      ],
    }
  );
}

export function getFallbackExperiment(topicId: string): Experiment {
  return (
    fallbackExperiments[topicId] ?? {
      id: `e-${topicId}`,
      topicId,
      title: 'Eksperimen Mudah',
      description: 'Cuba eksperimen sains mudah di rumah.',
      materials: ['Bahan mudah dari rumah'],
      steps: ['Sediakan bahan', 'Ikut langkah dengan teliti', 'Catat pemerhatian'],
      safetyTips: ['Minta bantuan dewasa'],
      funFact: 'Eksperimen adalah cara terbaik belajar sains!',
    }
  );
}

export function getFallbackFlashcards(topicId: string): FlashCard[] {
  return fallbackFlashcards[topicId] ?? [
    { id: 'fc1', topicId, front: 'Sains', back: 'Kajian tentang alam semula jadi', emoji: '🔬' },
    { id: 'fc2', topicId, front: 'Eksperimen', back: 'Ujian untuk memahami sesuatu', emoji: '🧪' },
  ];
}

export function getFallbackBadges(topicId: string): Badge[] {
  return fallbackBadges[topicId] ?? [
    { id: 'b-default', name: 'Pembelajar Bijak', description: 'Mula belajar topik ini', icon: '📚', earned: false },
  ];
}