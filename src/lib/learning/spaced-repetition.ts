// Spaced Repetition Algorithm (SM-2) for MioLingo
import type { WordProgress } from '../types';
import { ReviewQuality } from '../types';

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
 * Calculate priority score for a word
 * Higher score = higher priority for review
 */
function calculateWordPriority(progress: WordProgress, now: Date): number {
  let priority = 0;

  // Factor 1: Overdue factor (how many days past due date)
  if (progress.nextReview) {
    const nextReviewDate = new Date(progress.nextReview);
    const daysOverdue = Math.max(0, (now.getTime() - nextReviewDate.getTime()) / (1000 * 60 * 60 * 24));
    priority += daysOverdue * 10; // 10 points per day overdue
  }

  // Factor 2: Low accuracy (words you're struggling with)
  // Accuracy ranges from 0-100, we want lower accuracy = higher priority
  const accuracyPenalty = (100 - progress.accuracy) / 10;
  priority += accuracyPenalty * 5; // More weight to struggling words

  // Factor 3: Low ease factor (words that are difficult)
  // Ease factor typically ranges from 1.3 to 2.5+
  // Lower ease = higher priority
  const easePenalty = (2.5 - progress.easeFactor) * 10;
  priority += Math.max(0, easePenalty);

  // Factor 4: Recently failed (if last reviewed in last 2 days and low accuracy)
  if (progress.lastReviewed) {
    const daysSinceReview = (now.getTime() - new Date(progress.lastReviewed).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceReview < 2 && progress.accuracy < 60) {
      priority += 20; // Boost priority for recent failures
    }
  }

  return priority;
}

/**
 * Get words due for review today with priority weighting
 * Failed vocabulary appears more often based on accuracy and ease factor
 */
export function getWordsForReview(allProgress: WordProgress[], count: number = 20): string[] {
  const now = new Date();

  const dueWords = allProgress
    .filter(p => {
      if (!p.nextReview) return false;
      return new Date(p.nextReview) <= now;
    })
    .map(p => ({
      wordId: p.wordId,
      priority: calculateWordPriority(p, now)
    }))
    .sort((a, b) => b.priority - a.priority) // Sort by priority (highest first)
    .slice(0, count)
    .map(item => item.wordId);

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

/**
 * Build a mixed learning session with new and review words
 * Failed vocabulary appears more often based on priority weighting
 * 
 * @param allProgress - All word progress for the current language
 * @param allWordIds - All available word IDs
 * @param targetNewWords - Target number of new words (default: 10)
 * @param targetReviewWords - Target number of review words (default: 20)
 * @returns Array of word IDs for the session, properly mixed and prioritized
 */
export function buildLearningSession(
  allProgress: WordProgress[],
  allWordIds: string[],
  targetNewWords: number = 10,
  targetReviewWords: number = 20
): string[] {
  const learnedWordIds = new Set(allProgress.map(wp => wp.wordId));

  // Get review words (prioritized by difficulty and failure)
  const reviewWordIds = getWordsForReview(allProgress, targetReviewWords);

  // Get new words
  const newWordsNeeded = Math.max(0, targetNewWords);
  const newWordIds = getNewWords(allWordIds, learnedWordIds, newWordsNeeded);

  // Mix new and review words
  // Strategy: Alternate between new and review, but ensure failed words appear earlier
  const mixedSession: string[] = [];
  const reviewQueue = [...reviewWordIds];
  const newQueue = [...newWordIds];

  // Interleave review (prioritized) and new words
  // Ratio: 2 review words for every 1 new word (to emphasize spaced repetition)
  while (reviewQueue.length > 0 || newQueue.length > 0) {
    // Add 2 review words
    if (reviewQueue.length > 0) {
      mixedSession.push(reviewQueue.shift()!);
    }
    if (reviewQueue.length > 0) {
      mixedSession.push(reviewQueue.shift()!);
    }

    // Add 1 new word
    if (newQueue.length > 0) {
      mixedSession.push(newQueue.shift()!);
    }
  }

  return mixedSession;
}
