const config = require('./config');

const GITHUB_BASE = `https://github.com/${config.github.owner}/${config.github.repo}`;
const BRANCH = config.github.defaultBranch || 'main';

/**
 * Generates a GitHub URL to edit a file.
 * @param {string} filePath - Relative path to the file (e.g., 'snippets/security/rule.md')
 * @returns {string} - The GitHub edit URL
 */
function getEditUrl(filePath) {
  // Ensure filePath doesn't start with /
  const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
  return `${GITHUB_BASE}/edit/${BRANCH}/${cleanPath}`;
}

/**
 * Generates a GitHub URL to create a new file.
 * @param {string} category - The category directory name (e.g., 'security')
 * @returns {string} - The GitHub new file URL
 */
function getCreateUrl(category) {
  // Pre-fill filename parameter to put it in the right directory
  // format: https://github.com/owner/repo/new/branch?filename=snippets/category/new-rule.md
  const categoryPath = category ? `snippets/${category}` : 'snippets';
  return `${GITHUB_BASE}/new/${BRANCH}?filename=${categoryPath}/new-rule.md`;
}

/**
 * Generates a GitHub URL to edit the config file.
 * @returns {string} - The GitHub edit URL for config.yml
 */
function getConfigUrl() {
  return `${GITHUB_BASE}/edit/${BRANCH}/config.yml`;
}

module.exports = {
  getEditUrl,
  getCreateUrl,
  getConfigUrl
};
