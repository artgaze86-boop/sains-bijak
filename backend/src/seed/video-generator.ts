import { TopicSeed } from './content-data';

export interface VideoSlide {
  text: string;
  imageUrl: string;
  narration?: string;
}

export interface GeneratedVideo {
  title: string;
  description: string;
  type: 'slides' | 'youtube';
  youtubeId?: string;
  slidesJson?: string;
  durationMin: number;
  order: number;
  thumbnailUrl?: string;
}

const YOUTUBE_POOL: Record<string, string[]> = {
  kemahiran: ['pV-zxJEN_7s', '3SdSFCW2Lac'],
  manusia: ['dFNm8C6sB5M', 'AMRB86mA5Ec'],
  haiwan: ['6z9VjG8gUHQ', 'nDp1zayd9Ak'],
  tumbuhan: ['X6QLYzqHogk', 'MNBUdaP8hrc'],
  magnet: ['yCANRxJeJo8', 'No4J8tMhzj4'],
  elektrik: ['ScnJ5G3mJ3Y', 'kTE9kJTYpU0'],
  cahaya: ['fmG_SmA041k', 'V1y_NbFz3eY'],
  bumi: ['Qd6nLM2QlWw', 'libKVRa01L8'],
  suria: ['Qd6nLM2QlWw', '0KBjnNuhRHs'],
  jirim: ['yU6Ij8W6S88', 'xZoD9Z11Ec4'],
  daya: ['kKKM4YqS4xM', 'CgtLI9fykW0'],
  mikro: ['w9QyRqD6T6o', 'm2SW09Bqbec'],
  teknologi: ['NGF2h2vI4ao', 'k3a77v0m0DI'],
  default: ['pV-zxJEN_7s', '3SdSFCW2Lac', 'X6QLYzqHogk'],
};

function pickYoutubeId(title: string, order: number): string {
  const lower = title.toLowerCase();
  for (const [key, ids] of Object.entries(YOUTUBE_POOL)) {
    if (key !== 'default' && lower.includes(key)) {
      return ids[order % ids.length];
    }
  }
  const defaults = YOUTUBE_POOL.default;
  return defaults[order % defaults.length];
}

function matchKeyword(title: string, keywords: string[]): boolean {
  const lower = title.toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

function getYoutubeCategory(title: string): string {
  if (matchKeyword(title, ['haiwan', 'animal'])) return 'haiwan';
  if (matchKeyword(title, ['tumbuh', 'pokok', 'daun', 'bunga'])) return 'tumbuhan';
  if (matchKeyword(title, ['manusia', 'gigi', 'rangka', 'darah', 'pernafasan', 'pencernaan'])) return 'manusia';
  if (matchKeyword(title, ['magnet'])) return 'magnet';
  if (matchKeyword(title, ['elektrik', 'litar'])) return 'elektrik';
  if (matchKeyword(title, ['cahaya', 'terang', 'gelap', 'bunyi'])) return 'cahaya';
  if (matchKeyword(title, ['bumi', 'batu', 'tanah', 'bulan', 'gerhana', 'buruj'])) return 'bumi';
  if (matchKeyword(title, ['suria', 'planet', 'matahari'])) return 'suria';
  if (matchKeyword(title, ['jirim', 'haba', 'asid', 'alkali', 'campuran', 'ketumpatan'])) return 'jirim';
  if (matchKeyword(title, ['daya', 'kelajuan', 'mesin'])) return 'daya';
  if (matchKeyword(title, ['mikro', 'bakteri'])) return 'mikro';
  if (matchKeyword(title, ['teknologi', 'lestari'])) return 'teknologi';
  if (matchKeyword(title, ['kemahiran', 'saintifik', 'proses'])) return 'kemahiran';
  return 'default';
}

export function generateVideos(topic: TopicSeed, year: number): GeneratedVideo[] {
  const slides: VideoSlide[] = [
    {
      text: topic.title,
      imageUrl: topic.imageUrl,
      narration: `Mari belajar tentang ${topic.title}.`,
    },
    {
      text: topic.description,
      imageUrl: topic.imageUrl,
      narration: topic.description,
    },
    ...topic.note.keyPoints.slice(0, 6).map((point) => ({
      text: point,
      imageUrl: topic.imageUrl,
      narration: point,
    })),
    {
      text: topic.note.recap,
      imageUrl: topic.imageUrl,
      narration: topic.note.recap,
    },
  ];

  const cat = getYoutubeCategory(topic.title);
  const youtubeId = pickYoutubeId(cat === 'default' ? topic.title : cat, topic.order);

  return [
    {
      title: `Video Animasi: ${topic.title}`,
      description: `Pelajari ${topic.title} melalui slaid animasi dengan narasi Bahasa Melayu.`,
      type: 'slides',
      slidesJson: JSON.stringify(slides),
      durationMin: Math.max(3, Math.ceil(slides.length * 0.5)),
      order: 1,
      thumbnailUrl: topic.imageUrl,
    },
    {
      title: `Video Rujukan: ${topic.title}`,
      description: `Video tambahan untuk topik ${topic.title} Tahun ${year}.`,
      type: 'youtube',
      youtubeId,
      durationMin: 5,
      order: 2,
      thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    },
  ];
}