// Language preference storage utilities
import { Language } from '../types';

const LANGUAGE_STORAGE_KEY = 'miolingo_language';

/**
 * Save the current language preference to localStorage
 */
export function saveLanguagePreference(language: Language): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }
}

/**
 * Load the saved language preference from localStorage
 * Returns 'vietnamese' as default if no preference is saved
 */
export function loadLanguagePreference(): Language {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (saved === 'vietnamese' || saved === 'french') {
            return saved;
        }
    }
    return 'vietnamese'; // Default language
}

/**
 * Clear the language preference from localStorage
 */
export function clearLanguagePreference(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    }
}
