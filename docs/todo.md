# Project TODO List: Prompt Rule Selector
## AI Agent Implementation Guide

This TODO list is organized into independent, atomic tasks suitable for AI coding agents. Each task group can be executed by a separate agent in parallel.

---

## 🔧 TASK GROUP 1: Project Initialization & Configuration

**Agent Role**: Setup Agent  
**Dependencies**: None  
**Estimated Complexity**: Low  

### Tasks:
- [x] Initialize Next.js 16 project with App Router using `npx create-next-app@latest`
- [ ] Install required dependencies:
  - `tailwindcss` (v4.1+)
  - `@tailwindcss/postcss`
  - `postcss`
  - `js-yaml`
  - `glob`
- [x] Create basic `package.json` with scripts: `dev`, `build`, `start`
- [x] Verify project structure matches Next.js 16 App Router conventions
- [x] Create `.gitignore` with standard Next.js entries

**Acceptance Criteria**:
- Project runs with `npm run dev`
- All dependencies install without errors
- Directory structure follows Next.js 16 conventions

---

## 🎨 TASK GROUP 2: Tailwind CSS 4.1 Configuration

**Agent Role**: Styling Agent  
**Dependencies**: TASK GROUP 1 (Project Initialization)  
**Estimated Complexity**: Low  

### Tasks:
- [ ] Create `postcss.config.mjs` with Tailwind PostCSS plugin configuration
- [ ] Create `app/globals.css` with `@import "tailwindcss";`
- [ ] Configure dark mode support using `class` strategy in Tailwind
- [ ] Test dark mode by creating a simple test component with `dark:` classes
- [ ] Verify Tailwind utility classes work in browser

**Acceptance Criteria**:
- Tailwind styles apply correctly
- Dark mode classes toggle based on parent element class
- No CSS errors in console

**Code Reference**:
```javascript
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  }
}

// app/globals.css
@import "tailwindcss";
```

---

## ⚙️ TASK GROUP 3: Configuration System

**Agent Role**: Config Agent  
**Dependencies**: TASK GROUP 1 (Project Initialization)  
**Estimated Complexity**: Medium  

### Tasks:
- [ ] Create `config.yml` in project root with all required fields (see structure below)
- [ ] Create `lib/config.js` to read and parse `config.yml` using `js-yaml`
- [ ] Implement basePath derivation from baseUrl (extract path component from URL)
- [ ] Add config validation with helpful error messages for missing required fields
- [ ] Update `next.config.js` to:
  - Import and parse `config.yml`
  - Set `output: 'export'`
  - Set `basePath` from derived value
  - Set `trailingSlash: true`
  - Set `images: { unoptimized: true }`
- [ ] Test build with valid and invalid config files

**Config Structure**:
```yaml
site:
  title: "Prompt Rule Selector"
  description: "Select and combine AI coding rules and prompts"
  baseUrl: "https://jjgroenendijk.nl/prompts"

github:
  owner: "jjgroenendijk"
  repo: "prompts"
  defaultBranch: "main"

ui:
  previewCharLimit: 400
  searchPlaceholder: "Search rules..."
  copyButtonText: "Copy Selected Rules"
  addButtonText: "Add New Rule"
  configButtonText: "Settings"

rules:
  separator: "\n\n---\n\n"
  includeTitle: true
```

**Acceptance Criteria**:
- Config loads successfully at build time
- Invalid config fails build with clear error message
- basePath correctly derived from baseUrl
- next.config.js properly configured for static export

---

## 📄 TASK GROUP 4: Snippet Processing System

**Agent Role**: Data Processing Agent  
**Dependencies**: TASK GROUP 3 (Configuration System)  
**Estimated Complexity**: Medium  

### Tasks:
- [ ] Create `lib/snippets.js` for snippet processing logic
- [ ] Implement `getAllSnippets()` function:
  - Use `glob` to scan `snippets/**/*.md` recursively
  - Read each markdown file content (no frontmatter parsing)
  - Extract category from parent directory name
  - Generate title from filename (convert kebab-case to Title Case)
  - Generate unique ID from file path
  - Return array of snippet objects
- [ ] Create `lib/github.js` for GitHub URL generation:
  - `getEditUrl(filePath, config)` - returns GitHub edit URL
  - `getCreateUrl(category, config)` - returns GitHub new file URL
  - `getConfigUrl(config)` - returns config.yml edit URL
- [ ] Add error handling for:
  - Missing snippets directory
  - Unreadable files
  - Empty files
- [ ] Test with sample markdown files

**Snippet Object Structure**:
```javascript
{
  id: "snippets/security/input-validation.md",
  title: "Input Validation",
  category: "security",
  content: "Always validate user input...",
  filePath: "snippets/security/input-validation.md",
  editUrl: "https://github.com/owner/repo/edit/main/snippets/security/input-validation.md"
}
```

**Acceptance Criteria**:
- Function scans all `.md` files in `snippets/` recursively
- Titles correctly generated from filenames
- Categories correctly extracted from directory structure
- GitHub URLs correctly formatted
- Empty or missing directories handled gracefully

---

## 🛠️ TASK GROUP 5: Utility Functions

**Agent Role**: Utilities Agent  
**Dependencies**: None  
**Estimated Complexity**: Low  

### Tasks:
- [x] Create `lib/utils.js` with helper functions
- [x] Implement `truncateText(text, limit)`:
  - Truncate at word boundaries
  - Add "..." if truncated
  - Return original if under limit
- [x] Implement `debounce(func, delay)` for search input
- [x] Implement `copyToClipboard(text)`:
  - Use modern Clipboard API
  - Return promise for success/failure
  - Handle errors gracefully
- [x] Implement `formatTitle(filename)`:
  - Convert kebab-case to Title Case
  - Remove .md extension
  - Handle edge cases (numbers, special chars)
- [x] Add unit tests or verification for each utility

**Acceptance Criteria**:
- All utilities work independently
- Edge cases handled (empty strings, null values)
- No runtime errors

---

## 🎭 TASK GROUP 6: Theme System

**Agent Role**: Theme Agent  
**Dependencies**: TASK GROUP 2 (Tailwind Configuration)  
**Estimated Complexity**: Low  

### Tasks:
- [ ] Create `components/ThemeProvider.js` as client component
- [ ] Implement theme detection using `window.matchMedia('(prefers-color-scheme: dark)')`
- [ ] Add event listener for theme changes
- [ ] Apply 'dark' class to document root when dark theme detected
- [ ] Remove 'dark' class when light theme detected
- [ ] Handle SSR/hydration (check for window existence)
- [ ] Test theme switching manually in browser settings

**Acceptance Criteria**:
- Theme automatically detects system preference
- Theme updates when system preference changes
- No hydration errors
- Works in both light and dark mode

**Code Scaffold**:
```javascript
'use client'
import { useEffect, useState } from 'react'

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    // Implement theme detection
  }, [])
  
  return <div className={theme}>{children}</div>
}
```

---

## 🧩 TASK GROUP 7: Core UI Components

**Agent Role**: UI Components Agent  
**Dependencies**: TASK GROUP 2 (Tailwind), TASK GROUP 3 (Config), TASK GROUP 4 (Snippets)  
**Estimated Complexity**: High  

### Tasks:

#### 7.1 Header Component
- [ ] Create `components/Header.js`
- [ ] Display site title from config
- [ ] Add settings button (gear icon) - redirects to config.yml edit
- [ ] Add plus button - redirects to new snippet creation
- [ ] Make responsive (stack buttons on mobile)
- [ ] Style with dark mode support

#### 7.2 Search Bar Component
- [ ] Create `components/SearchBar.js` as client component
- [ ] Implement controlled input with debouncing (300ms)
- [ ] Add clear button (X icon)
- [ ] Use placeholder from config
- [ ] Emit search query changes to parent
- [ ] Style with dark mode support

#### 7.3 Category Filter Component
- [ ] Create `components/CategoryFilter.js` as client component
- [ ] Display checkbox for each category
- [ ] Show snippet count per category
- [ ] Implement "Select All" checkbox per category
- [ ] Make collapsible/expandable sections
- [ ] Style with dark mode support

#### 7.4 Snippet Item Component
- [ ] Create `components/SnippetItem.js`
- [ ] Display checkbox for selection
- [ ] Display title (bold, from filename)
- [ ] Display preview (truncated content)
- [ ] Add Edit button - opens GitHub edit URL
- [ ] Handle selection toggle
- [ ] Style with hover states and dark mode

#### 7.5 Output Window Component
- [ ] Create `components/OutputWindow.js` as client component
- [ ] Display concatenated selected snippets
- [ ] Add Copy button with clipboard functionality
- [ ] Show "Copied!" feedback for 2 seconds
- [ ] Display character count
- [ ] Add "Clear All" button
- [ ] Show empty state when nothing selected
- [ ] Style with dark mode support

**Acceptance Criteria**:
- All components render without errors
- Props passed correctly between components
- Dark mode styling works
- Interactive elements respond to clicks
- GitHub redirects work correctly

---

## 📱 TASK GROUP 8: Main Page & Layout

**Agent Role**: Integration Agent  
**Dependencies**: TASK GROUP 6 (Theme), TASK GROUP 7 (Components)  
**Estimated Complexity**: High  

### Tasks:

#### 8.1 Root Layout
- [ ] Create `app/layout.js`
- [ ] Wrap app with ThemeProvider
- [ ] Import `globals.css`
- [ ] Set metadata (title, description from config)
- [ ] Configure viewport for responsive design

#### 8.2 Main Page
- [ ] Create `app/page.js`
- [ ] Load all snippets at build time using `getAllSnippets()`
- [ ] Pass config to page component
- [ ] Implement two-column layout:
  - Left: Header + Search + Categories + Snippet List (40%)
  - Right: Output Window (60%)
- [ ] Make responsive (stack vertically on mobile <768px)
- [ ] Style with proper spacing and dark mode

#### 8.3 State Management
- [ ] Add useState for selected snippet IDs (Set or array)
- [ ] Add useState for search query
- [ ] Add useState for category filters (object/map)
- [ ] Add useState for "copied" feedback
- [ ] Implement selection toggle logic
- [ ] Implement "Select All" / "Clear All" logic

#### 8.4 Search & Filter Logic
- [ ] Implement full-text search across title and content
- [ ] Make search case-insensitive
- [ ] Combine search with category filters
- [ ] Update displayed snippets on search/filter change
- [ ] Handle empty search results

#### 8.5 Output Generation
- [ ] Concatenate selected snippets with configured separator
- [ ] Optionally include title as `## Title` if `includeTitle: true`
- [ ] Update output whenever selections change
- [ ] Format output for clipboard

**Acceptance Criteria**:
- Page renders correctly on desktop and mobile
- Search filters snippets in real-time
- Category filters work independently and with search
- Selection state managed correctly
- Output updates when selections change
- Copy functionality works
- Dark mode applied throughout

---

## 📦 TASK GROUP 9: Sample Content Creation

**Agent Role**: Content Agent  
**Dependencies**: None (can run in parallel)  
**Estimated Complexity**: Low  

### Tasks:
- [x] Create `snippets/` directory structure
- [x] Create `snippets/security/` directory
- [x] Create `snippets/security/input-validation.md` with realistic security content
- [x] Create `snippets/security/authentication.md` with auth best practices
- [x] Create `snippets/coding-style/` directory
- [x] Create `snippets/coding-style/naming-conventions.md` with naming rules
- [x] Create `snippets/coding-style/error-handling.md` with error handling patterns
- [x] Create `snippets/prompts/` directory
- [x] Create `snippets/prompts/code-review.md` with code review checklist
- [x] Create `snippets/prompts/debugging.md` with debugging strategies
- [x] Ensure all content is plain markdown (no frontmatter)
- [x] Vary content length to test truncation (some short, some long)

**Content Guidelines**:
- Write realistic, useful content
- No frontmatter or YAML
- Use markdown formatting (lists, code blocks, headers)
- Keep filenames in kebab-case
- Test edge cases (special characters, very long content)

**Acceptance Criteria**:
- 3 categories created with 2-3 snippets each
- Content is realistic and useful
- Filenames follow kebab-case convention
- Various content lengths for testing

---

## 🚀 TASK GROUP 10: Deployment Configuration

**Agent Role**: DevOps Agent  
**Dependencies**: TASK GROUP 1 (Project Init), TASK GROUP 3 (Config)  
**Estimated Complexity**: Medium  

### Tasks:

#### 10.1 GitHub Actions Workflow
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Configure workflow to trigger on push to `main` branch
- [ ] Set up Node.js 20 environment
- [ ] Add steps:
  - Checkout repository
  - Setup Node.js
  - Install dependencies (`npm ci`)
  - Build Next.js (`npm run build`)
  - Deploy to `gh-pages` branch using `peaceiris/actions-gh-pages@v3`
- [ ] Test workflow (commit and push to verify)

#### 10.2 Custom Domain Setup
- [ ] Create `public/CNAME` file with domain: `jjgroenendijk.nl`
- [ ] Document DNS configuration needed (CNAME record)
- [ ] Update README with custom domain setup instructions

#### 10.3 Static Export Verification
- [ ] Verify `next.config.js` has correct static export settings
- [ ] Run `npm run build` locally
- [ ] Inspect `out/` directory structure
- [ ] Verify all assets have correct paths with basePath
- [ ] Test static files can be served

**Workflow Template**:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

**Acceptance Criteria**:
- Workflow runs successfully
- Build completes without errors
- Static files deployed to `gh-pages` branch
- CNAME file included in deployment

---

## ✨ TASK GROUP 11: Polish & Final Testing

**Agent Role**: QA Agent  
**Dependencies**: ALL previous task groups  
**Estimated Complexity**: Medium  

### Tasks:

#### 11.1 Functional Verification
- [ ] Test snippet loading displays all snippets
- [ ] Test search filters snippets correctly
- [ ] Test category checkboxes filter snippets
- [ ] Test snippet selection/deselection
- [ ] Test "Select All" in category
- [ ] Test "Clear All" button
- [ ] Test output concatenation with separator
- [ ] Test copy to clipboard functionality
- [ ] Test Edit button opens correct GitHub URL
- [ ] Test Add button opens GitHub new file page
- [ ] Test Settings button opens config.yml edit page

#### 11.2 Responsive Design Verification
- [ ] Test layout at 320px width (mobile)
- [ ] Test layout at 768px width (tablet)
- [ ] Test layout at 1024px+ width (desktop)
- [ ] Verify columns stack on mobile
- [ ] Verify touch interactions work on mobile

#### 11.3 Dark Mode Verification
- [ ] Test in light mode (all components)
- [ ] Test in dark mode (all components)
- [ ] Verify theme switches when system preference changes
- [ ] Check color contrast for accessibility

#### 11.4 Edge Cases
- [ ] Test with empty snippets directory
- [ ] Test with no search results
- [ ] Test with very long content (>1000 chars)
- [ ] Test with special characters in filenames
- [ ] Test with 50+ snippets (performance)

#### 11.5 Code Quality
- [ ] Remove console.log statements
- [ ] Remove unused imports
- [ ] Add code comments where needed
- [ ] Ensure consistent formatting
- [ ] Check for accessibility issues (ARIA labels, keyboard nav)

**Acceptance Criteria**:
- All functional tests pass
- Responsive design works on all breakpoints
- Dark mode works correctly
- No console errors
- Code is clean and documented

---

## 📚 TASK GROUP 12: Documentation

**Agent Role**: Documentation Agent  
**Dependencies**: ALL previous task groups  
**Estimated Complexity**: Low  

### Tasks:
- [ ] Update `README.md` with:
  - Project description
  - Features list
  - Installation instructions
  - Usage guide
  - Configuration guide
  - Deployment instructions
- [ ] Add `CONTRIBUTING.md` with:
  - How to add new snippets
  - Snippet naming conventions
  - How to test locally
- [ ] Add inline JSDoc comments to key functions
- [ ] Document config.yml schema and all options
- [ ] Add troubleshooting section for common issues

**Acceptance Criteria**:
- README is clear and complete
- New users can set up and use the project
- Contributors know how to add snippets
- Code is well-commented

---

## 📊 Progress Tracking

### Completion Status:
- [ ] TASK GROUP 1: Project Initialization
- [ ] TASK GROUP 2: Tailwind Configuration
- [ ] TASK GROUP 3: Configuration System
- [ ] TASK GROUP 4: Snippet Processing
- [x] TASK GROUP 5: Utility Functions
- [ ] TASK GROUP 6: Theme System
- [ ] TASK GROUP 7: Core UI Components
- [ ] TASK GROUP 8: Main Page & Layout
- [x] TASK GROUP 9: Sample Content
- [ ] TASK GROUP 10: Deployment Configuration
- [ ] TASK GROUP 11: Polish & Testing
- [ ] TASK GROUP 12: Documentation

### Execution Order:
**Parallel Execution Possible**:
- Groups 1, 5, 9 can run simultaneously
- Groups 2, 3, 4 can start after Group 1
- Group 6 requires Group 2
- Group 7 requires Groups 2, 3, 4
- Group 8 requires Groups 6, 7
- Group 10 requires Groups 1, 3
- Groups 11, 12 require all previous groups

**Recommended Execution Order**:
1. **Phase 1** (Parallel): Groups 1, 5, 9
2. **Phase 2** (Parallel): Groups 2, 3, 4
3. **Phase 3**: Group 6
4. **Phase 4**: Group 7
5. **Phase 5** (Parallel): Groups 8, 10
6. **Phase 6** (Sequential): Groups 11, 12

---

## 🎯 Definition of Done

A task group is complete when:
- ✅ All tasks within the group are checked off
- ✅ Acceptance criteria are met
- ✅ Code runs without errors
- ✅ Changes are committed to git
- ✅ No breaking changes to other components
- ✅ Dark mode support implemented (where applicable)
- ✅ Responsive design works (where applicable)

---

## 📝 Notes for AI Agents

- Each task group is designed to be atomic and independent where possible
- Dependencies are clearly marked at the top of each group
- Acceptance criteria define what "done" means for each group
- Code scaffolds and templates are provided where helpful
- Focus on build-time processing (config loaded once during build)
- No runtime config injection needed - all data baked into static build
- Markdown files have NO frontmatter - title from filename, content is entire file
- Test functionality after completing each group
- Commit frequently with clear commit messages
