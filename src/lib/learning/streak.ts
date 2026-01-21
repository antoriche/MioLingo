// Streak calculation and management
import type { UserProgress, StudySession } from '../types';

/**
 * Calculate current streak based on study history
 * Handles timezone correctly for accurate day counting
 */
export function calculateStreak(sessions: StudySession[]): number {
  if (sessions.length === 0) return 0;

  // Sort sessions by date descending
  const sortedSessions = [...sessions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const today = getDateString(new Date());
  const yesterday = getDateString(subtractDays(new Date(), 1));

  let streak = 0;
  let currentDate = today;

  // Check if there's a session today or yesterday
  const latestSessionDate = sortedSessions[0].date;
  if (latestSessionDate !== today && latestSessionDate !== yesterday) {
    return 0; // Streak broken
  }

  // Count consecutive days
  for (const session of sortedSessions) {
    if (session.date === currentDate) {
      streak++;
      currentDate = getDateString(subtractDays(new Date(currentDate), 1));
    } else if (session.date < currentDate) {
      // Gap found, streak broken
      break;
    }
  }

  return streak;
}

/**
 * Check if user can buy back a broken streak
 */
export function canBuyBackStreak(
  lastStudyDate: string | null,
  todayStudied: boolean
): boolean {
  if (!lastStudyDate || todayStudied) return false;

  const today = getDateString(new Date());
  const yesterday = getDateString(subtractDays(new Date(), 1));
  const twoDaysAgo = getDateString(subtractDays(new Date(), 2));

  // Can buy back if last study was yesterday or two days ago
  return lastStudyDate === yesterday || lastStudyDate === twoDaysAgo;
}

/**
 * Get ISO date string (YYYY-MM-DD) in local timezone
 */
export function getDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Subtract days from a date
 */
function subtractDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

/**
 * Check if today has been studied
 */
export function hasStudiedToday(sessions: StudySession[]): boolean {
  const today = getDateString(new Date());
  return sessions.some(s => s.date === today && s.completed);
}
