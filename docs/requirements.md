# Requirements Document: Prompt Rule Selector

## Project Overview

A static website hosted on GitHub Pages that allows users to select and combine AI coding rules and prompt snippets from a repository. Users can browse, search, select, and copy concatenated rules with integrated GitHub editing capabilities.

## Technical Stack

- Framework: Next.js 16 (App Router)
- Styling: Tailwind CSS 4.1
- Hosting: GitHub Pages (Static Export)
- Content: Plain Markdown files (no frontmatter)
- Build: GitHub Actions (auto-deploy on changes)
- Domain: Custom domain (jjgroenendijk.nl/prompts)

## Configuration

- All build-time configuration must be centralized in config.yml at repository root
- Config must be loaded only at build time via Next.js
- Config data is baked into the static build, no runtime loading needed
- Invalid or missing config must fail build with helpful error messages
- Default fallback values must be provided for optional fields
- The basePath for Next.js should be automatically derived from baseUrl
- Parse baseUrl to extract path component
- Empty path for user/org sites

## Content

- Snippets must be stored in snippets/ directory with category subdirectories
- No frontmatter in markdown files
- Title is derived from filename
- Entire file content is the rule text
- Files must have .md extension
- Category determined by parent directory name
- Filename formatting: kebab-case
- All snippets must be processed during next build
- Recursively scan snippets/**/*.md
- Read file content (no frontmatter parsing needed)
- Generate title from filename (convert kebab-case to Title Case)
- Generate unique IDs (use file path as ID)
- Extract category from directory structure
- Generate GitHub edit URLs for each snippet
- Embed data directly in page components (baked into static HTML)

## User Interface

- Desktop (≥768px): Two-column layout
- Mobile (<768px): Stacked layout

Rule Browser:
- Site title (from config)
- Settings button (redirects to edit config.yml)
- Plus button (redirects to create new snippet)
- Full-text search across title (filename) and content
- Real-time filtering as user types
- Debounced for performance (300ms)
- Clear button to reset search
- Checkbox per category (derived from subdirectories)
- Select All / Deselect All per category
- Show count of snippets per category
- Collapsible category sections
- Scrollable list of rule items
- Each item shows checkbox for selection, title (derived from filename), preview (limited to previewCharLimit from config), and edit button (opens GitHub edit page)
- Preview should truncate at word boundaries, not mid-word
- Indicate truncation with "..."

Rule Output:
- Textarea or pre-formatted div
- Shows concatenated selected rules
- Live updates as selections change
- Formatted with configurable separator
- Optional metadata headers (title, description)
- Copy button (copies full output to clipboard)
- Character/word count display
- Clear All button to deselect all
- Format toggle (if multiple output formats supported)
- Copied confirmation message
- Empty state when no rules selected
- Loading state during initialization

## Theme Support

- Detect user's OS/browser theme preference via prefers-color-scheme
- Apply dark or light theme automatically on page load by default
- Listen for theme changes and update dynamically (unless overridden by manual toggle)
- Use Tailwind's dark: class variants for styling
- Light Mode: Background: White/Light Gray, Text: Dark Gray/Black, Borders: Light Gray, Accent: Blue
- Dark Mode: Background: Dark Gray/Black, Text: White/Light Gray, Borders: Dark Gray, Accent: Light Blue
- Toggle button in header to switch between Light and Dark modes
- Toggling overrides the system preference
- Persist user preference in localStorage
- The toggle button must correctly reflect the active theme, even if that state was reached via system preference

## GitHub Integration

Edit Snippet:
- Each snippet has an Edit button
- Clicking opens GitHub's web editor in new tab
- Owner, repo, branch from config.yml
- File path is relative path from repo root
- Opens in new tab (target="_blank")
- GitHub handles authentication and permissions
- User must have write access to edit (or fork)

Add New Snippet:
- Plus button in header
- Optionally allow category selection before redirect
- Redirect to GitHub's "create new file" interface
- Pre-populate category in filename
- Optionally pre-fill with markdown template
- User can rename file and edit category in GitHub UI
- GitHub handles authentication and permissions

Edit Configuration:
- Settings/gear button in header
- Redirects to edit config.yml in GitHub
- Opens in new tab
- Changes trigger GitHub Actions rebuild
- User must wait for deployment to see changes
- Consider adding validation workflow to prevent broken configs

## Search and Filtering

- Search across title (filename) and full content
- Case-insensitive matching
- Highlight matching terms (optional)
- Debounced input (300ms delay)
- Clear search with button or ESC key
- Client-side search (all data loaded at build)
- Use simple string matching or library like fuse.js for fuzzy search
- Performance: optimize for up to 500 snippets
- Show all categories derived from subdirectories
- Checkbox to show/hide entire category
- Select All applies only to visible/filtered snippets
- Filter works in combination with search
- Show count for snippets per category

## Selection and Output

- Checkbox per snippet for selection
- Support keyboard navigation (arrow keys, space to toggle)
- Visual indication of selected state
- Select All / Clear All buttons
- Persist selections in localStorage (optional)
- Configurable formats via config.yml
- Rules separator can be configured
- includeTitle flag determines if filename is included as title in output
- Copy button copies full output text
- Visual feedback: Copied message for 2 seconds
- Handle copy errors gracefully
- Support modern Clipboard API
- Fallback for older browsers

## Documentation

The main README.md must clearly explain how other users can use this project as a template to set up their own personal prompts website:

- Steps to fork the repo to their own GitHub account
- Instructions on how to update config.yml (specifically changing baseUrl, github.owner, and github.repo to match their fork)
- Navigate to Repository Settings > Pages
- Source: GitHub Actions
- Verification that the deployment workflow exists (.github/workflows/deploy.yml)
- Brief guide on how to add their own snippets
