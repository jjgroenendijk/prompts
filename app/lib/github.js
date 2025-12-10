import { getCachedConfig } from './config.js';

let config = null;

async function ensureConfig() {
  if (!config) {
    config = await getCachedConfig();
  }
  return config;
}

/**
 * Generates a GitHub URL to edit a file.
 * @param {string} filePath - Relative path to the file (e.g., 'snippets/security/rule.md')
 * @param {Object} configOverride - Optional config object to use instead of loading
 * @returns {string} - The GitHub edit URL
 */
export function getEditUrl(filePath, configOverride = null) {
  const cfg = configOverride || config;
  if (!cfg) {
    throw new Error('Config not loaded. Call ensureConfig() first or provide configOverride.');
  }

  const GITHUB_BASE = `https://github.com/${cfg.github.owner}/${cfg.github.repo}`;
  const BRANCH = cfg.github.defaultBranch || 'main';

  // Ensure filePath doesn't start with / or ../
  let cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
  // Remove leading ../ if present (from relative paths during build)
  if (cleanPath.startsWith('../')) {
    cleanPath = cleanPath.slice(3);
  }
  return `${GITHUB_BASE}/edit/${BRANCH}/${cleanPath}`;
}

/**
 * Generates a GitHub URL to create a new file.
 * @param {string} category - The category directory name (e.g., 'security')
 * @param {Object} configOverride - Optional config object to use instead of loading
 * @returns {string} - The GitHub new file URL
 */
export function getCreateUrl(category, configOverride = null) {
  const cfg = configOverride || config;
  if (!cfg) {
    throw new Error('Config not loaded. Call ensureConfig() first or provide configOverride.');
  }

  const GITHUB_BASE = `https://github.com/${cfg.github.owner}/${cfg.github.repo}`;
  const BRANCH = cfg.github.defaultBranch || 'main';

  // Pre-fill filename parameter to put it in the right directory
  // format: https://github.com/owner/repo/new/branch?filename=snippets/category/new-rule.md
  const categoryPath = category ? `snippets/${category}` : 'snippets';
  return `${GITHUB_BASE}/new/${BRANCH}?filename=${categoryPath}/new-rule.md`;
}

/**
 * Generates a GitHub URL to edit the config file.
 * @param {Object} configOverride - Optional config object to use instead of loading
 * @returns {string} - The GitHub edit URL for config.yml
 */
export function getConfigUrl(configOverride = null) {
  const cfg = configOverride || config;
  if (!cfg) {
    throw new Error('Config not loaded. Call ensureConfig() first or provide configOverride.');
  }

  const GITHUB_BASE = `https://github.com/${cfg.github.owner}/${cfg.github.repo}`;
  const BRANCH = cfg.github.defaultBranch || 'main';

  return `${GITHUB_BASE}/edit/${BRANCH}/config.yml`;
}

// Initialize config for build-time usage
export { ensureConfig };
