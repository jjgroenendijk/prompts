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



## How to Use This Template



You can easily use this repository to host your own library of prompt rules.



### 1. Fork the Repository

Click the **Fork** button at the top right of this page to create your own copy of this repository under your GitHub account.



### 2. Configure Your Site

Open the `config.yml` file in your forked repository and update the following fields to match your username and repository name:



```yaml

site:

  title: "My Prompt Rules" # Your site title

  baseUrl: "https://<your-username>.github.io/<repo-name>"



github:

  owner: "<your-username>"

  repo: "<repo-name>"

```



### 3. Enable GitHub Pages

1. Go to your repository's **Settings**.

2. Click on **Pages** in the left sidebar.

3. Under **Build and deployment** > **Source**, select **GitHub Actions** from the dropdown menu.

4. The project includes a `.github/workflows/deploy.yml` file that will automatically build and deploy your site whenever you push changes to the `main` branch.



### 4. Add Your Own Snippets

1. Navigate to the `snippets/` directory.

2. Create new folders for your categories (e.g., `snippets/python`, `snippets/react`).

3. Add markdown files (`.md`) inside these folders. The filename will become the rule title (e.g., `clean-code.md` -> "Clean Code").

4. Commit and push your changes. The site will automatically rebuild and update.
