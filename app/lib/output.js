import { formatTitle } from './utils.js';

/** Render a nested category path as a heading, e.g. `code/quality` -> `Code / Quality`. */
export function formatCategoryTitle(category) {
  return String(category ?? '')
    .split('/')
    .filter(Boolean)
    .map((segment) => formatTitle(segment))
    .join(' / ');
}

/**
 * Assemble the copyable rules document from the selected snippets.
 *
 * Shared by the preview pane and the copy button so the rendered text and the
 * copied text are always the same string.
 *
 * @param {Array<Object>} selectedSnippets
 * @param {{separator?: string, includeTitle?: boolean}} options
 * @returns {string}
 */
export function buildOutput(selectedSnippets, { separator = '\n', includeTitle = true } = {}) {
  const groups = new Map();

  (selectedSnippets || []).forEach((snippet) => {
    if (!groups.has(snippet.category)) groups.set(snippet.category, []);
    groups.get(snippet.category).push(snippet);
  });

  const sections = [...groups.entries()].map(([category, snippets]) => {
    const body = snippets.map((snippet) => snippet.content.trim()).join(separator);
    return includeTitle ? `## ${formatCategoryTitle(category)}\n\n${body}` : body;
  });

  return sections.join('\n\n');
}
