'use client';

interface ProgressStatsProps {
    currentStreak: number;
    wordsLearned: number;
    todayProgress: {
        newWords: number;
        reviewWords: number;
        newWordsTarget: number;
        reviewWordsTarget: number;
    };
}

export default function ProgressStats({
    currentStreak,
    wordsLearned,
    todayProgress,
}: ProgressStatsProps) {
    const newWordsPercentage = Math.min(
        100,
        (todayProgress.newWords / todayProgress.newWordsTarget) * 100
    );
    const reviewWordsPercentage = Math.min(
        100,
        (todayProgress.reviewWords / todayProgress.reviewWordsTarget) * 100
    );

    return (
        <div style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}>
            {/* Streak and Total Words */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '2rem',
            }}>
                <div style={{
                    textAlign: 'center',
                }}>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#FF6B6B',
                    }}>
                        🔥 {currentStreak}
                    </div>
                    <div style={{
                        fontSize: '0.875rem',
                        color: '#666',
                        marginTop: '0.25rem',
                    }}>
                        Day Streak
                    </div>
                </div>
                <div style={{
                    textAlign: 'center',
                }}>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#4ECDC4',
                    }}>
                        {wordsLearned}
                    </div>
                    <div style={{
                        fontSize: '0.875rem',
                        color: '#666',
                        marginTop: '0.25rem',
                    }}>
                        Words Learned
                    </div>
                </div>
            </div>

            {/* Today's Progress */}
            <div style={{
                borderTop: '1px solid #E0E0E0',
                paddingTop: '1.5rem',
            }}>
                <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '1rem',
                }}>
                    Today's Goals
                </div>

                {/* New Words Progress */}
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                        marginBottom: '0.5rem',
                    }}>
                        <span style={{ color: '#666' }}>New Words</span>
                        <span style={{ fontWeight: '600', color: '#333' }}>
                            {todayProgress.newWords}/{todayProgress.newWordsTarget}
                        </span>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#F0F0F0',
                        borderRadius: '4px',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${newWordsPercentage}%`,
                            height: '100%',
                            backgroundColor: '#FF6B6B',
                            transition: 'width 0.3s ease',
                        }} />
                    </div>
                </div>

                {/* Review Words Progress */}
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                        marginBottom: '0.5rem',
                    }}>
                        <span style={{ color: '#666' }}>Review Words</span>
                        <span style={{ fontWeight: '600', color: '#333' }}>
                            {todayProgress.reviewWords}/{todayProgress.reviewWordsTarget}
                        </span>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#F0F0F0',
                        borderRadius: '4px',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            width: `${reviewWordsPercentage}%`,
                            height: '100%',
                            backgroundColor: '#4ECDC4',
                            transition: 'width 0.3s ease',
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
