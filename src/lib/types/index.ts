// Core types for MioLingo

export interface VocabularyWord {
  id: string;
  vietnamese: string;
  english: string;
  pronunciation: string; // Romanization
  audioUrl: string;
  category: VocabularyCategory;
  difficulty: number; // 1-5
  createdAt: Date;
}

export type VocabularyCategory = 
  | 'greetings'
  | 'family'
  | 'romance'
  | 'daily-life'
  | 'food'
  | 'numbers'
  | 'time';

export interface UserProgress {
  id: string; // User ID (for now, single user = 'default')
  wordsLearned: number;
  currentStreak: number;
  streakRecoveries: number;
  lastStudyDate: string; // ISO date
  createdAt: Date;
  updatedAt: Date;
}

export interface WordProgress {
  id: string; // wordId
  wordId: string;
  userId: string;
  mastered: boolean;
  accuracy: number; // 0-100
  timesReviewed: number;
  lastReviewed: Date | null;
  nextReview: Date | null; // Spaced repetition scheduling
  easeFactor: number; // SM-2 algorithm ease factor
  interval: number; // Days until next review
  createdAt: Date;
  updatedAt: Date;
}

export interface StudySession {
  id: string;
  userId: string;
  date: string; // ISO date
  newWordsLearned: number;
  wordsReviewed: number;
  accuracy: number; // 0-100
  duration: number; // seconds
  completed: boolean;
  createdAt: Date;
}

export interface Milestone {
  id: string;
  type: 'streak' | 'words-learned' | 'custom';
  threshold: number;
  achieved: boolean;
  achievedAt: Date | null;
  title: string;
  description: string;
}

// Spaced Repetition Response Quality
export enum ReviewQuality {
  AGAIN = 0,      // Complete blackout
  HARD = 1,       // Incorrect response, correct answer seemed familiar
  GOOD = 2,       // Correct response with some difficulty
  EASY = 3,       // Perfect response
}

export interface ReviewResult {
  wordId: string;
  quality: ReviewQuality;
  timestamp: Date;
}
