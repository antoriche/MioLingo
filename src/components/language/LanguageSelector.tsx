'use client';

import { Language } from '@/lib/types';
import styles from './LanguageSelector.module.css';

interface LanguageSelectorProps {
    currentLanguage: Language;
    onLanguageChange: (language: Language) => void;
}

const LANGUAGES = [
    {
        code: 'vietnamese' as Language,
        name: 'Vietnamese',
        flag: '🇻🇳',
        nativeName: 'Tiếng Việt',
    },
    {
        code: 'french' as Language,
        name: 'French',
        flag: '🇫🇷',
        nativeName: 'Français',
    },
];

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
    return (
        <div className={styles.languageSelector}>
            <div className={styles.languageButtons}>
                {LANGUAGES.map((lang) => (
                    <button
                        key={lang.code}
                        className={`${styles.languageButton} ${currentLanguage === lang.code ? styles.active : ''
                            }`}
                        onClick={() => onLanguageChange(lang.code)}
                        title={`Switch to ${lang.name}`}
                    >
                        <span className={styles.flag}>{lang.flag}</span>
                        <span className={styles.languageName}>{lang.name}</span>
                        <span className={styles.nativeName}>{lang.nativeName}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
