import { readFile } from 'fs/promises';
import { join } from 'path';
import fg from 'fast-glob';
import { getEditUrl } from './github.js';
import { formatTitle } from './utils.js';

export async function getAllSnippets(config) {
  // Use fast-glob to find all markdown files in snippets directory
  // Pattern: ../snippets/**/*.md
  const pattern = '../snippets/**/*.md';

  try {
    const files = await fg(pattern, { cwd: process.cwd() });

    const snippetPromises = files.map(async (filePath) => {
      // filePath is relative to CWD, e.g., "../snippets/security/input-validation.md"

      // Read content
      const absolutePath = join(process.cwd(), filePath);
      let content = '';
      try {
        content = await readFile(absolutePath, 'utf8');
      } catch (e) {
        console.warn(`Could not read file: ${filePath}`, e);
        return null;
      }

      // Skip empty files
      if (!content.trim()) {
         return null;
      }

      // Extract category
      // Path is snippets/category/filename.md or ../snippets/category/filename.md
      const normalizedPath = filePath.replace(/\\/g, '/');
      const parts = normalizedPath.split('/');

      // Find where 'snippets' is in the path
      const snippetsIndex = parts.indexOf('snippets');

      let category = 'uncategorized';
      // If 'snippets' is found and there is a segment after it, and that segment is not the filename
      if (snippetsIndex !== -1 && snippetsIndex + 1 < parts.length - 1) {
        category = parts[snippetsIndex + 1];
      }

      const filename = parts[parts.length - 1];

      // Generate title
      const title = formatTitle(filename);

      // ID is the filePath
      const id = filePath;

      return {
        id,
        title,
        category,
        content, // Raw content, no frontmatter
        filePath,
        editUrl: getEditUrl(filePath, config)
      };
    });

    const snippets = await Promise.all(snippetPromises);
    return snippets.filter(item => item !== null);
  } catch (e) {
    console.error('Error scanning snippets:', e);
    return [];
  }
}
