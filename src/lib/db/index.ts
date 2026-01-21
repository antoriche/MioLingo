// PouchDB Database Setup for MioLingo
import type { VocabularyWord, UserProgress, WordProgress, StudySession } from '../types';

// Database instances
let vocabularyDB: any;
let progressDB: any;

/**
 * Initialize PouchDB databases for offline-first storage
 */
export function initializeDatabases() {
  if (typeof window === 'undefined') {
    // Server-side rendering guard
    return;
  }

  // Dynamically import PouchDB only on client
  if (!vocabularyDB) {
    try {
      const PouchDB = require('pouchdb-browser');

      // Vocabulary database (read-only for users, pre-populated)
      vocabularyDB = new PouchDB('miolingo-vocabulary');

      // User progress database (read-write)
      progressDB = new PouchDB('miolingo-progress');

      console.log('✅ PouchDB databases initialized');
    } catch (error) {
      console.error('Error initializing PouchDB:', error);
      throw error;
    }
  }
}

/**
 * Get vocabulary database instance
 */
export function getVocabularyDB(): any {
  if (!vocabularyDB) {
    initializeDatabases();
  }
  return vocabularyDB;
}

/**
 * Get progress database instance
 */
export function getProgressDB(): any {
  if (!progressDB) {
    initializeDatabases();
  }
  return progressDB;
}

/**
 * Close all database connections
 */
export async function closeDatabases() {
  if (vocabularyDB) {
    await vocabularyDB.close();
  }
  if (progressDB) {
    await progressDB.close();
  }
  console.log('✅ PouchDB databases closed');
}
