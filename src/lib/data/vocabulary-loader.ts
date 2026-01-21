import type { VocabularyWord, VocabularyCategory, Language } from '../types';

// Import French vocabulary
import frenchGreetings from './french/greetings.json';
import frenchRomance from './french/romance.json';
import frenchFamily from './french/family.json';
import frenchNumbers from './french/numbers.json';
import frenchDailyLife from './french/daily-life.json';
import frenchFood from './french/food.json';
import frenchTime from './french/time.json';
import frenchColors from './french/colors.json';
import frenchWeather from './french/weather.json';
import frenchBody from './french/body.json';
import frenchAnimals from './french/animals.json';
import frenchEmotions from './french/emotions.json';

// Import Vietnamese vocabulary
import vietnameseGreetings from './vietnamese/greetings.json';
import vietnameseRomance from './vietnamese/romance.json';
import vietnameseFamily from './vietnamese/family.json';
import vietnameseNumbers from './vietnamese/numbers.json';
import vietnameseDailyLife from './vietnamese/daily-life.json';
import vietnameseFood from './vietnamese/food.json';
import vietnameseTime from './vietnamese/time.json';
import vietnameseColors from './vietnamese/colors.json';
import vietnameseWeather from './vietnamese/weather.json';
import vietnameseBody from './vietnamese/body.json';
import vietnameseAnimals from './vietnamese/animals.json';
import vietnameseEmotions from './vietnamese/emotions.json';

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

// French vocabulary by category
export const frenchVocabularyByCategory: Record<VocabularyCategory, VocabularyWord[]> = {
    'greetings': hydrateVocabularyWords(frenchGreetings as VocabularyWordJSON[]),
    'romance': hydrateVocabularyWords(frenchRomance as VocabularyWordJSON[]),
    'family': hydrateVocabularyWords(frenchFamily as VocabularyWordJSON[]),
    'numbers': hydrateVocabularyWords(frenchNumbers as VocabularyWordJSON[]),
    'daily-life': hydrateVocabularyWords(frenchDailyLife as VocabularyWordJSON[]),
    'food': hydrateVocabularyWords(frenchFood as VocabularyWordJSON[]),
    'time': hydrateVocabularyWords(frenchTime as VocabularyWordJSON[]),
    'colors': hydrateVocabularyWords(frenchColors as VocabularyWordJSON[]),
    'weather': hydrateVocabularyWords(frenchWeather as VocabularyWordJSON[]),
    'body': hydrateVocabularyWords(frenchBody as VocabularyWordJSON[]),
    'animals': hydrateVocabularyWords(frenchAnimals as VocabularyWordJSON[]),
    'emotions': hydrateVocabularyWords(frenchEmotions as VocabularyWordJSON[]),
};

// All French vocabulary combined
export const frenchVocabulary: VocabularyWord[] = Object.values(frenchVocabularyByCategory).flat();

// Vietnamese vocabulary by category
export const vietnameseVocabularyByCategory: Record<VocabularyCategory, VocabularyWord[]> = {
    'greetings': hydrateVocabularyWords(vietnameseGreetings as VocabularyWordJSON[]),
    'romance': hydrateVocabularyWords(vietnameseRomance as VocabularyWordJSON[]),
    'family': hydrateVocabularyWords(vietnameseFamily as VocabularyWordJSON[]),
    'numbers': hydrateVocabularyWords(vietnameseNumbers as VocabularyWordJSON[]),
    'daily-life': hydrateVocabularyWords(vietnameseDailyLife as VocabularyWordJSON[]),
    'food': hydrateVocabularyWords(vietnameseFood as VocabularyWordJSON[]),
    'time': hydrateVocabularyWords(vietnameseTime as VocabularyWordJSON[]),
    'colors': hydrateVocabularyWords(vietnameseColors as VocabularyWordJSON[]),
    'weather': hydrateVocabularyWords(vietnameseWeather as VocabularyWordJSON[]),
    'body': hydrateVocabularyWords(vietnameseBody as VocabularyWordJSON[]),
    'animals': hydrateVocabularyWords(vietnameseAnimals as VocabularyWordJSON[]),
    'emotions': hydrateVocabularyWords(vietnameseEmotions as VocabularyWordJSON[]),
};

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
