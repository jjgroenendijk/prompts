import { readFile } from 'fs/promises';
import { join } from 'path';
import fg from 'fast-glob';
import { getEditUrl } from './github.js';
import { formatTitle } from './utils.js';
import { parseFrontmatter, normalizeTags, trustTier, isStale } from './frontmatter.js';

// OKF reserves these filenames at every level of a bundle (SPEC section 3.1).
// They describe the bundle, so they are not concept documents.
const RESERVED_FILENAMES = new Set(['index.md', 'log.md']);

const DEFAULT_TYPE = 'Rule';
const DEFAULT_STATUS = 'stable';

/**
 * Build a snippet object from one concept document.
 * Exported for unit tests so the mapping can be checked without touching disk.
 */
export function toSnippet(filePath, raw, config) {
  const normalizedPath = filePath.replace(/\\/g, '/');
  const parts = normalizedPath.split('/');
  const filename = parts[parts.length - 1];

  // Category is every directory between `snippets/` and the file, so nesting
  // deeper than one level becomes a nested category path (e.g. `code/quality`).
  const snippetsIndex = parts.indexOf('snippets');
  const categorySegments =
    snippetsIndex === -1 ? [] : parts.slice(snippetsIndex + 1, parts.length - 1);

  const { data, body } = parseFrontmatter(raw);
  const content = body.trim();

  if (!content) return null;

  return {
    id: normalizedPath,
    title: data.title ? String(data.title) : formatTitle(filename),
    description: data.description ? String(data.description) : '',
    type: data.type ? String(data.type) : DEFAULT_TYPE,
    tags: normalizeTags(data.tags),
    status: data.status ? String(data.status) : DEFAULT_STATUS,
    staleAfter: data.stale_after ? String(data.stale_after) : null,
    stale: isStale(data.stale_after),
    trust: trustTier(data.verified),
    sources: Array.isArray(data.sources) ? data.sources : [],
    category: categorySegments.join('/') || 'uncategorized',
    categorySegments,
    content,
    filePath,
    editUrl: getEditUrl(filePath, config),
  };
}

export async function getAllSnippets(config) {
  // Use fast-glob to find all markdown files in snippets directory
  // Pattern: ../snippets/**/*.md
  const pattern = '../snippets/**/*.md';

  try {
    const files = await fg(pattern, { cwd: process.cwd() });

    const snippetPromises = files.map(async (filePath) => {
      const filename = filePath.replace(/\\/g, '/').split('/').pop();
      if (RESERVED_FILENAMES.has(filename)) return null;

      const absolutePath = join(process.cwd(), filePath);
      let raw = '';
      try {
        raw = await readFile(absolutePath, 'utf8');
      } catch (e) {
        console.warn(`Could not read file: ${filePath}`, e);
        return null;
      }

      // Skip empty files
      if (!raw.trim()) return null;

      return toSnippet(filePath, raw, config);
    });

    const snippets = await Promise.all(snippetPromises);
    return snippets.filter((item) => item !== null);
  } catch (e) {
    console.error('Error scanning snippets:', e);
    return [];
  }
}
