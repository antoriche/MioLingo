'use client';

import { useEffect, useState } from 'react';
import { initializeDatabases } from '@/lib/db';
import {
  seedVocabulary,
  getVocabularyByLanguage,
  getUserProgress,
  updateUserProgress,
  getWordProgressByLanguage,
  saveWordProgress,
  saveStudySession,
} from '@/lib/db/helpers';
import { calculateNextReview, getWordsForReview, getNewWords } from '@/lib/learning/spaced-repetition';
import { getDateString } from '@/lib/learning/streak';
import { loadLanguagePreference, saveLanguagePreference } from '@/lib/learning/language-storage';
import Flashcard from '@/components/flashcard/Flashcard';
import ProgressStats from '@/components/progress/ProgressStats';
import LanguageSelector from '@/components/language/LanguageSelector';
import type { VocabularyWord, ReviewQuality, WordProgress, Language } from '@/lib/types';

type LearningMode = 'welcome' | 'learning' | 'complete';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<LearningMode>('welcome');
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('vietnamese');

  // Progress state
  const [currentStreak, setCurrentStreak] = useState(0);
  const [wordsLearned, setWordsLearned] = useState(0);
  const [todayNewWords, setTodayNewWords] = useState(0);
  const [todayReviewWords, setTodayReviewWords] = useState(0);

  // Learning session state
  const [studyWords, setStudyWords] = useState<VocabularyWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);

  useEffect(() => {
    async function initialize() {
      try {
        // Load language preference
        const savedLanguage = loadLanguagePreference();
        setCurrentLanguage(savedLanguage);

        // Initialize PouchDB
        initializeDatabases();

        // Seed vocabulary
        await seedVocabulary();

        // Load user progress
        const progress = await getUserProgress();
        if (progress) {
          setCurrentStreak(progress.currentStreak);
          setWordsLearned(progress.wordsLearned);
          // Update current language if different
          if (progress.currentLanguage && progress.currentLanguage !== savedLanguage) {
            setCurrentLanguage(progress.currentLanguage);
            saveLanguagePreference(progress.currentLanguage);
          }
        }

        // Check today's progress for current language
        const today = getDateString(new Date());
        const allWordProgress = await getWordProgressByLanguage(savedLanguage);
        const todayWords = allWordProgress.filter(wp => {
          const lastReviewed = wp.lastReviewed ? getDateString(new Date(wp.lastReviewed)) : '';
          return lastReviewed === today;
        });

        setTodayNewWords(todayWords.filter(wp => wp.timesReviewed === 1).length);
        setTodayReviewWords(todayWords.filter(wp => wp.timesReviewed > 1).length);
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setLoading(false);
        setMounted(true);
      }
    }

    initialize();
  }, []);

  const handleLanguageChange = async (newLanguage: Language) => {
    setCurrentLanguage(newLanguage);
    saveLanguagePreference(newLanguage);

    // Update user progress with new language
    await updateUserProgress({ currentLanguage: newLanguage });

    // Reload progress for new language
    const today = getDateString(new Date());
    const allWordProgress = await getWordProgressByLanguage(newLanguage);
    const todayWords = allWordProgress.filter(wp => {
      const lastReviewed = wp.lastReviewed ? getDateString(new Date(wp.lastReviewed)) : '';
      return lastReviewed === today;
    });

    setTodayNewWords(todayWords.filter(wp => wp.timesReviewed === 1).length);
    setTodayReviewWords(todayWords.filter(wp => wp.timesReviewed > 1).length);
  };

  const startLearning = async () => {
    setLoading(true);

    try {
      // Ensure databases are initialized
      initializeDatabases();

      // Get vocabulary for current language
      const allWords = await getVocabularyByLanguage(currentLanguage);

      if (allWords.length === 0) {
        console.error('No vocabulary words found for', currentLanguage);
        alert(`No vocabulary words available for ${currentLanguage}. Please refresh the page.`);
        setLoading(false);
        return;
      }

      const allWordProgress = await getWordProgressByLanguage(currentLanguage);

      // Get learned word IDs
      const learnedWordIds = new Set(allWordProgress.map(wp => wp.wordId));

      // Get words for review (up to 20)
      const reviewWordIds = getWordsForReview(allWordProgress, 20);

      // Calculate how many new words needed (target: 10 total for session)
      const newWordsNeeded = Math.max(0, 10 - reviewWordIds.length);
      const newWordIds = getNewWords(
        allWords.map(w => w.id),
        learnedWordIds,
        newWordsNeeded
      );

      // Combine review and new words
      const sessionWordIds = [...reviewWordIds, ...newWordIds];
      const sessionWords = allWords.filter(w => sessionWordIds.includes(w.id));

      if (sessionWords.length === 0) {
        console.error('No words available for study session');
        alert('No words available for study. Please try again.');
        setLoading(false);
        return;
      }

      setStudyWords(sessionWords);
      setCurrentIndex(0);
      setSessionStartTime(Date.now());
      setMode('learning');
    } catch (error) {
      console.error('Error starting learning session:', error);
      alert(`Failed to start learning session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (correct: boolean) => {
    const currentWord = studyWords[currentIndex];
    const quality: ReviewQuality = correct ? 2 : 0; // Good or Again

    try {
      // Get or create word progress
      const allWordProgress = await getWordProgressByLanguage(currentLanguage);
      let wordProgress = allWordProgress.find(wp => wp.wordId === currentWord.id);

      if (!wordProgress) {
        // First time seeing this word
        wordProgress = {
          id: `word-${currentWord.id}`,
          wordId: currentWord.id,
          userId: 'default',
          language: currentLanguage,
          mastered: false,
          accuracy: correct ? 100 : 0,
          timesReviewed: 1,
          lastReviewed: new Date(),
          nextReview: null,
          easeFactor: 2.5,
          interval: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Increment words learned if this is a new word
        const progress = await getUserProgress();
        if (progress) {
          await updateUserProgress({
            wordsLearned: progress.wordsLearned + 1,
          });
          setWordsLearned(progress.wordsLearned + 1);
        }
        setTodayNewWords(prev => prev + 1);
      } else {
        setTodayReviewWords(prev => prev + 1);
      }

      // Calculate next review
      const { nextReview, interval, easeFactor } = calculateNextReview(wordProgress, quality);

      // Update word progress
      const updatedProgress: WordProgress = {
        ...wordProgress,
        timesReviewed: wordProgress.timesReviewed + 1,
        accuracy: correct
          ? ((wordProgress.accuracy * (wordProgress.timesReviewed - 1)) + 100) / wordProgress.timesReviewed
          : ((wordProgress.accuracy * (wordProgress.timesReviewed - 1)) + 0) / wordProgress.timesReviewed,
        lastReviewed: new Date(),
        nextReview,
        interval,
        easeFactor,
        mastered: interval >= 21, // Mastered if interval is 21+ days
        updatedAt: new Date(),
      };

      await saveWordProgress(updatedProgress);

      // Move to next word
      if (currentIndex < studyWords.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Session complete
        const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
        await saveStudySession({
          date: getDateString(new Date()),
          newWordsLearned: studyWords.filter(w => !allWordProgress.some(wp => wp.wordId === w.id)).length,
          wordsReviewed: studyWords.filter(w => allWordProgress.some(wp => wp.wordId === w.id)).length,
          accuracy: 85, // TODO: Calculate actual accuracy
          duration,
          completed: true,
        });

        // Update streak
        const progress = await getUserProgress();
        if (progress) {
          const today = getDateString(new Date());
          const yesterday = getDateString(new Date(Date.now() - 86400000));

          let newStreak = 1;
          if (progress.lastStudyDate === yesterday) {
            newStreak = progress.currentStreak + 1;
          } else if (progress.lastStudyDate === today) {
            newStreak = progress.currentStreak;
          }

          await updateUserProgress({
            currentStreak: newStreak,
            lastStudyDate: today,
          });
          setCurrentStreak(newStreak);
        }

        setMode('complete');
      }
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  if (!mounted || loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎴</div>
          <div style={{ color: '#666' }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (mode === 'complete') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#F9F9F9',
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ fontSize: '2rem', color: '#333', marginBottom: '0.5rem' }}>
            Session Complete!
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#666', marginBottom: '2rem' }}>
            Great work today! Keep it up! 💪
          </p>

          <ProgressStats
            currentStreak={currentStreak}
            wordsLearned={wordsLearned}
            todayProgress={{
              newWords: todayNewWords,
              reviewWords: todayReviewWords,
              newWordsTarget: 10,
              reviewWordsTarget: 20,
            }}
          />

          <button
            onClick={() => setMode('welcome')}
            style={{
              marginTop: '2rem',
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              border: 'none',
              borderRadius: '12px',
              backgroundColor: '#4ECDC4',
              color: 'white',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'learning') {
    const currentWord = studyWords[currentIndex];
    const progress = ((currentIndex + 1) / studyWords.length) * 100;

    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#F9F9F9',
      }}>
        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#E0E0E0',
          borderRadius: '2px',
          marginBottom: '2rem',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#FF6B6B',
            transition: 'width 0.3s ease',
          }} />
        </div>

        {/* Word counter */}
        <div style={{
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#666',
          marginBottom: '1rem',
        }}>
          Word {currentIndex + 1} of {studyWords.length}
        </div>

        {/* Flashcard */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Flashcard
            word={currentWord}
            onAnswer={handleAnswer}
            showFeedback={false}
          />
        </div>
      </div>
    );
  }

  // Welcome screen
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#F9F9F9',
    }}>
      <main style={{
        maxWidth: '500px',
        width: '100%',
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '0.5rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          MioLingo
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: '#666',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}>
          Learn Languages, Connect with Love ❤️
        </p>

        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />

        <ProgressStats
          currentStreak={currentStreak}
          wordsLearned={wordsLearned}
          todayProgress={{
            newWords: todayNewWords,
            reviewWords: todayReviewWords,
            newWordsTarget: 10,
            reviewWordsTarget: 20,
          }}
        />

        <button
          onClick={startLearning}
          disabled={loading}
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            fontSize: '1.25rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '12px',
            backgroundColor: loading ? '#CCC' : '#FF6B6B',
            color: 'white',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%',
            boxShadow: loading ? 'none' : '0 4px 12px rgba(255, 107, 107, 0.3)',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.2s ease',
          }}
        >
          {loading ? '⏳ Loading...' : '🚀 Start Learning Today'}
        </button>

        <p style={{
          marginTop: '2rem',
          fontSize: '0.875rem',
          color: '#999',
          textAlign: 'center',
        }}>
          {currentLanguage === 'vietnamese' ? '50 Vietnamese' : '50 French'} words ready • Spaced repetition powered
        </p>
      </main>
    </div>
  );
}
