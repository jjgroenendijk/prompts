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
 * Shared by the preview pane and the copy button so the rendered text, the
 * copied text, and the token estimate are always the same string.
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

/**
 * Rough token count for a context budget meter.
 *
 * Deliberately a heuristic: this is a static export with no tokenizer, and the
 * exact count depends on the model reading the file. Roughly four characters
 * per token is close enough to signal when a CLAUDE.md is getting heavy.
 */
export function estimateTokens(text) {
  const value = String(text ?? '').trim();
  if (!value) return 0;
  return Math.ceil(value.length / 4);
}

/** Compact token label for the meter, e.g. `~840` or `~1.2k`. */
export function formatTokenCount(tokens) {
  if (tokens < 1000) return `~${tokens}`;
  return `~${(tokens / 1000).toFixed(1)}k`;
}
