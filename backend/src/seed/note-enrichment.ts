import { CompleteTopicNote } from './topics-content';
import { ENRICHMENT_Y1_Y2 } from './note-enrichment-y1-y2';
import { ENRICHMENT_Y3 } from './note-enrichment-y3';
import { ENRICHMENT_Y4 } from './note-enrichment-y4';
import { ENRICHMENT_Y5 } from './note-enrichment-y5';
import { ENRICHMENT_Y6 } from './note-enrichment-y6';

export interface NoteEnrichment {
  extraExplanation: string;
  extraKeyPoints: string[];
  extraVocabulary: { term: string; definition: string }[];
  extraRecap: string;
}

const ALL_ENRICHMENTS: Record<string, NoteEnrichment> = {
  ...ENRICHMENT_Y1_Y2,
  ...ENRICHMENT_Y3,
  ...ENRICHMENT_Y4,
  ...ENRICHMENT_Y5,
  ...ENRICHMENT_Y6,
};

export function enrichTopicNote(
  note: CompleteTopicNote,
  year: number,
  order: number
): CompleteTopicNote {
  const patch = ALL_ENRICHMENTS[`${year}-${order}`];
  if (!patch) return note;

  const existingTerms = new Set(note.vocabulary.map((v) => v.term.toLowerCase()));
  const newVocab = patch.extraVocabulary.filter(
    (v) => !existingTerms.has(v.term.toLowerCase())
  );

  return {
    explanation: `${note.explanation} ${patch.extraExplanation}`.trim(),
    keyPoints: [...note.keyPoints, ...patch.extraKeyPoints],
    vocabulary: [...note.vocabulary, ...newVocab],
    funFact: note.funFact,
    recap: `${note.recap} ${patch.extraRecap}`.trim(),
  };
}