# Prompt Rule Selector

A static site to select and combine AI coding rules and prompts. This project is designed to be forked and used as your own personal library of prompt rules, hosted for free on GitHub Pages.

## Features

- **Browse Snippets**: Categorized view of coding rules and prompts.
- **Search**: Full-text search across all snippets.
- **Combine**: Select multiple snippets to generate a concatenated prompt rule set.
- **Clipboard**: One-click copy of selected rules.
- **GitHub Integration**: Edit existing rules or add new ones directly on GitHub.
- **Dark Mode**: Automatic theme detection.
- **Offline Capable**: Static export, works without a backend.

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

Once deployed, your site will be available by default at:
`https://<your-username>.github.io/<repo-name>/`

### 4. Add Your Own Snippets

1. Navigate to the `snippets/` directory.
2. Create new folders for your categories (e.g., `snippets/python`, `snippets/react`).
3. Add markdown files (`.md`) inside these folders. The filename will become the rule title (e.g., `clean-code.md` -> "Clean Code").
4. Commit and push your changes. The site will automatically rebuild and update.

### 5. Custom Domain (Optional)

1.  **Configure DNS**: Follow the official [GitHub Pages documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages) to set up your DNS records with your provider.
2.  **GitHub Settings**:
    *   Go to your repository **Settings** > **Pages**.
    *   Under **Custom domain**, enter your domain and click **Save**.
    *   Check "Enforce HTTPS".
3.  **Update Config**:
    *   Open `config.yml`.
    *   Update `baseUrl`. If using a custom domain at the root (like `prompts.example.com` or `example.com`), set it to the full URL `https://prompts.example.com`.
    *   *Note:* The build process parses this URL to set the correct base path for your site assets.

## Adding Snippets Details

Snippets are plain Markdown files located in the `snippets/` directory.
- Organize them into subdirectories (Categories).
- The filename becomes the title (e.g., `input-validation.md` -> "Input Validation").
- No frontmatter is required.