// Spaced Repetition Algorithm (SM-2) for MioLingo
import type { WordProgress, ReviewQuality } from '../types';

/**
 * Calculate next review date using SM-2 algorithm
 * Based on SuperMemo 2 spaced repetition algorithm
 */
export function calculateNextReview(
  progress: WordProgress,
  quality: ReviewQuality
): { nextReview: Date; interval: number; easeFactor: number } {
  let { easeFactor, interval } = progress;

  // Update ease factor based on quality
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02))
  );

  // Calculate new interval
  if (quality < ReviewQuality.GOOD) {
    // Reset interval if quality is poor
    interval = 1;
  } else {
    if (interval === 0) {
      interval = 1;
    } else if (interval === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }

  // Calculate next review date
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    nextReview,
    interval,
    easeFactor,
  };
}

/**
 * Get words due for review today
 */
export function getWordsForReview(allProgress: WordProgress[], count: number = 20): string[] {
  const now = new Date();
  
  const dueWords = allProgress
    .filter(p => {
      if (!p.nextReview) return false;
      return new Date(p.nextReview) <= now;
    })
    .sort((a, b) => {
      // Prioritize words that are more overdue
      const aDate = new Date(a.nextReview!).getTime();
      const bDate = new Date(b.nextReview!).getTime();
      return aDate - bDate;
    })
    .slice(0, count)
    .map(p => p.wordId);

  return dueWords;
}

/**
 * Get new words for today's learning
 */
export function getNewWords(
  allWordIds: string[],
  learnedWordIds: Set<string>,
  count: number = 10
): string[] {
  const unlearnedWords = allWordIds.filter(id => !learnedWordIds.has(id));
  return unlearnedWords.slice(0, count);
}
