# Requirements Document: Prompt Rule Selector

## Project Overview
A static website hosted on GitHub Pages that allows users to select and combine AI coding rules and prompt snippets from a repository. Users can browse, search, select, and copy concatenated rules with integrated GitHub editing capabilities.

## Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4.1
- **Hosting**: GitHub Pages (Static Export)
- **Content**: Plain Markdown files (no frontmatter)
- **Build**: GitHub Actions (auto-deploy on changes)
- **Domain**: Custom domain (jjgroenendijk.nl/prompts)

## Core Requirements

### 1. Configuration Management

#### 1.1 User-Configurable Settings
**Priority**: HIGH

All build-time configuration must be centralized in `config.yml` at repository root:

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
  configButtonText: "Configure Settings"
  
rules:
  separator: "\n\n---\n\n"  # Separator between concatenated rules
  includeTitle: true         # Include filename as title in output
```

**Requirements**:
- Config must be loaded ONLY at build time via Next.js
- Config data is baked into the static build, no runtime loading needed
- Invalid or missing config must fail build with helpful error messages
- Default fallback values must be provided for optional fields

#### 1.2 Base Path Derivation
**Priority**: HIGH

The `basePath` for Next.js should be automatically derived from `baseUrl`:
- Parse `baseUrl` to extract path component
- Example: `https://jjgroenendijk.nl/prompts` → `basePath: "/prompts"`
- Empty path for user/org sites: `https://username.github.io` → `basePath: ""`

### 2. Content Management

#### 2.1 Snippet Structure
**Priority**: HIGH

Snippets must be stored in `snippets/` directory with category subdirectories:

```
snippets/
├── security/
│   ├── input-validation.md
│   └── authentication.md
├── coding-style/
│   ├── naming-conventions.md
│   └── error-handling.md
└── prompts/
    ├── code-review.md
    └── debugging.md
```

**Markdown Format** (SIMPLIFIED - No Frontmatter):
```markdown
Always validate user input on both client and server side:
- Check for required fields
- Validate data types
- Sanitize input to prevent XSS
- Use parameterized queries for database operations
```

**Requirements**:
- NO frontmatter in markdown files
- Title is derived from filename (e.g., `input-validation.md` → "Input Validation")
- Entire file content is the rule text
- Files must have `.md` extension
- Category determined by parent directory name
- Filename formatting: kebab-case (e.g., `input-validation.md`, `code-review.md`)

#### 2.2 Build-Time Processing
**Priority**: HIGH

All snippets must be processed during `next build`:
- Recursively scan `snippets/**/*.md`
- Read file content (no frontmatter parsing needed)
- Generate title from filename (convert kebab-case to Title Case)
- Generate unique IDs (use file path as ID)
- Extract category from directory structure
- Generate GitHub edit URLs for each snippet
- Embed data directly in page components (baked into static HTML)

### 3. User Interface

#### 3.1 Layout Structure
**Priority**: HIGH

**Desktop (≥768px)**: Two-column layout

**Mobile (<768px)**: Stacked layout

#### 3.2 Left Column: Rule Browser
**Priority**: HIGH

**Components**:
1. **Header**
   - Site title (from config)
   - Settings button (redirects to edit config.yml)
   - Plus button (redirects to create new snippet)

2. **Search Bar**
   - Full-text search across title (filename) and content
   - Real-time filtering as user types
   - Debounced for performance (300ms)
   - Clear button to reset search

3. **Category Filters**
   - Checkbox per category (derived from subdirectories)
   - "Select All" / "Deselect All" per category
   - Show count of snippets per category
   - Collapsible category sections

4. **Rule List**
   - Scrollable list of rule items
   - Each item shows:
     - Checkbox for selection
     - Title (bold, derived from filename)
     - Preview (limited to `previewCharLimit` from config)
     - Edit button (opens GitHub edit page)
   - Preview should truncate at word boundaries, not mid-word
   - Indicate truncation with "..."

#### 3.3 Right Column: Rule Output
**Priority**: HIGH

**Components**:
1. **Output Window**
   - Textarea or pre-formatted div
   - Shows concatenated selected rules
   - Live updates as selections change
   - Formatted with configurable separator
   - Optional metadata headers (title, description)

2. **Controls**
   - Copy button (copies full output to clipboard)
   - Character/word count display
   - "Clear All" button to deselect all
   - Format toggle (if multiple output formats supported)

3. **Visual Feedback**
   - "Copied!" confirmation message
   - Empty state when no rules selected
   - Loading state during initialization

### 4. Theme Support

#### 4.1 Automatic Theme Detection
**Priority**: MEDIUM

**Requirements**:
- Detect user's OS/browser theme preference via `prefers-color-scheme`
- Apply dark or light theme automatically on page load
- Listen for theme changes and update dynamically
- Use Tailwind's `dark:` class variants for styling

**Color Scheme**:
- **Light Mode**:
  - Background: White/Light Gray (#FFFFFF, #F9FAFB)
  - Text: Dark Gray/Black (#111827, #374151)
  - Borders: Light Gray (#E5E7EB)
  - Accent: Blue (#3B82F6)

- **Dark Mode**:
  - Background: Dark Gray/Black (#111827, #1F2937)
  - Text: White/Light Gray (#F9FAFB, #D1D5DB)
  - Borders: Dark Gray (#374151)
  - Accent: Light Blue (#60A5FA)

#### 4.2 Manual Theme Toggle (Optional)
**Priority**: LOW

Future enhancement: Allow user to manually override system preference
- Toggle button in header
- Persist preference in localStorage
- Override system preference

### 5. GitHub Integration

#### 5.1 Edit Snippet
**Priority**: HIGH

**Functionality**:
- Each snippet has an "Edit" button
- Clicking opens GitHub's web editor in new tab
- URL format: `https://github.com/{owner}/{repo}/edit/{branch}/{filePath}`
- Example: `https://github.com/jjgroenendijk/prompts/edit/main/snippets/security/input-validation.md`

**Requirements**:
- Owner, repo, branch from config.yml
- File path is relative path from repo root
- Opens in new tab (`target="_blank"`)
- GitHub handles authentication and permissions
- User must have write access to edit (or fork)

#### 5.2 Add New Snippet
**Priority**: HIGH

**Functionality**:
- Plus button in header
- Optionally allow category selection before redirect
- Redirect to GitHub's "create new file" interface
- URL format: `https://github.com/{owner}/{repo}/new/{branch}?filename=snippets/{category}/new-rule.md`

**Requirements**:
- Pre-populate category in filename
- Optionally pre-fill with markdown template
- User can rename file and edit category in GitHub UI
- GitHub handles authentication and permissions

#### 5.3 Edit Configuration
**Priority**: HIGH

**Functionality**:
- Settings/gear button in header
- Redirects to edit `config.yml` in GitHub
- URL format: `https://github.com/{owner}/{repo}/edit/{branch}/config.yml`

**Requirements**:
- Opens in new tab
- Changes trigger GitHub Actions rebuild
- User must wait for deployment to see changes
- Consider adding validation workflow to prevent broken configs

### 6. Search and Filtering

#### 6.1 Full-Text Search
**Priority**: HIGH

**Requirements**:
- Search across title (filename) and full content
- Case-insensitive matching
- Highlight matching terms (optional)
- Debounced input (300ms delay)
- Clear search with button or ESC key

**Implementation**:
- Client-side search (all data loaded at build)
- Use simple string matching or library like `fuse.js` for fuzzy search
- Performance: optimize for up to 500 snippets

#### 6.2 Category Filtering
**Priority**: HIGH

**Requirements**:
- Show all categories derived from subdirectories
- Checkbox to show/hide entire category
- "Select All" applies only to visible/filtered snippets
- Filter works in combination with search
- Show count: "Security (5)" for 5 snippets in category

### 7. Selection and Output

#### 7.1 Selection Management
**Priority**: HIGH

**Requirements**:
- Checkbox per snippet for selection
- Support keyboard navigation (arrow keys, space to toggle)
- Visual indication of selected state
- "Select All" / "Clear All" buttons
- Persist selections in localStorage (optional)

#### 7.2 Output Formatting
**Priority**: HIGH

**Configurable Formats**:
```yaml
# In config.yml
rules:
  separator: "\n\n---\n\n"
  includeTitle: true  # Include filename as title in output
```

**Output Example (with title)**:
```
## Input Validation

Always validate user input on both client and server side:
- Check for required fields
- Validate data types

---

## Error Handling

Use try-catch blocks appropriately:
- Catch specific exceptions
- Log errors with context
```

**Output Example (without title)**:
```
Always validate user input on both client and server side:
- Check for required fields
- Validate data types

---

Use try-catch blocks appropriately:
- Catch specific exceptions
- Log errors with context
```

#### 7.3 Copy to Clipboard
**Priority**: HIGH

**Requirements**:
- Copy button copies full output text
- Visual feedback: "Copied!" message for 2 seconds
- Handle copy errors gracefully
- Support modern Clipboard API
- Fallback for older browsers
