# Prompt Rule Selector

A static site to select and combine AI coding rules and prompts.

## Features

- **Browse Snippets**: Categorized view of coding rules and prompts.
- **Search**: Full-text search across all snippets.
- **Combine**: Select multiple snippets to generate a concatenated prompt rule set.
- **Clipboard**: One-click copy of selected rules.
- **GitHub Integration**: Edit existing rules or add new ones directly on GitHub.
- **Dark Mode**: Automatic theme detection.
- **Offline Capable**: Static export, works without a backend.

## Getting Started

### Prerequisites

- Node.js 20+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jjgroenendijk/prompts.git
   cd prompts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

### Configuration

Edit `config.yml` in the root directory to customize the site title, repository links, and UI text.

### Adding Snippets

Snippets are plain Markdown files located in the `snippets/` directory.
- Organize them into subdirectories (Categories).
- The filename becomes the title (e.g., `input-validation.md` -> "Input Validation").
- No frontmatter is required.

## Deployment

This project is configured for GitHub Pages.
It uses GitHub Actions to build and deploy to the `gh-pages` branch on push to `main`.

To deploy manually:
```bash
npm run build
# Serve the 'out' directory
npx serve out
```