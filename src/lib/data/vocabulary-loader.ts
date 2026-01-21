import type { VocabularyWord, VocabularyCategory, Language } from '../types';

// JSON data without createdAt field
interface VocabularyWordJSON {
    id: string;
    language: Language;
    targetLanguage: string;
    english: string;
    pronunciation: string;
    audioUrl: string;
    category: VocabularyCategory;
    difficulty: number;
}

// Helper function to add createdAt timestamp to vocabulary words
function hydrateVocabularyWords(words: VocabularyWordJSON[]): VocabularyWord[] {
    return words.map(word => ({
        ...word,
        createdAt: new Date(),
    }));
}

// Helper to safely load a category file
function loadCategory(language: Language, category: string): VocabularyWord[] {
    try {
        // Dynamic require with try-catch for graceful handling of missing files
        const data = require(`./${language}/${category}.json`) as VocabularyWordJSON[];
        return hydrateVocabularyWords(data);
    } catch {
        return [];
    }
}

// All available vocabulary categories to attempt loading
const CATEGORIES: VocabularyCategory[] = [
    'greetings',
    'romance',
    'family',
    'numbers',
    'daily-life',
    'food',
    'time',
    'colors',
    'weather',
    'body',
    'animals',
    'emotions',
];

// Build vocabulary by category for each language
function buildVocabularyByCategory(language: Language): Record<VocabularyCategory, VocabularyWord[]> {
    const vocabularyByCategory = {} as Record<VocabularyCategory, VocabularyWord[]>;

    for (const category of CATEGORIES) {
        vocabularyByCategory[category] = loadCategory(language, category);
    }

    return vocabularyByCategory;
}

// French vocabulary by category
export const frenchVocabularyByCategory = buildVocabularyByCategory('french');

// All French vocabulary combined
export const frenchVocabulary: VocabularyWord[] = Object.values(frenchVocabularyByCategory).flat();

// Vietnamese vocabulary by category
export const vietnameseVocabularyByCategory = buildVocabularyByCategory('vietnamese');

// All Vietnamese vocabulary combined
export const vietnameseVocabulary: VocabularyWord[] = Object.values(vietnameseVocabularyByCategory).flat();

// Helper function to get vocabulary by category
export function getVocabularyByCategory(
    language: Language,
    category: VocabularyCategory
): VocabularyWord[] {
    if (language === 'french') {
        return frenchVocabularyByCategory[category] || [];
    }
    if (language === 'vietnamese') {
        return vietnameseVocabularyByCategory[category] || [];
    }
    return [];
}

// Helper function to get all vocabulary for a language
export function getVocabularyByLanguage(language: Language): VocabularyWord[] {
    if (language === 'french') {
        return frenchVocabulary;
    }
    if (language === 'vietnamese') {
        return vietnameseVocabulary;
    }
    return [];
}

// Helper function to get vocabulary by difficulty
export function getVocabularyByDifficulty(
    language: Language,
    difficulty: number
): VocabularyWord[] {
    const allWords = getVocabularyByLanguage(language);
    return allWords.filter(word => word.difficulty === difficulty);
}

// Helper function to get a specific word by ID
export function getVocabularyWordById(
    language: Language,
    wordId: string
): VocabularyWord | undefined {
    const allWords = getVocabularyByLanguage(language);
    return allWords.find(word => word.id === wordId);
}
