/**
 * Category tree helpers.
 *
 * Snippets live in arbitrarily nested directories under `snippets/`, so the browser
 * groups them as a tree rather than a flat category map.
 */

/** Sort children by name and snippets by title, depth-first. */
function sortNode(node) {
  node.children.sort((a, b) => a.name.localeCompare(b.name));
  node.snippets.sort((a, b) => a.title.localeCompare(b.title));
  node.children.forEach(sortNode);
}

/**
 * Build a nested category tree from a flat snippet list.
 *
 * @param {Array<Object>} snippets - Snippets carrying `categorySegments`.
 * @returns {Array<{name: string, path: string, snippets: Array, children: Array}>}
 */
export function buildCategoryTree(snippets) {
  const root = { name: '', path: '', snippets: [], children: [] };

  (snippets || []).forEach((snippet) => {
    const segments = snippet.categorySegments?.length
      ? snippet.categorySegments
      : ['uncategorized'];

    let node = root;
    segments.forEach((segment, index) => {
      const path = segments.slice(0, index + 1).join('/');
      let child = node.children.find((candidate) => candidate.name === segment);
      if (!child) {
        child = { name: segment, path, snippets: [], children: [] };
        node.children.push(child);
      }
      node = child;
    });

    node.snippets.push(snippet);
  });

  sortNode(root);
  return root.children;
}

/** Collect every snippet id in a node and its descendants. */
export function collectSnippetIds(node) {
  if (!node) return [];

  const own = node.snippets.map((snippet) => snippet.id);
  const nested = node.children.flatMap((child) => collectSnippetIds(child));
  return [...own, ...nested];
}

/** Total snippet count for a node and its descendants. */
export function countSnippets(node) {
  return collectSnippetIds(node).length;
}
