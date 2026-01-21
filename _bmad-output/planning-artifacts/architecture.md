---
stepsCompleted: ['step-01-init', 'step-02-context', 'step-03-starter']
inputDocuments: ['_bmad-output/planning-artifacts/prd.md']
workflowType: 'architecture'
project_name: 'MioLingo'
user_name: 'Antonin'
date: '2026-01-20'
techStack:
  framework: 'Next.js'
  language: 'TypeScript (strict)'
  styling: 'Inline styles (CSS-in-JSX)'
  pwa: 'next-pwa'
  database: 'PouchDB'
  deployment: 'Vercel'
---

# Architecture Decision Document - MioLingo

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

**Learning Engine:**
- Flashcard-based vocabulary learning with spaced repetition algorithm
- Daily learning quota: 10 new words + 20 review words
- Topic-based vocabulary organization (greetings, family, romance, daily life, food)
- Initial content bank: 500-1000 Vietnamese words with audio
- Progress tracking: words learned, accuracy percentage, mastery levels

**Engagement System:**
- Daily streak counter with visual prominence
- Streak recovery mechanism ("buy back" via hard lesson challenge)
- Milestone celebrations (7, 30, 100+ day achievements)
- Motivational messaging and notifications
- Small wins reinforcement

**Vietnamese Language Features:**
- Audio playback for all vocabulary (tone accuracy critical)
- Northern Vietnamese dialect support
- Tone training and pronunciation practice
- Listening comprehension support

**User Experience:**
- Onboarding with topic selection
- Minimalist daily view (quick 15-minute sessions)
- Multiple entry points throughout day (bus, breaks, evening)
- Progress visualization (before/after comparison)

**Non-Functional Requirements:**

**Performance:**
- PWA initial load: <3 seconds on mobile
- Flashcard interactions: <100ms response time (must feel instant)
- Audio playback: Reliable across all mobile devices
- Smooth animations for engagement feedback

**Reliability & Data Integrity:**
- Streak tracking: 100% accuracy (correct day counting, timezone handling)
- Progress persistence: Zero data loss tolerance
- Cross-device sync: Handle conflicts when switching devices
- Spaced repetition: Deterministic, reliable scheduling

**Offline-First Architecture:**
- All core learning features work without internet
- Audio files cached locally for offline playback
- Progress saved locally, synced when connected
- Service Worker manages offline capabilities

**Scale & Complexity:**

- **Primary domain:** Progressive Web App (PWA) - Mobile-first
- **Complexity level:** Medium
  - Offline-first architecture adds complexity
  - Audio asset management (500-1000 files)
  - Spaced repetition algorithm requires careful implementation
  - Cross-device sync introduces state management challenges
- **Estimated architectural components:** 6-8 core modules
  - Learning Engine (flashcards, spaced repetition)
  - Progress Tracking (streaks, milestones, stats)
  - Audio Management (caching, playback)
  - Data Layer (offline-first storage, sync)
  - UI/UX Layer (PWA shell, components)
  - Notification System
  - Content Management (vocabulary, audio)

### Technical Constraints & Dependencies

**PWA Requirements:**
- Service Worker for offline functionality
- Web App Manifest for installability
- HTTPS required for PWA features
- Cache API for audio and data storage

**Offline-First Constraints:**
- All user interactions must work without network
- Local storage must handle vocabulary + audio + progress data
- Sync strategy needed for multi-device usage
- Conflict resolution for concurrent edits

**Audio Constraints:**
- 500-1000 audio files for Vietnamese vocabulary
- File size optimization (bandwidth for initial download)
- Reliable playback across mobile browsers
- Caching strategy for offline access

**Data Integrity Constraints:**
- Streak calculation must be timezone-aware
- Progress tracking cannot be lost under any circumstance
- Spaced repetition scheduling must be deterministic
- No data corruption during offline/online transitions

### Cross-Cutting Concerns Identified

**Offline-First Data Architecture:**
- Affects all features: learning, progress, streaks, audio
- Requires local-first storage with eventual sync
- IndexedDB or similar for structured data + audio blobs
- Service Worker strategy for network requests

**State Management:**
- Learning progress state (current session, review queue)
- User progress state (words learned, streaks, milestones)
- Audio playback state
- Sync state (pending changes, conflict resolution)

**Time & Date Handling:**
- Streak calculation (accurate day boundaries)
- Timezone considerations (user travels, changes timezone)
- Spaced repetition scheduling (next review dates)
- Milestone tracking (7-day, 30-day calculations)

**Audio Asset Management:**
- Initial download strategy (progressive or bulk)
- Cache invalidation and updates
- Playback reliability across devices
- Fallback strategies if audio fails

**User Engagement Patterns:**
- Multiple daily entry points (morning, commute, evening)
- Quick session design (15 minutes feels complete)
- Interruption handling (app closes mid-session)
- Re-engagement after breaks (notifications, streak recovery)

## Starter Template Evaluation

### Technical Preferences Established

**Frontend Framework:** Next.js (React)
- Familiar ecosystem
- Strong TypeScript support
- Vercel deployment optimization
- Can export as static PWA

**Language:** TypeScript (Strict Mode)
- Force highly typed code
- Better IDE support and error catching
- Type safety for spaced repetition algorithm

**Styling:** Inline Styles (CSS-in-JSX)
- No build-time CSS processing
- Component-scoped styling
- Dynamic styles based on state

**PWA Strategy:** Next.js with PWA Plugin
- next-pwa for Service Worker generation
- Workbox for caching strategies
- Offline-first architecture

**Database:** PouchDB
- Fully local, offline-first
- Stores vocabulary, progress, audio metadata
- No backend required for MVP
- Easy sync addition for Phase 2

**Deployment:** Vercel
- Next.js optimized hosting
- Static export for PWA
- Serverless functions available if needed later
- Automatic HTTPS (required for PWA)

### Primary Technology Domain

**Progressive Web App (PWA)** - Client-side React application with offline-first architecture

### Selected Starter: Next.js (TypeScript Template)

**Rationale for Selection:**

Next.js provides the foundation for a production-ready PWA with:
- **TypeScript out of the box** - Strict typing for reliability
- **React ecosystem** - Component-based UI, rich ecosystem
- **Static export capability** - Can export as pure client-side PWA
- **Vercel optimization** - Seamless deployment on Vercel
- **Fast Refresh** - Excellent DX during development
- **Image optimization** - Built-in optimization for assets
- **API Routes ready** - If needed for serverless functions later

**Initialization Command:**

```bash
npx create-next-app@latest miolingo --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"
```

Then configure for PWA:
```bash
npm install next-pwa
npm install pouchdb pouchdb-browser
npm install -D @types/pouchdb
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript with strict mode enabled
- React 18+ with Server Components (optional use)
- Node.js runtime for build/dev

**Project Structure:**
- `/src/app` - App router (Next.js 14+)
- `/src/components` - React components
- `/src/lib` - Utilities, PouchDB, spaced repetition logic
- `/public` - Static assets (vocabulary audio files)

**Build Tooling:**
- Turbopack for fast bundling
- TypeScript compiler
- ESLint for code quality
- Next.js compiler optimizations

**PWA Configuration:**
- Service Worker via next-pwa
- Web App Manifest for installability
- Offline fallback pages
- Cache strategies for audio assets

**Development Experience:**
- Fast Refresh for instant feedback
- TypeScript strict mode
- ESLint configured
- Hot reloading for development

