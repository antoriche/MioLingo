# Vocabulary Data Structure - Agent Documentation

## Overview

The vocabulary data is organized in JSON files by theme/category, making it easier to maintain and extend. All JSON files are statically imported in `vocabulary-loader.ts` for reliable data loading.

## Structure

```
src/lib/data/
├── vocabulary-loader.ts       # TypeScript loader with static imports
├── AGENTS.md                  # This documentation file
├── french/                    # French vocabulary organized by theme
│   ├── greetings.json
│   ├── romance.json
│   ├── family.json
│   ├── numbers.json
│   ├── daily-life.json
│   ├── food.json
│   ├── time.json
│   ├── colors.json
│   ├── weather.json
│   ├── body.json
│   ├── animals.json
│   └── emotions.json
└── vietnamese/                # Vietnamese vocabulary organized by theme
    ├── greetings.json
    ├── romance.json
    ├── family.json
    ├── numbers.json
    ├── daily-life.json
    ├── food.json
    ├── time.json
    ├── colors.json
    ├── weather.json
    ├── body.json
    ├── animals.json
    └── emotions.json
```

## Usage

### Import all vocabulary for a language

```typescript
import { frenchVocabulary, vietnameseVocabulary } from '@/lib/data/vocabulary-loader';

// frenchVocabulary contains all French words
// vietnameseVocabulary contains all Vietnamese words
```

### Get vocabulary by category

```typescript
import { getVocabularyByCategory } from '@/lib/data/vocabulary-loader';

const frenchGreetings = getVocabularyByCategory('french', 'greetings');
const vietnameseRomance = getVocabularyByCategory('vietnamese', 'romance');
```

### Access vocabulary organized by category

```typescript, vietnameseVocabularyByCategory } from '@/lib/data/vocabulary-loader';

const frenchRomanceWords = frenchVocabularyByCategory.romance;
const vietnameseFamilyWords = vietnameseVocabularyByCategory.family
const romanceWords = frenchVocabularyByCategory.romance;
```

### Get vocabulary by difficulty

```typescript
import { getVocabularyByDifficulty } from '@/lib/data/vocabulary-loader';

const beginnerWords = getVocabularyByDifficulty('french', 1);
```

### Get a specific word by ID

```typescript
import { getVocabularyWordById } from '@/lib/data/vocabulary-loader';

const word = getVocabularyWordById('french', 'fr-001');
```

## Implementation Details

### Static Imports
All JSON files are statically imported at the top of `vocabulary-loader.ts`. This ensures:
- **Reliable loading**: No dynamic require() issues
- **Build-time validation**: TypeScript verifies all imports at compile time
- **Type safety**: Full type checking on imported data
- **Better performance**: Data is bundled and optimized by Next.js

### Data Hydration
The `hydrateVocabularyWords()` function adds the `createdAt` timestamp to each word, converting JSON data to full `VocabularyWord` objects.

### Export Structure
- `frenchVocabularyByCategory`: Organized by category for French
- `frenchVocabulary`: All French words in a flat array
- `vietnameseVocabularyByCategory`: Organized by category for Vietnamese
- `vietnameseVocabulary`: All Vietnamese words in a flat array

## JSON File Format

Each JSON file contains an array of vocabulary words without the `createdAt` timestamp (which is added automatically by the loader):

```json
[
  {
    "id": "fr-001",
    "language": "french",
    "targetLanguage": "Bonjour",
    "english": "Hello / Good morning",
    "pronunciation": "bon-zhoor",
    "audioUrl": "/audio/fr/bonjour.mp3",
    "category": "greetings",
    "difficulty": 1
  }
]
```

## Adding New Vocabulary

### 1. Add to existing theme
[language]/` and add new entries.

### 2. Add a new theme

1. Create new JSON files in both `src/lib/data/french/[theme].json` and `src/lib/data/vietnamese/[theme].json`
2. Add the new category to the `VocabularyCategory` type in `src/lib/types/index.ts`
3. **Add static imports** at the top of `vocabulary-loader.ts`:
   ```typescript
   import frenchTheme from './french/theme.json';
   import vietnameseTheme from './vietnamese/theme.json';
   ```
4. Add them to both category objects with hydration:
   ```typescript
   'theme': hydrateVocabularyWords(frenchTheme as VocabularyWordJSON[]),
   ```

### 3. Add a new language

1. Create a new folder `src/lib/data/[language]/`
2. Add JSON files for each theme (all 12 categories)
3. **Add static imports** in `vocabulary-loader.ts` for all theme files
4. Create a new `[language]VocabularyByCategory` object with all categories
5. Export `[language]Vocabulary` as a flat array
6. Update helper functions (`getVocabularyByLanguage`, etc.) to support the new language
7. Update the `Language` type in `src/lib/types/index.ts`

