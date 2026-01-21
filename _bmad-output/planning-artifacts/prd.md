---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain']
inputDocuments: ['_bmad-output/analysis/brainstorming-session-2026-01-19.md']
workflowType: 'prd'
briefCount: 0
researchCount: 0
brainstormingCount: 1
projectDocsCount: 0
classification:
  projectType: 'Progressive Web App (PWA) - Mobile-first'
  domain: 'Education Technology (EdTech) / Language Learning'
  complexity: 'Low-to-Medium (MVP), scaling to Medium (Phase 2+)'
  projectContext: 'greenfield'
  developmentStrategy: 'Phased approach - Start simple, add complexity incrementally'
---

# Product Requirements Document - MioLingo

**Author:** Antonin
**Date:** 2026-01-19

## Success Criteria

### User Success

**Immediate "Aha!" Moment:**
- Successfully mastering a complete lesson (10 new words learned in one session)
- First time telling girlfriend something new in Vietnamese that she understands
- Completing first full day of learning (10 new words + 20 review words)

**Daily Success Indicators:**
- Maintaining daily streak (minimum: 1 flashcard completed)
- Learning 10 new Vietnamese words per day (baseline)
- Reviewing 20 previously learned words per day
- Ability to flex up when more time is available (weekends, free time)

**Ongoing Progress Markers:**
- Continuous vocabulary growth without forgetting old words
- Regular ability to share new Vietnamese phrases/words with girlfriend
- Visible progress tracking showing consistent forward movement
- Streak milestones (7 days, 30 days, 100 days)

**Emotional Success:**
- Feeling of connection through shared language moments
- Pride in showing girlfriend daily progress
- Confidence from not forgetting previously learned vocabulary
- Motivation sustained through visible improvement

### Business Success

**MVP Success Metrics (Personal Use - 90 days):**
- **Daily Active Use:** 90% adherence rate (81+ days out of 90)
- **Vocabulary Growth:** 900+ words learned (10/day × 90 days)
- **Retention Rate:** 80%+ accuracy on reviewed words
- **Streak Recovery:** Successful use of "buy back" feature when needed
- **Engagement:** Average 15+ minutes per day (10 new + 20 review + interaction time)

**"Worth It" Milestone:**
- Ability to consistently tell girlfriend something new in Vietnamese
- Building sufficient vocabulary for basic daily conversations
- Personal satisfaction from measurable progress (words mastered chart trending up)

### Technical Success

**Performance Requirements:**
- PWA loads in <3 seconds on mobile
- Offline-first: All core features work without internet
- Flashcard interactions feel instant (<100ms response)
- Audio playback for tone training works reliably across devices
- Data persistence: Never lose progress, even if app closes

**Reliability:**
- Streak tracking 100% accurate (never loses a day incorrectly)
- Spaced repetition algorithm correctly schedules review words
- "Buy back" feature works reliably when needed
- Progress syncs across devices if user switches phones

### Measurable Outcomes

**3-Month MVP Success:**
- 900+ Vietnamese words in personal vocabulary
- 81+ day streak maintained (or recovered via buy-back)
- 80%+ retention on spaced repetition reviews
- Daily habit established (opens app 6-7 days/week minimum)

**6-Month Vision:**
- 1,800+ words mastered
- Conversational ability with girlfriend in Vietnamese
- "Family Dinner Check" milestone achieved (ready to meet her parents)

## Product Scope

### MVP - Minimum Viable Product

**Core Learning Engine:**
- Flashcard system with spaced repetition
- 10 new words/day + 20 review words/day capacity
- Vocabulary mastery tracking (words learned, accuracy %)
- Couple-focused Vietnamese phrases (daily life, romantic, family)

**Engagement & Motivation:**
- Daily streak counter (visual, prominent)
- Streak "buy back" feature (complete hard lesson to recover missed day)
- Words mastered counter (total vocabulary size)
- Basic milestone celebrations (7-day, 30-day, 100-day streaks)

**Vietnamese-Specific Features:**
- Tone training audio playback (listen to correct pronunciation)
- Basic audio for all vocabulary words
- Southern Vietnamese dialect focus (girlfriend's likely dialect)

**Technical Foundation:**
- Progressive Web App (PWA) - mobile-first
- Offline-first architecture (works without internet)
- Simple, clean UI (minimalist daily view)
- Progress persistence (never lose data)

**Content:**
- Initial vocabulary bank: 500-1000 words minimum
- Organized by themes: greetings, family, daily life, romance, food
- Audio recordings for all words (tone accuracy critical)

### Growth Features (Post-MVP)

**AI-Powered Intelligence:**
- AI weakness detection (identify struggling words/tones)
- Personalized learning recommendations
- Context-aware vocabulary suggestions
- Smart scheduling based on user's free time patterns

**Advanced Learning:**
- Conversational chatbot practice
- Real-life scenario simulations
- Grammar micro-lessons
- Sentence construction practice

**Social & Sharing:**
- Progress sharing with girlfriend
- "Teach Me Back" mode (she adds words with her voice)
- Couple's vocabulary book (shared learning)

**Multi-Language Support (French):**
- **Language Mode Switch:** Toggle between Vietnamese and French learning modes
- Language selector UI (flag icons, clear visual indicator of active language)
- French vocabulary bank (500-1000 words)
- Separate progress tracking per language (independent streaks and vocabulary counters)
- French-specific pronunciation audio
- Language-agnostic flashcard engine (same algorithm works for both languages)
- Independent or combined streak modes
- French cultural context (different from Vietnamese)
- Persistent language selection (remembers which mode user was in)

**Reciprocal Learning Features:**
- Easy language mode switching for girlfriend to switch from Vietnamese mode to French mode
- Shared progress dashboard (both languages visible simultaneously)
- Couple's milestone: "You both have 30-day streaks!"
- Language pairing suggestions (related words across languages)
- Profile-based language preference (his account: Vietnamese, her account: French)

**Enhanced Tracking:**
- Detailed analytics dashboard
- Progress visualization graphs
- Weekly AI progress reports
- CEFR level assessment

### Vision (Future)

**Advanced Features:**
- Voice message practice (AI rates pronunciation before sending)
- AR vocabulary labels (camera overlay)
- Apple Watch quick drills
- iMessage extension integration
- "Family Dinner Check" validation milestone
- Full conversational AI with cultural intelligence
- Regional dialect switcher (Northern/Southern)
- Multi-language polyglot mode (learn 3+ languages simultaneously)
- Language comparison features (cognates, shared roots, grammar parallels)
- Couple's language challenge system (matched learning goals)
- Language swap mode (teach your native language while learning theirs)
- Cross-language vocabulary games (match Vietnamese-French-English)

**Content Expansion:**
- Vietnamese cultural context cards
- Song lyrics learning
- News article practice
- Seasonal vocabulary (Tết, holidays)

## User Journeys

### Journey 1: Antonin - The Love-Motivated Learner (Primary User)

**Opening Scene: The A&W Realization**

Antonin sits across from his Vietnamese girlfriend at A&W, 4 months into their relationship. She's laughing at something on her phone - another Vietnamese reel - and tries to explain it to him in English, but the joke doesn't quite land in translation. In that moment, a realization hits him like a wave: "We've been together for 4 months and I can't even count to 10 in Vietnamese."

It's not just embarrassment - it's the feeling of being locked out of her world. Every reel she sends, every phrase her family uses, every cultural reference - he's on the outside looking in. He wants to be part of her life, not just adjacent to it.

**Rising Action: First Steps**

On the bus ride home, Antonin downloads MioLingo. The app asks what he wants to learn first. He chooses the basics: counting to 10, greetings, simple "need to know" vocabulary. No fluff, just the essentials.

Day 1: He learns "xin chào" (hello), "em yêu anh" (I love you), and counts to 10. It feels manageable.

Day 3: He opens the app during his lunch break, reviews his words, learns 10 more. The streak counter shows "3 days" - a small dopamine hit.

Day 7: **First Small Win** - He sends her a good morning text entirely in Vietnamese: "Chào em! Em đẹp lắm ❤️" She replies with heart emojis and "Wow! You're learning!!" Pride surges through him. This is working.

**The Struggle: Motivation Valley (Weeks 6-12)**

Week 6: Life gets busy. Work deadlines pile up. He forgets to open the app one day. Then two days. The streak breaks. Guilt creeps in.

Week 8: He's learned 200 words but keeps forgetting the old ones. Tones are confusing - everything sounds the same to him. Why is this so hard? Maybe he's not cut out for this.

Week 10: She sends another reel. He still doesn't understand it. The motivation to open the app fades. What's the point if he's not making real progress?

**Critical Recovery: The Buy-Back Feature**

Week 11: A notification reminds him: "Your 45-day streak can be saved! Complete a hard lesson to buy back your missing day." Something about that second chance reignites his commitment. He completes the lesson. The streak counter updates: "46 days (1 recovered)." He's back in.

**Climax: The Breakthrough Moment**

Month 4: She sends a Vietnamese reel about couples learning each other's languages. He watches it - and for the first time, he understands most of it. His fingers move instinctively.

He replies in Vietnamese: "Đây là chúng ta! Anh đang học tiếng Việt cho em ❤️" (This is us! I'm learning Vietnamese for you ❤️)

She video calls him immediately, eyes wide with surprise and joy. "You understood that?! And you wrote that yourself?!" The pride in her voice - that's the moment. That's why he built MioLingo.

**Resolution: New Reality (Months 5-6)**

Now when she sends Vietnamese content, he understands enough to laugh at the jokes. He can greet her family in Vietnamese when they video call. He's not fluent, but he's connected.

The app has become part of his routine - bus rides, coffee breaks, quiet evenings. 900+ words learned. 140+ day streak. But the real metric? The way she smiles when he speaks Vietnamese. The way her family's eyes light up when he tries. The way he feels when he's no longer locked out of her world.

MioLingo didn't just teach him Vietnamese. It helped him write their love story in a new language.

### Journey 2: Edge Case - The Streak Breaker Who Recovers

**Persona:** Same Antonin, different timeline - Week 8

**Situation:** Antonin forgot to open MioLingo during a stressful work week. His 52-day streak broke. He feels like a failure.

**Journey:**
- Opens app expecting to see "0 days" - feels demotivated
- Sees notification: "Don't give up! Complete today's lesson + a bonus challenge to keep your momentum"
- Completes regular lesson (10 new + 20 review)
- Gets option: "Buy back your streak with Hard Lesson Challenge"
- Completes 30 difficult words under time pressure
- Streak updates to "53 days (1 recovered)" with subtle badge
- Feels redeemed, not punished
- Continues daily practice with renewed commitment

**Requirements Revealed:** Streak recovery system, motivational messaging, forgiveness mechanics, progress preservation

### Journey 3: The Girlfriend - Reciprocal French Learner (Secondary User)

**Opening Scene: The Inspiration**

Antonin's girlfriend watches him practice Vietnamese flashcards on his phone. He's been using MioLingo for 3 months now - 90 days straight - and she can see the difference. He greets her family in Vietnamese, sends her good morning texts she doesn't need to translate, even understands some of the reels she shares.

She feels a mix of pride and... something else. A quiet thought: "He's learning my language. What am I learning of his?"

**Rising Action: Her Turn**

She asks him, "Does MioLingo have French?" He taps the language switch at the top of the app - the Vietnamese flag changes to a French flag. The interface updates: "Ready to learn French?" He hands her his phone. "Try it," he says.

Day 1: She learns "bonjour," "je t'aime," basic numbers. It's easier than she expected - the same flashcard system he's been using. She gets why he's hooked.

Day 5: She sends him a French good morning text: "Bonjour mon amour! ❤️" His face lights up. Now he's the one feeling seen.

**The Shared Experience:**

Week 4: They compare streaks. She's at 28 days (French), he's at 118 days (Vietnamese). It becomes a friendly competition. Who can maintain their streak longer?

Week 8: MioLingo shows a new milestone: "You both have 30-day streaks! 🎉" They screenshot it, send it to friends. It's not just his app anymore - it's theirs.

**The Payoff:**

Month 3: She visits France with him for the first time. At a café, she orders in French - fumbling, but understood. The waiter smiles. Antonin beams with pride, the way she felt when he first spoke Vietnamese to her family.

On the flight home, she thinks: "We built this together. We're learning each other's worlds."

**Requirements Revealed:** Multi-language support, reciprocal learning features, shared progress tracking, couple's milestones

### Journey Requirements Summary

**From Journey 1 (Primary Happy Path), we need:**

**Onboarding & First Experience:**
- Simple topic selection (greetings, counting, romantic phrases)
- "Need to know" vocabulary prioritization
- Immediate small wins on Day 1
- Clear progress visibility (words learned, days tracked)

**Daily Learning Flow:**
- 10 new words/day + 20 review words
- Spaced repetition that brings back old words
- Multiple daily entry points (morning, commute, breaks, evening)
- Quick sessions (15 minutes feels complete)

**Motivation & Engagement:**
- Daily streak counter (prominent, celebratory)
- Milestone notifications (7, 30, 100 days)
- Small wins messaging ("You learned 10 words today!")
- Couple-focused content (romantic phrases, family greetings)

**Progress Tracking:**
- Total words mastered counter
- Visual progress indicators
- Before/after comparison (what you couldn't do then vs. now)

**Tone Training:**
- Audio playback for every word
- Vietnamese-specific pronunciation support
- Listening practice for comprehension

**From Journey 2 (Edge Case - Streak Recovery), we need:**

**Forgiveness Mechanics:**
- Streak buy-back system (complete hard lesson)
- Motivational recovery messaging (not punitive)
- Progress preservation (don't lose everything)
- Second chance mechanics

**Engagement Recovery:**
- Notifications for inactive users
- Re-engagement prompts
- Difficulty adaptation (hard lessons when needed)

