# Vocabulary Data Structure

## Overview

The vocabulary data is now organized in JSON files by theme/category, making it easier to maintain and extend.

## Structure

```
src/lib/data/
├── vocabulary-loader.ts       # TypeScript loader with types and helper functions
├── french/                    # French vocabulary organized by theme
│   ├── greetings.json
│   ├── romance.json
│   ├── family.json
│   ├── numbers.json
│   ├── daily-life.json
│   ├── food.json
│   └── time.json
└── vietnamese/                # Vietnamese vocabulary organized by theme
    ├── greetings.json
    ├── romance.json
    ├── family.json
    ├── numbers.json
    ├── daily-life.json
    └── food.json
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
3. Import the JSON files in `vocabulary-loader.ts`
4. Add them to the `frenchVocabularyByCategory` and `vietnameseVocabularyByCategory` objects
4. Add it to the `frenchVocabularyByCategory` object

### 3. Add a new language

1. Create a new folder `src/lib/data/[language]/`
2. Add JSON files for each theme
3. Update `vocabulary-loader.ts` to import and export the new language's vocabulary
4. Update helper functions to support the new language

## Benefits

- **Easy maintenance**: Edit JSON files directly without TypeScript syntax
- **Better organization**: Each theme is in its own file
- **Type safety**: TypeScript loader provides full type checking
- **Flexible queries**: Helper functions for common access patterns
- **Scalable**: Easy to add new languages and themes
