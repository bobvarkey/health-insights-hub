# Unified Interventional Neuro Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate 4 separate clinical neurology assessment tools into a single, unified Astro platform with modern, minimal design and clinical-context-based information architecture.

**Architecture:** Content-first Astro with React islands for interactivity. Static HTML for all procedures/references (fast load), React for decision trees/calculators/search. Markdown-based content organization by clinical scenario and pathology type, not original app silos.

**Tech Stack:** Astro 4.x, React 18.x, Tailwind CSS 3.x, TypeScript, Markdown (with frontmatter for metadata)

**Target Outcome:** Fully functional unified platform deployable to production with all 4 tools consolidated, redesigned, and organized by clinical context.

---

## File Structure

```
interventional-neuro/
├── src/
│   ├── pages/
│   │   ├── index.astro                    # Home/hub
│   │   ├── clinical-scenarios/
│   │   │   ├── index.astro                # Scenarios hub
│   │   │   ├── sah.astro                  # SAH scenario
│   │   │   ├── avm-planning.astro         # AVM planning
│   │   │   └── [more scenarios]
│   │   ├── tools/
│   │   │   ├── index.astro                # Tools hub
│   │   │   ├── vascular-assessment/
│   │   │   │   ├── index.astro
│   │   │   │   ├── avm-evaluation.astro
│   │   │   │   └── [more tools]
│   │   │   ├── procedural-checklists/
│   │   │   │   ├── index.astro
│   │   │   │   └── [procedures]
│   │   │   └── technique-strategy/
│   │   │       ├── index.astro
│   │   │       └── [strategies]
│   │   └── learning-resources/
│   │       ├── index.astro
│   │       ├── decision-trees.astro
│   │       ├── calculators.astro
│   │       └── quick-reference.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Navigation.astro
│   │   ├── Breadcrumb.astro
│   │   ├── SearchBar.tsx                  # React island
│   │   ├── DecisionTree.tsx                # React island
│   │   ├── Calculator.tsx                  # React island
│   │   ├── ProcedureChecklist.tsx          # React island
│   │   ├── ProcedureCard.astro
│   │   ├── StatsCard.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro               # Main layout with nav
│   │   └── DocsLayout.astro               # Content page layout
│   ├── styles/
│   │   ├── global.css                     # Design tokens
│   │   └── components.css                 # Component styles
│   ├── lib/
│   │   ├── procedures.ts                  # Procedure data helpers
│   │   ├── search.ts                      # Search utilities
│   │   └── constants.ts                   # Constants
│   └── content/
│       ├── procedures/
│       │   ├── cerebral-angiogram.md
│       │   ├── ica-balloon-test.md
│       │   └── [all procedures]
│       ├── decision-trees/
│       │   └── [trees as JSON + React]
│       └── scenarios/
│           └── [clinical scenarios]
├── public/
│   └── icons/
├── astro.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Task List

### Task 1: Create and Configure New Astro Project

**Files:**
- Create: `astro.config.mjs`
- Create: `tailwind.config.js`
- Create: `tsconfig.json`
- Create: `package.json`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Astro project**

Run from `C:\Users\bobva\Interventional-neuro-2026`:
```bash
npm create astro@latest . -- --template minimal --typescript strict --skip-git
```

Expected: Astro scaffolded with TypeScript strict mode.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install -D tailwindcss postcss autoprefixer @tailwindcss/typography
npm install react react-dom
npm install lucide-react clsx
```

- [ ] **Step 3: Create tailwind.config.js with design tokens**

File: `tailwind.config.js`

```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        'primary-dark': '#1e293b',
        accent: '#0ea5e9',
        'accent-dark': '#0284c7',
        border: '#e2e8f0',
        'bg-light': '#f8fafc',
        'bg-surface': '#f1f5f9',
        'text-secondary': '#64748b',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Inter', 'sans-serif'],
        mono: ['Monaco', 'Courier New', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

- [ ] **Step 4: Create astro.config.mjs**

File: `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
  trailingSlash: 'never',
});
```

- [ ] **Step 5: Create tsconfig.json**

File: `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsxImportSource": "react",
    "strictNullChecks": true
  }
}
```

- [ ] **Step 6: Update package.json scripts**

File: `package.json` (modify scripts section)

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

- [ ] **Step 7: Create global styles**

File: `src/styles/global.css`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #0f172a;
  --accent: #0ea5e9;
  --accent-dark: #0284c7;
  --bg-light: #f8fafc;
  --bg-surface: #f1f5f9;
  --border: #e2e8f0;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
  background-color: var(--bg-light);
  color: var(--text-primary);
  line-height: 1.6;
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: var(--accent-dark);
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }
h5 { font-size: 1.1rem; }
h6 { font-size: 1rem; }

button {
  cursor: pointer;
  border: none;
  font-family: inherit;
  transition: all 0.2s;
}

input, textarea, select {
  font-family: inherit;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}
```

- [ ] **Step 8: Create postcss.config.js**

File: `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 9: Commit**

```bash
cd C:\Users\bobva\Interventional-neuro-2026
git add astro.config.mjs tailwind.config.js tsconfig.json package.json .gitignore src/styles/global.css postcss.config.js
git commit -m "feat: initialize Astro project with Tailwind and design tokens"
```

---

### Task 2: Create Base Layout and Navigation Components

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Navigation.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/Breadcrumb.astro`

- [ ] **Step 1: Create BaseLayout component**

File: `src/layouts/BaseLayout.astro`

```astro
---
import '../styles/global.css';
import Header from '../components/Header.astro';
import Navigation from '../components/Navigation.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title?: string;
  description?: string;
}

const { title = 'Interventional Neuro Reference', description = 'Clinical decision support for interventional neurology' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <Header />
    <Navigation />
    <main class="min-h-screen">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Create Header component**

File: `src/components/Header.astro`

```astro
---
import SearchBar from './SearchBar';
---

<header class="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
  <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
    <a href="/" class="flex items-center gap-2 font-bold text-xl text-primary hover:text-accent">
      <div class="w-8 h-8 bg-accent rounded flex items-center justify-center text-white font-bold">
        ⚕️
      </div>
      <span>Interventional Neuro</span>
    </a>
    <div class="flex-1 max-w-md">
      <SearchBar client:idle />
    </div>
  </div>
</header>
```

- [ ] **Step 3: Create Navigation component**

File: `src/components/Navigation.astro`

```astro
---
import { Glob } from 'lucide-react';
---

<nav class="hidden md:block bg-white border-b border-border">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex gap-8 text-sm font-medium">
      <a href="/" class="py-4 px-2 border-b-2 border-transparent hover:border-accent transition-colors">
        Home
      </a>
      <a href="/clinical-scenarios/" class="py-4 px-2 border-b-2 border-transparent hover:border-accent transition-colors">
        Clinical Scenarios
      </a>
      <a href="/tools/" class="py-4 px-2 border-b-2 border-transparent hover:border-accent transition-colors">
        Tools
      </a>
      <a href="/learning-resources/" class="py-4 px-2 border-b-2 border-transparent hover:border-accent transition-colors">
        Learning Resources
      </a>
      <a href="/about/" class="py-4 px-2 border-b-2 border-transparent hover:border-accent transition-colors">
        About
      </a>
    </div>
  </div>
</nav>

<!-- Mobile bottom nav -->
<nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
  <div class="grid grid-cols-5 gap-1">
    <a href="/" class="py-3 text-center text-xs font-medium hover:bg-bg-surface">
      Home
    </a>
    <a href="/clinical-scenarios/" class="py-3 text-center text-xs font-medium hover:bg-bg-surface">
      Scenarios
    </a>
    <a href="/tools/" class="py-3 text-center text-xs font-medium hover:bg-bg-surface">
      Tools
    </a>
    <a href="/learning-resources/" class="py-3 text-center text-xs font-medium hover:bg-bg-surface">
      Learn
    </a>
    <a href="/about/" class="py-3 text-center text-xs font-medium hover:bg-bg-surface">
      About
    </a>
  </div>
</nav>
```

- [ ] **Step 4: Create Footer component**

File: `src/components/Footer.astro`

```astro
---
---

<footer class="bg-white border-t border-border mt-12 py-8 pb-20 md:pb-8">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <div>
        <h3 class="font-bold mb-4">Interventional Neuro</h3>
        <p class="text-sm text-text-secondary">
          Clinical reference and decision support platform for interventional neurology residents and fellows.
        </p>
      </div>
      <div>
        <h4 class="font-semibold mb-4 text-sm">Tools</h4>
        <ul class="text-sm text-text-secondary space-y-2">
          <li><a href="/tools/vascular-assessment/" class="hover:text-accent">Vascular Assessment</a></li>
          <li><a href="/tools/procedural-checklists/" class="hover:text-accent">Procedures</a></li>
          <li><a href="/tools/technique-strategy/" class="hover:text-accent">Strategies</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold mb-4 text-sm">Learning</h4>
        <ul class="text-sm text-text-secondary space-y-2">
          <li><a href="/learning-resources/decision-trees/" class="hover:text-accent">Decision Trees</a></li>
          <li><a href="/learning-resources/calculators/" class="hover:text-accent">Calculators</a></li>
          <li><a href="/learning-resources/quick-reference/" class="hover:text-accent">Quick Reference</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold mb-4 text-sm">Legal</h4>
        <ul class="text-sm text-text-secondary space-y-2">
          <li><a href="/about/" class="hover:text-accent">About</a></li>
          <li><a href="/about/" class="hover:text-accent">Disclaimer</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-border pt-6 text-sm text-text-secondary text-center">
      <p>&copy; 2026 Interventional Neuro Reference. For educational purposes.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 5: Create Breadcrumb component**

File: `src/components/Breadcrumb.astro`

```astro
---
export interface Props {
  items: { label: string; href: string }[];
}

const { items } = Astro.props;
---

<nav class="flex items-center gap-2 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
  <a href="/" class="hover:text-accent">Home</a>
  {items.map((item) => (
    <>
      <span class="text-border">/</span>
      <a href={item.href} class="hover:text-accent">
        {item.label}
      </a>
    </>
  ))}
</nav>
```

- [ ] **Step 6: Commit**

```bash
cd C:\Users\bobva\Interventional-neuro-2026
git add src/layouts/BaseLayout.astro src/components/Header.astro src/components/Navigation.astro src/components/Footer.astro src/components/Breadcrumb.astro
git commit -m "feat: add base layout and navigation components"
```

---

### Task 3: Create React Island Components (SearchBar, DecisionTree, Calculator)

**Files:**
- Create: `src/components/SearchBar.tsx`
- Create: `src/components/DecisionTree.tsx`
- Create: `src/components/Calculator.tsx`
- Create: `src/components/ProcedureChecklist.tsx`
- Create: `src/lib/search.ts`

- [ ] **Step 1: Create search utilities**

File: `src/lib/search.ts`

```typescript
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'procedure' | 'decision-tree' | 'calculator' | 'classification';
  url: string;
  type: string;
}

// Mock data - will be populated from procedures
export const searchIndex: SearchResult[] = [
  {
    id: 'cerebral-angiogram',
    title: 'Cerebral Angiogram Protocol',
    description: 'Step-by-step checklist for cerebral angiography',
    category: 'procedure',
    url: '/tools/procedural-checklists/cerebral-angiogram/',
    type: 'Procedural Checklist',
  },
  // More items will be added as procedures are created
];

export function searchProcedures(query: string): SearchResult[] {
  const lowerQuery = query.toLowerCase();
  return searchIndex.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.type.toLowerCase().includes(lowerQuery)
  );
}
```

- [ ] **Step 2: Create SearchBar React component**

File: `src/components/SearchBar.tsx`

```typescript
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { searchProcedures, type SearchResult } from '../lib/search';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchProcedures(query);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <input
          type="text"
          placeholder="Search procedures, guidelines, tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-10 py-2 bg-bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-50">
          <div className="max-h-96 overflow-y-auto">
            {results.map((result) => (
              <a
                key={result.id}
                href={result.url}
                className="block px-4 py-3 hover:bg-bg-surface border-b border-border last:border-b-0 transition-colors"
              >
                <div className="font-medium text-primary">{result.title}</div>
                <div className="text-sm text-text-secondary">{result.description}</div>
                <div className="text-xs text-text-secondary mt-1">{result.type}</div>
              </a>
            ))}
          </div>
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg p-4 text-center text-text-secondary">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create DecisionTree React component**

File: `src/components/DecisionTree.tsx`

```typescript
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export interface DecisionNode {
  id: string;
  type: 'decision' | 'outcome';
  question?: string;
  answer?: string;
  yes?: string;
  no?: string;
  yesLabel?: string;
  noLabel?: string;
}

interface Props {
  nodes: Record<string, DecisionNode>;
  startNodeId: string;
  title: string;
}

export default function DecisionTree({ nodes, startNodeId, title }: Props) {
  const [currentNodeId, setCurrentNodeId] = useState(startNodeId);
  const [history, setHistory] = useState<string[]>([startNodeId]);

  const currentNode = nodes[currentNodeId];

  const handleChoice = (nextNodeId: string) => {
    setCurrentNodeId(nextNodeId);
    setHistory([...history, nextNodeId]);
  };

  const handleReset = () => {
    setCurrentNodeId(startNodeId);
    setHistory([startNodeId]);
  };

  if (!currentNode) {
    return <div className="p-4 bg-danger/10 border border-danger rounded text-danger">Error: Node not found</div>;
  }

  return (
    <div className="bg-white border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold mb-6">{title}</h3>

      {currentNode.type === 'decision' && (
        <div className="space-y-4">
          <div className="p-4 bg-accent/5 border-l-4 border-accent rounded">
            <p className="font-medium text-primary">{currentNode.question}</p>
          </div>

          <div className="flex gap-4">
            {currentNode.yes && (
              <button
                onClick={() => handleChoice(currentNode.yes!)}
                className="flex-1 px-4 py-3 bg-success text-white rounded-lg hover:bg-opacity-90 transition-all font-medium flex items-center justify-center gap-2"
              >
                {currentNode.yesLabel || 'Yes'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            {currentNode.no && (
              <button
                onClick={() => handleChoice(currentNode.no!)}
                className="flex-1 px-4 py-3 bg-warning text-white rounded-lg hover:bg-opacity-90 transition-all font-medium flex items-center justify-center gap-2"
              >
                {currentNode.noLabel || 'No'}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {currentNode.type === 'outcome' && (
        <div className="space-y-4">
          <div className="p-4 bg-success/10 border border-success rounded-lg">
            <h4 className="font-bold text-success mb-2">Recommendation:</h4>
            <p className="text-primary">{currentNode.answer}</p>
          </div>

          <button
            onClick={handleReset}
            className="w-full px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-all font-medium"
          >
            Start Over
          </button>
        </div>
      )}

      <div className="mt-6 text-sm text-text-secondary">
        <p>Progress: {history.length} step{history.length !== 1 ? 's' : ''}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create Calculator React component**

File: `src/components/Calculator.tsx`

```typescript
import React, { useState, useCallback } from 'react';

export interface CalculatorField {
  id: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

export interface CalculatorConfig {
  title: string;
  description?: string;
  fields: CalculatorField[];
  calculate: (values: Record<string, number>) => { score: number; interpretation: string };
}

interface Props extends CalculatorConfig {}

export default function Calculator({ title, description, fields, calculate }: Props) {
  const [values, setValues] = useState<Record<string, number>>(
    fields.reduce((acc, field) => ({ ...acc, [field.id]: field.min || 0 }), {})
  );
  const [result, setResult] = useState<{ score: number; interpretation: string } | null>(null);

  const handleChange = (fieldId: string, value: number) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleCalculate = useCallback(() => {
    const result = calculate(values);
    setResult(result);
  }, [values, calculate]);

  return (
    <div className="bg-white border border-border rounded-lg p-6 max-w-2xl">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      {description && <p className="text-text-secondary mb-6">{description}</p>}

      <div className="space-y-6 mb-6">
        {fields.map((field) => (
          <div key={field.id}>
            <label className="block font-medium mb-2">
              {field.label}
              {field.description && <span className="text-sm text-text-secondary block mt-1">{field.description}</span>}
            </label>
            <input
              type="range"
              min={field.min || 0}
              max={field.max || 100}
              step={field.step || 1}
              value={values[field.id]}
              onChange={(e) => handleChange(field.id, parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-text-secondary mt-2">
              <span>{field.min || 0}</span>
              <span className="font-medium text-primary">{values[field.id]}</span>
              <span>{field.max || 100}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleCalculate}
        className="w-full px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-all font-medium mb-6"
      >
        Calculate
      </button>

      {result && (
        <div className="bg-success/10 border border-success rounded-lg p-4">
          <div className="mb-3">
            <span className="text-sm text-text-secondary">Score</span>
            <p className="text-3xl font-bold text-success">{result.score}</p>
          </div>
          <div>
            <span className="text-sm text-text-secondary">Interpretation</span>
            <p className="text-primary font-medium">{result.interpretation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Create ProcedureChecklist React component**

File: `src/components/ProcedureChecklist.tsx`

```typescript
import React, { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export interface ChecklistStep {
  id: string;
  title: string;
  description: string;
}

interface Props {
  steps: ChecklistStep[];
  title: string;
}

export default function ProcedureChecklist({ steps, title }: Props) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleStep = (stepId: string) => {
    const newCompleted = new Set(completed);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompleted(newCompleted);
  };

  const progress = Math.round((completed.size / steps.length) * 100);

  return (
    <div className="bg-white border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold mb-2">{title}</h3>

      <div className="mb-6 bg-bg-surface rounded-full h-2">
        <div
          className="bg-accent h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-text-secondary mb-6">
        {completed.size} of {steps.length} steps completed ({progress}%)
      </p>

      <div className="space-y-3">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => toggleStep(step.id)}
            className="w-full flex items-start gap-3 p-4 bg-bg-surface hover:bg-border rounded-lg transition-colors text-left"
          >
            <div className="mt-1 flex-shrink-0">
              {completed.has(step.id) ? (
                <CheckCircle2 className="w-5 h-5 text-success" />
              ) : (
                <Circle className="w-5 h-5 text-text-secondary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-medium ${completed.has(step.id) ? 'text-text-secondary line-through' : 'text-primary'}`}>
                {step.title}
              </p>
              <p className="text-sm text-text-secondary mt-1">{step.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
cd C:\Users\bobva\Interventional-neuro-2026
git add src/components/SearchBar.tsx src/components/DecisionTree.tsx src/components/Calculator.tsx src/components/ProcedureChecklist.tsx src/lib/search.ts
git commit -m "feat: add React island components for interactive elements"
```

---

### Task 4: Create Home Page with Hub Layout

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/components/StatsCard.astro`
- Create: `src/components/ProcedureCard.astro`
- Create: `src/components/QuickAccessSection.astro`

- [ ] **Step 1: Create StatsCard component**

File: `src/components/StatsCard.astro`

```astro
---
export interface Props {
  number: string;
  label: string;
}

const { number, label } = Astro.props;
---

<div class="bg-white border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
  <div class="text-3xl font-bold text-accent mb-2">{number}</div>
  <div class="text-sm font-medium text-text-secondary">{label}</div>
</div>
```

- [ ] **Step 2: Create ProcedureCard component**

File: `src/components/ProcedureCard.astro`

```astro
---
export interface Props {
  title: string;
  description: string;
  icon: string;
  href: string;
  tag?: string;
  riskLevel?: 'low' | 'moderate' | 'high';
}

const { title, description, icon, href, tag, riskLevel } = Astro.props;

const tagColors = {
  'low': 'bg-success/10 text-success',
  'moderate': 'bg-warning/10 text-warning',
  'high': 'bg-danger/10 text-danger',
};
---

<a href={href} class="block bg-white border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all duration-200 group">
  <div class="flex items-start justify-between mb-4">
    <div class="text-3xl">{icon}</div>
    {tag && <span class={`text-xs font-medium px-2 py-1 rounded ${riskLevel ? tagColors[riskLevel] : 'bg-bg-surface text-text-secondary'}`}>
      {tag}
    </span>}
  </div>
  <h3 class="font-bold text-lg mb-2 group-hover:text-accent transition-colors">{title}</h3>
  <p class="text-sm text-text-secondary mb-4">{description}</p>
  <div class="text-accent font-medium text-sm">Learn more →</div>
</a>
```

- [ ] **Step 3: Create QuickAccessSection component**

File: `src/components/QuickAccessSection.astro`

```astro
---
export interface QuickLink {
  title: string;
  icon: string;
  href: string;
}

export interface Props {
  title: string;
  description?: string;
  links: QuickLink[];
}

const { title, description, links } = Astro.props;
---

<div class="bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg p-8 mb-8">
  <h2 class="text-2xl font-bold mb-2">{title}</h2>
  {description && <p class="text-white/80 mb-6">{description}</p>}
  
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
    {links.map((link) => (
      <a href={link.href} class="flex items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border-l-4 border-accent">
        <span class="text-2xl">{link.icon}</span>
        <span class="font-medium text-sm">{link.title}</span>
      </a>
    ))}
  </div>
</div>
```

- [ ] **Step 4: Create home page (index.astro)**

File: `src/pages/index.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import StatsCard from '../components/StatsCard.astro';
import ProcedureCard from '../components/ProcedureCard.astro';
import QuickAccessSection from '../components/QuickAccessSection.astro';

const quickLinks = [
  { title: 'Cerebral Angiogram', icon: '🧠', href: '/tools/procedural-checklists/cerebral-angiogram/' },
  { title: 'SAH Management', icon: '⚡', href: '/clinical-scenarios/sah/' },
  { title: 'AVM Evaluation', icon: '🎯', href: '/tools/vascular-assessment/avm-evaluation/' },
  { title: 'ICA Balloon Test', icon: '🛡️', href: '/tools/procedural-checklists/ica-balloon-test/' },
  { title: 'Aneurysm Decision', icon: '🩹', href: '/tools/technique-strategy/' },
];

const scenarios = [
  {
    title: 'Patient with Subarachnoid Hemorrhage',
    description: 'Walk through SAH diagnosis, imaging interpretation, and endovascular decision-making.',
    icon: '🧠',
    href: '/clinical-scenarios/sah/',
    tag: 'High Risk',
    riskLevel: 'high' as const,
  },
  {
    title: 'Unruptured Aneurysm Detection',
    description: 'Assessment of incidental findings and decision framework for treatment.',
    icon: '⚡',
    href: '/clinical-scenarios/unruptured-aneurysm/',
    tag: 'Clinical Case',
  },
  {
    title: 'AVM Pre-Procedure Planning',
    description: 'Classification using Spetzler-Martin and evaluation for embolization candidacy.',
    icon: '🎯',
    href: '/clinical-scenarios/avm-planning/',
    tag: 'Planning',
  },
];

const tools = [
  {
    title: 'Vascular Assessment',
    description: 'Classification systems, risk stratification, and diagnostic frameworks.',
    icon: '📊',
    href: '/tools/vascular-assessment/',
    tag: '4 Tools',
  },
  {
    title: 'Procedural Checklists',
    description: 'Step-by-step protocols for common interventional procedures.',
    icon: '✅',
    href: '/tools/procedural-checklists/',
    tag: '8 Procedures',
  },
  {
    title: 'Technique & Strategy',
    description: 'Decision trees, technique comparisons, and treatment strategies.',
    icon: '🧬',
    href: '/tools/technique-strategy/',
    tag: 'Interactive',
  },
];

const resources = [
  {
    title: 'Decision Trees',
    description: 'Interactive flowcharts for treatment decisions and risk assessment.',
    icon: '📋',
    href: '/learning-resources/decision-trees/',
    tag: '15+ Trees',
  },
  {
    title: 'Calculators & Scoring',
    description: 'Clinical scoring tools, risk calculators, and assessment instruments.',
    icon: '🧮',
    href: '/learning-resources/calculators/',
    tag: 'Interactive',
  },
  {
    title: 'Quick Reference Cards',
    description: 'Printable summaries and reference materials for clinical use.',
    icon: '📑',
    href: '/learning-resources/quick-reference/',
    tag: 'PDF Downloads',
  },
];
---

<BaseLayout>
  <main class="max-w-7xl mx-auto px-4 py-8 md:py-12">
    <!-- Hero Section -->
    <section class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">
        Clinical Decision Support for Interventional Neurology
      </h1>
      <p class="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
        Fast reference, comprehensive decision tools, and learning resources for residents and fellows in training
      </p>
      <a href="/clinical-scenarios/" class="inline-block px-8 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-medium transition-colors">
        Explore Clinical Scenarios
      </a>
    </section>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      <StatsCard number="25+" label="Procedures" />
      <StatsCard number="15+" label="Decision Trees" />
      <StatsCard number="40+" label="Classification Systems" />
      <StatsCard number="100%" label="Offline Access" />
    </div>

    <!-- Quick Access -->
    <QuickAccessSection 
      title="Most Used Procedures"
      description="Quick jump to the most frequently accessed tools"
      links={quickLinks}
    />

    <!-- Clinical Scenarios -->
    <section class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-8 h-8 bg-accent/10 rounded text-accent flex items-center justify-center">🎓</div>
        <h2 class="text-2xl font-bold text-primary">Clinical Scenarios (Learn by Context)</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <ProcedureCard {...scenario} />
        ))}
      </div>
    </section>

    <!-- Tools by Category -->
    <section class="mb-12">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-8 h-8 bg-accent/10 rounded text-accent flex items-center justify-center">🛠️</div>
        <h2 class="text-2xl font-bold text-primary">Tools by Category</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ProcedureCard {...tool} />
        ))}
      </div>
    </section>

    <!-- Learning Resources -->
    <section>
      <div class="flex items-center gap-3 mb-6">
        <div class="w-8 h-8 bg-accent/10 rounded text-accent flex items-center justify-center">📚</div>
        <h2 class="text-2xl font-bold text-primary">Learning Resources</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ProcedureCard {...resource} />
        ))}
      </div>
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 5: Commit**

```bash
cd C:\Users\bobva\Interventional-neuro-2026
git add src/pages/index.astro src/components/StatsCard.astro src/components/ProcedureCard.astro src/components/QuickAccessSection.astro
git commit -m "feat: create home page with hub layout and quick access"
```

---

### Task 5: Create Directory Structure for Content Pages

**Files:**
- Create: `src/pages/clinical-scenarios/index.astro`
- Create: `src/pages/tools/index.astro`
- Create: `src/pages/learning-resources/index.astro`
- Create: `src/pages/about.astro`
- Create: `src/layouts/DocsLayout.astro`

- [ ] **Step 1: Create DocsLayout for content pages**

File: `src/layouts/DocsLayout.astro`

```astro
---
import BaseLayout from './BaseLayout.astro';
import Breadcrumb from '../components/Breadcrumb.astro';

export interface Props {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
}

const { title, description, breadcrumbs = [] } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <div class="max-w-4xl mx-auto px-4 py-8">
    {breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} />}
    
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-primary mb-4">{title}</h1>
      {description && <p class="text-lg text-text-secondary">{description}</p>}
    </header>

    <div class="prose prose-lg max-w-none">
      <slot />
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Create clinical-scenarios hub**

File: `src/pages/clinical-scenarios/index.astro`

```astro
---
import DocsLayout from '../../layouts/DocsLayout.astro';
import ProcedureCard from '../../components/ProcedureCard.astro';

const scenarios = [
  {
    title: 'Subarachnoid Hemorrhage Management',
    description: 'Comprehensive approach to SAH diagnosis, stabilization, and definitive treatment planning.',
    icon: '⚡',
    href: '/clinical-scenarios/sah/',
    tag: 'High Risk',
    riskLevel: 'high' as const,
  },
  {
    title: 'Unruptured Aneurysm Evaluation',
    description: 'Assessment of incidental findings: when to treat and how to decide.',
    icon: '🎯',
    href: '/clinical-scenarios/unruptured-aneurysm/',
    tag: 'Decision Support',
  },
  {
    title: 'AVM Pre-Procedure Planning',
    description: 'Spetzler-Martin classification and embolization candidacy assessment.',
    icon: '🧠',
    href: '/clinical-scenarios/avm-planning/',
    tag: 'Planning',
  },
  {
    title: 'Dural AVF Management',
    description: 'Risk stratification and treatment decision-making for dural arteriovenous fistulas.',
    icon: '🛡️',
    href: '/clinical-scenarios/davf/',
    tag: 'Embolization',
  },
];
---

<DocsLayout 
  title="Clinical Scenarios"
  description="Learn by real clinical context. Each scenario walks through diagnosis, decision-making, and procedure planning."
  breadcrumbs={[{ label: 'Clinical Scenarios', href: '/clinical-scenarios/' }]}
>
  <p>
    Clinical scenarios are the best way to learn interventional neurology. Rather than learning tools in isolation, 
    these scenarios show you how to use assessment tools, decision frameworks, and procedural checklists in the context 
    of actual patient presentations.
  </p>

  <h2 class="text-2xl font-bold mt-8 mb-6">Featured Scenarios</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {scenarios.map((scenario) => (
      <ProcedureCard {...scenario} />
    ))}
  </div>
</DocsLayout>
```

- [ ] **Step 3: Create tools hub**

File: `src/pages/tools/index.astro`

```astro
---
import DocsLayout from '../../layouts/DocsLayout.astro';
import ProcedureCard from '../../components/ProcedureCard.astro';

const toolCategories = [
  {
    title: 'Vascular Assessment',
    description: 'Classification systems, risk scores, and diagnostic frameworks for vascular pathology.',
    icon: '📊',
    href: '/tools/vascular-assessment/',
    tag: '4 Tools',
  },
  {
    title: 'Procedural Checklists',
    description: 'Step-by-step protocols and safety checklists for common interventional procedures.',
    icon: '✅',
    href: '/tools/procedural-checklists/',
    tag: '8+ Procedures',
  },
  {
    title: 'Technique & Strategy',
    description: 'Decision trees, technique comparisons, and device selection guides.',
    icon: '🧬',
    href: '/tools/technique-strategy/',
    tag: 'Interactive',
  },
];
---

<DocsLayout 
  title="Tools"
  description="Complete reference library organized by clinical purpose, not original app silos."
  breadcrumbs={[{ label: 'Tools', href: '/tools/' }]}
>
  <p>
    All tools are organized by clinical context. Whether you need to assess a vascular lesion, follow a procedure 
    step-by-step, or compare treatment strategies, start with the category that matches your clinical question.
  </p>

  <h2 class="text-2xl font-bold mt-8 mb-6">Tool Categories</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {toolCategories.map((category) => (
      <ProcedureCard {...category} />
    ))}
  </div>
</DocsLayout>
```

- [ ] **Step 4: Create learning-resources hub**

File: `src/pages/learning-resources/index.astro`

```astro
---
import DocsLayout from '../../layouts/DocsLayout.astro';
import ProcedureCard from '../../components/ProcedureCard.astro';

const resources = [
  {
    title: 'Interactive Decision Trees',
    description: 'Flowcharts to guide clinical decisions from diagnosis through treatment selection.',
    icon: '📋',
    href: '/learning-resources/decision-trees/',
    tag: '15+ Trees',
  },
  {
    title: 'Risk Calculators',
    description: 'Clinical scoring tools and risk stratification instruments (PHASES, Raymond-Roy, etc.).',
    icon: '🧮',
    href: '/learning-resources/calculators/',
    tag: 'Interactive',
  },
  {
    title: 'Quick Reference Cards',
    description: 'Printable summaries, classification summaries, and clinical quick-looks.',
    icon: '📑',
    href: '/learning-resources/quick-reference/',
    tag: 'Printable',
  },
];
---

<DocsLayout 
  title="Learning Resources"
  description="Curated educational materials for residents and fellows learning interventional neurology."
  breadcrumbs={[{ label: 'Learning Resources', href: '/learning-resources/' }]}
>
  <p>
    Beyond procedures and checklists, these resources help you understand the "why" behind clinical decisions. 
    Interactive tools, decision frameworks, and reference materials support deep learning.
  </p>

  <h2 class="text-2xl font-bold mt-8 mb-6">Resource Types</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {resources.map((resource) => (
      <ProcedureCard {...resource} />
    ))}
  </div>
</DocsLayout>
```

- [ ] **Step 5: Create about page**

File: `src/pages/about.astro`

```astro
---
import DocsLayout from '../layouts/DocsLayout.astro';
---

<DocsLayout 
  title="About"
  description="Learn more about this platform"
  breadcrumbs={[{ label: 'About', href: '/about/' }]}
>
  <h2 class="text-2xl font-bold mt-8 mb-4">About This Platform</h2>

  <p>
    The Interventional Neuro Reference Platform consolidates the best clinical assessment tools, decision-support 
    systems, and learning resources for residents and fellows training in interventional neurology. This platform 
    brings together four previously separate applications into a single, unified, modern reference system optimized 
    for educational impact and clinical usability.
  </p>

  <h2 class="text-2xl font-bold mt-8 mb-4">Tools Included</h2>

  <ul>
    <li><strong>AVM Navigator</strong> — Arteriovenous malformation evaluation using Spetzler-Martin classification</li>
    <li><strong>Cerebral Flow Check</strong> — Cerebral angiography protocols and complication tracking</li>
    <li><strong>Coil Whisperer</strong> — Aneurysm treatment strategy decision support</li>
    <li><strong>Petrous Balloon Guide</strong> — Procedural checklists for interventional techniques</li>
  </ul>

  <h2 class="text-2xl font-bold mt-8 mb-4">Design Philosophy</h2>

  <p>
    <strong>Modern & Minimal:</strong> Clean, distraction-free design inspired by contemporary SaaS platforms 
    like Stripe and Linear. Learning works better without visual clutter.
  </p>

  <p>
    <strong>Content-First:</strong> Optimized for instant load times and offline access. Built with Astro for 
    pre-rendered static content with interactive elements only where they matter.
  </p>

  <p>
    <strong>Context-Based Organization:</strong> Tools are organized by clinical scenario and pathology, not by 
    original application. You navigate by clinical context, not technical category.
  </p>

  <h2 class="text-2xl font-bold mt-8 mb-4">Disclaimer</h2>

  <div class="bg-warning/10 border border-warning rounded-lg p-4 my-6">
    <p class="font-bold text-warning mb-2">Important</p>
    <p>
      This educational platform provides reference information and decision-support tools. It is not a substitute 
      for professional medical judgment, institutional protocols, or supervised training. Always follow your 
      institution's guidelines and consult with experienced supervisors before performing any procedure.
    </p>
  </div>
</DocsLayout>
```

- [ ] **Step 6: Commit**

```bash
cd C:\Users\bobva\Interventional-neuro-2026
git add src/pages/clinical-scenarios/index.astro src/pages/tools/index.astro src/pages/learning-resources/index.astro src/pages/about.astro src/layouts/DocsLayout.astro
git commit -m "feat: create hub pages for clinical scenarios, tools, and learning resources"
```

---

### Task 6: Test and Build

**Files:**
- No new files

- [ ] **Step 1: Start dev server and test home page**

```bash
cd C:\Users\bobva\Interventional-neuro-2026
npm run dev
```

Expected: Server runs on `http://localhost:3000`, home page loads without errors.

- [ ] **Step 2: Navigate to each hub page and verify layout**

Open in browser:
- http://localhost:3000/
- http://localhost:3000/clinical-scenarios/
- http://localhost:3000/tools/
- http://localhost:3000/learning-resources/
- http://localhost:3000/about/

Expected: All pages load, navigation works, responsive on mobile.

- [ ] **Step 3: Test search (open DevTools console)**

In browser console:
```javascript
// Verify SearchBar component loads
console.log('Type in search bar and verify results appear')
```

Expected: Search bar appears in header, can type, results show in dropdown.

- [ ] **Step 4: Build for production**

```bash
npm run build
```

Expected: Build completes without errors, `dist/` folder created.

- [ ] **Step 5: Preview production build**

```bash
npm run preview
```

Expected: Production preview runs without errors at `http://localhost:3000` (or next available port).

- [ ] **Step 6: Commit test results**

```bash
cd C:\Users\bobva\Interventional-neuro-2026
git add .
git commit -m "test: verify Astro platform builds and runs without errors"
```

---

## Next Phase: Content Population

These tasks establish the **foundation and architecture**. The next phase (separate plan) will involve:

1. Converting procedures from the 4 original repos into Markdown content
2. Extracting and adapting decision trees, calculators, and checklists
3. Creating clinical scenario content
4. Testing interactive components
5. Performance optimization
6. Deployment

---

## Plan Summary

| Phase | Tasks | Status |
|-------|-------|--------|
| **Setup** | Astro config, Tailwind, TypeScript | 1 task |
| **Foundation** | Layout, navigation, components | 2 tasks |
| **Interactivity** | React islands (search, trees, calcs, checklists) | 1 task |
| **Pages** | Home, hubs, layout templates | 2 tasks |
| **Testing** | Build, dev server, preview | 1 task |
| **Total** | **6 foundational tasks** | Ready to execute |

**Estimated Time:** 2-3 hours to build foundation (including testing and debugging)

**Output:** Fully functional Astro platform skeleton with modern design, ready for content population.

