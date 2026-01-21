// Database initialization and seeding utilities
import { getVocabularyDB, getProgressDB } from '../db';
import { initialVocabulary } from '../data/vocabulary';
import type { VocabularyWord, UserProgress, WordProgress } from '../types';

/**
 * Seed vocabulary database with initial words
 */
export async function seedVocabulary(): Promise<void> {
    const db = getVocabularyDB();

    try {
        // Check if already seeded
        const info = await db.info();
        if (info.doc_count > 0) {
            console.log('Vocabulary already seeded');
            return;
        }

        // Seed initial vocabulary
        const docs = initialVocabulary.map(word => ({
            _id: word.id,
            ...word,
        }));

        await db.bulkDocs(docs);
        console.log(`✅ Seeded ${docs.length} vocabulary words`);
    } catch (error) {
        console.error('Error seeding vocabulary:', error);
    }
}

/**
 * Initialize user progress if not exists
 */
export async function initializeUserProgress(): Promise<UserProgress> {
    const db = getProgressDB();
    const userId = 'default'; // Single user for MVP

    try {
        // Try to get existing progress
        const existing = await db.get(userId) as UserProgress;
        return existing;
    } catch (error: any) {
        if (error.status === 404) {
            // Create new progress
            const newProgress: UserProgress = {
                id: userId,
                wordsLearned: 0,
                currentStreak: 0,
                streakRecoveries: 0,
                lastStudyDate: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await db.put({ ...newProgress, _id: userId });
            console.log('✅ Initialized user progress');
            return newProgress;
        }
        throw error;
    }
}

/**
 * Get all vocabulary words
 */
export async function getAllVocabulary(): Promise<VocabularyWord[]> {
    const db = getVocabularyDB();

    try {
        const result = await db.allDocs({ include_docs: true });
        return result.rows
            .filter((row: any) => row.doc)
            .map((row: any) => row.doc as VocabularyWord);
    } catch (error) {
        console.error('Error fetching vocabulary:', error);
        return [];
    }
}

/**
 * Get user progress
 */
export async function getUserProgress(): Promise<UserProgress | null> {
    const db = getProgressDB();

    try {
        const progress = await db.get('default') as UserProgress;
        return progress;
    } catch (error: any) {
        if (error.status === 404) {
            return await initializeUserProgress();
        }
        console.error('Error fetching user progress:', error);
        return null;
    }
}

/**
 * Update user progress
 */
export async function updateUserProgress(updates: Partial<UserProgress>): Promise<void> {
    const db = getProgressDB();

    try {
        const current = await db.get('default') as any;
        const updated = {
            ...current,
            ...updates,
            updatedAt: new Date(),
        };

        await db.put(updated);
    } catch (error) {
        console.error('Error updating user progress:', error);
    }
}

/**
 * Get word progress by wordId
 */
export async function getWordProgress(wordId: string): Promise<WordProgress | null> {
    const db = getProgressDB();
    const docId = `word-${wordId}`;

    try {
        const progress = await db.get(docId) as WordProgress;
        return progress;
    } catch (error: any) {
        if (error.status === 404) {
            return null;
        }
        console.error('Error fetching word progress:', error);
        return null;
    }
}

/**
 * Get all word progress entries
 */
export async function getAllWordProgress(): Promise<WordProgress[]> {
    const db = getProgressDB();

    try {
        const result = await db.allDocs({
            include_docs: true,
            startkey: 'word-',
            endkey: 'word-\uffff',
        });

        return result.rows
            .filter((row: any) => row.doc)
            .map((row: any) => row.doc as any as WordProgress);
    } catch (error) {
        console.error('Error fetching all word progress:', error);
        return [];
    }
}

/**
 * Save or update word progress
 */
export async function saveWordProgress(progress: WordProgress): Promise<void> {
    const db = getProgressDB();
    const docId = `word-${progress.wordId}`;

    try {
        // Try to get existing
        try {
            const existing = await db.get(docId) as any;
            await db.put({
                ...existing,
                ...progress,
                id: docId,
                updatedAt: new Date(),
            });
        } catch (error: any) {
            if (error.status === 404) {
                // Create new
                await db.put({
                    ...progress,
                    _id: docId,
                    id: docId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            } else {
                throw error;
            }
        }
    } catch (error) {
        console.error('Error saving word progress:', error);
    }
}

/**
 * Save study session
 */
export async function saveStudySession(session: {
    date: string;
    newWordsLearned: number;
    wordsReviewed: number;
    accuracy: number;
    duration: number;
    completed: boolean;
}): Promise<void> {
    const db = getProgressDB();
    const sessionId = `session-${session.date}-${Date.now()}`;

    try {
        await db.put({
            _id: sessionId,
            id: sessionId,
            userId: 'default',
            ...session,
            createdAt: new Date(),
        });
        console.log('✅ Study session saved');
    } catch (error) {
        console.error('Error saving study session:', error);
    }
}

/**
 * Get all study sessions
 */
export async function getAllStudySessions() {
    const db = getProgressDB();

    try {
        const result = await db.allDocs({
            include_docs: true,
            startkey: 'session-',
            endkey: 'session-\uffff',
        });

        return result.rows
            .filter((row: any) => row.doc)
            .map((row: any) => row.doc);
    } catch (error) {
        console.error('Error fetching study sessions:', error);
        return [];
    }
}
