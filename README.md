# MioLingo - Learn Vietnamese with Love ❤️

A Progressive Web App (PWA) for learning Vietnamese through flashcards and spaced repetition. Built with Next.js, TypeScript, and PouchDB for offline-first learning.

## 🎯 Features Implemented (MVP)

### ✅ Core Learning Engine
- **Flashcard System**: Interactive flashcards with flip animation
- **Spaced Repetition (SM-2 Algorithm)**: Smart scheduling based on performance
- **50 Vietnamese Words**: Organized by topics (greetings, family, romance, numbers, food, daily life)
- **Daily Learning Flow**: 10 new words + 20 review words per session

### ✅ Progress Tracking
- **Streak Counter**: Track consecutive learning days
- **Words Learned**: Total vocabulary count
- **Daily Goals**: Visual progress bars for new and review words
- **Session Tracking**: Stores all learning sessions locally

### ✅ Technical Implementation
- **Offline-First**: Works without internet using PouchDB
- **PWA Ready**: Configured with manifest for installable app
- **TypeScript**: Strict typing throughout
- **Responsive Design**: Mobile-first, works on all devices

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to start learning!

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main learning interface
├── components/
│   ├── flashcard/
│   │   └── Flashcard.tsx  # Flashcard component
│   └── progress/
│       └── ProgressStats.tsx # Progress display
├── lib/
│   ├── data/
│   │   └── vocabulary.ts  # 50 Vietnamese words
│   ├── db/
│   │   ├── index.ts       # PouchDB setup
│   │   └── helpers.ts     # Database utilities
│   ├── learning/
│   │   ├── spaced-repetition.ts # SM-2 algorithm
│   │   └── streak.ts      # Streak calculation
│   └── types/
│       └── index.ts       # TypeScript definitions
```

## 🎮 How to Use

1. **Start Learning**: Click "🚀 Start Learning Today"
2. **Review Flashcard**: Tap to flip and see translation
3. **Self-Assess**: Choose "✗ Again" or "✓ Got it!"
4. **Complete Session**: Work through all words
5. **Track Progress**: View streak and daily progress

## 🔄 Spaced Repetition

Uses SuperMemo 2 (SM-2) algorithm:
- Words you know well: reviewed less frequently
- Difficult words: come back sooner
- Optimal retention with minimal study time

## 💾 Data Storage

- **PouchDB**: Local-first offline database
- **Vocabulary DB**: 50 Vietnamese words
- **Progress DB**: Learning progress and streaks
- **Persistent**: Never lose your data

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict mode)
- **Database**: PouchDB (Offline-first)
- **Styling**: Inline styles
- **PWA**: next-pwa configuration

## 📋 Documentation

- **PRD**: [`_bmad-output/planning-artifacts/prd.md`](_bmad-output/planning-artifacts/prd.md)
- **Architecture**: [`_bmad-output/planning-artifacts/architecture.md`](_bmad-output/planning-artifacts/architecture.md)
- **Brainstorming**: [`_bmad-output/analysis/brainstorming-session-2026-01-19.md`](_bmad-output/analysis/brainstorming-session-2026-01-19.md)

## 🚧 Future Enhancements

- Audio playback for tone training
- AI weakness detection
- Conversational practice
- Progress sharing with girlfriend
- Voice pronunciation practice
- Cultural context cards

---

Built with ❤️ for learning Vietnamese and connecting through language.
