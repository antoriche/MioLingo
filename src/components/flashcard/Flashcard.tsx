'use client';

import { useState } from 'react';
import type { VocabularyWord } from '@/lib/types';

interface FlashcardProps {
    word: VocabularyWord;
    onAnswer: (correct: boolean) => void;
    showFeedback: boolean;
}

export default function Flashcard({ word, onAnswer, showFeedback }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleAnswer = (correct: boolean) => {
        setSelectedAnswer(correct ? 'correct' : 'incorrect');
        setTimeout(() => {
            onAnswer(correct);
            setIsFlipped(false);
            setSelectedAnswer(null);
        }, 800);
    };

    return (
        <div style={{
            perspective: '1000px',
            width: '100%',
            maxWidth: '400px',
            height: '300px',
            margin: '0 auto',
        }}>
            <div
                onClick={!showFeedback ? handleFlip : undefined}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    cursor: !showFeedback ? 'pointer' : 'default',
                }}
            >
                {/* Front side - Vietnamese word */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    backgroundColor: '#FF6B6B',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}>
                    <div style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.8)',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                    }}>
                        Vietnamese
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: 'white',
                        marginBottom: '1rem',
                        textAlign: 'center',
                    }}>
                        {word.vietnamese}
                    </div>
                    <div style={{
                        fontSize: '1rem',
                        color: 'rgba(255,255,255,0.9)',
                        marginTop: '0.5rem',
                    }}>
                        {word.pronunciation}
                    </div>
                    <div style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255,255,255,0.7)',
                        marginTop: '2rem',
                    }}>
                        Tap to reveal
                    </div>
                </div>

                {/* Back side - English translation */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    backgroundColor: '#4ECDC4',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    transform: 'rotateY(180deg)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}>
                    <div style={{
                        fontSize: '0.75rem',
                        color: 'rgba(255,255,255,0.8)',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                    }}>
                        English
                    </div>
                    <div style={{
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center',
                    }}>
                        {word.english}
                    </div>
                    <div style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255,255,255,0.8)',
                        marginTop: '1rem',
                        textAlign: 'center',
                    }}>
                        Category: {word.category}
                    </div>
                </div>
            </div>

            {/* Answer buttons (shown when flipped) */}
            {isFlipped && !showFeedback && (
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginTop: '1.5rem',
                    justifyContent: 'center',
                }}>
                    <button
                        onClick={() => handleAnswer(false)}
                        style={{
                            padding: '0.75rem 2rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            border: 'none',
                            borderRadius: '8px',
                            backgroundColor: selectedAnswer === 'incorrect' ? '#FF4757' : '#FFE5E5',
                            color: selectedAnswer === 'incorrect' ? 'white' : '#FF4757',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            minWidth: '120px',
                        }}
                    >
                        ✗ Again
                    </button>
                    <button
                        onClick={() => handleAnswer(true)}
                        style={{
                            padding: '0.75rem 2rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            border: 'none',
                            borderRadius: '8px',
                            backgroundColor: selectedAnswer === 'correct' ? '#2ECC71' : '#E8F8F5',
                            color: selectedAnswer === 'correct' ? 'white' : '#2ECC71',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            minWidth: '120px',
                        }}
                    >
                        ✓ Got it!
                    </button>
                </div>
            )}
        </div>
    );
}
