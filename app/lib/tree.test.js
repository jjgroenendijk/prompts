/**
 * Unit Tests for the category tree
 */

import { describe, it, expect } from 'vitest';
import { buildCategoryTree, collectSnippetIds, countSnippets } from './tree.js';

const snippet = (id, segments, title = id) => ({
  id,
  title,
  categorySegments: segments,
});

describe('buildCategoryTree()', () => {
  it('nests snippets by category segments', () => {
    const tree = buildCategoryTree([
      snippet('a', ['code', 'quality']),
      snippet('b', ['code', 'scripts']),
      snippet('c', ['writing']),
    ]);

    expect(tree.map((node) => node.name)).toEqual(['code', 'writing']);

    const code = tree[0];
    expect(code.snippets).toEqual([]);
    expect(code.children.map((node) => node.path)).toEqual(['code/quality', 'code/scripts']);
    expect(code.children[0].snippets.map((s) => s.id)).toEqual(['a']);
  });

  it('keeps snippets that sit directly in a parent category', () => {
    const tree = buildCategoryTree([
      snippet('parent', ['code']),
      snippet('child', ['code', 'quality']),
    ]);

    expect(tree[0].snippets.map((s) => s.id)).toEqual(['parent']);
    expect(tree[0].children[0].snippets.map((s) => s.id)).toEqual(['child']);
  });

  it('sorts categories and snippets by name', () => {
    const tree = buildCategoryTree([
      snippet('b', ['writing'], 'Beta'),
      snippet('a', ['writing'], 'Alpha'),
      snippet('c', ['code'], 'Gamma'),
    ]);

    expect(tree.map((node) => node.name)).toEqual(['code', 'writing']);
    expect(tree[1].snippets.map((s) => s.title)).toEqual(['Alpha', 'Beta']);
  });

  it('falls back to uncategorized for snippets with no segments', () => {
    const tree = buildCategoryTree([snippet('loose', [])]);
    expect(tree[0].name).toBe('uncategorized');
  });

  it('returns an empty array for no snippets', () => {
    expect(buildCategoryTree([])).toEqual([]);
    expect(buildCategoryTree(undefined)).toEqual([]);
  });
});

describe('collectSnippetIds()', () => {
  it('collects ids across descendants', () => {
    const tree = buildCategoryTree([
      snippet('a', ['code', 'quality']),
      snippet('b', ['code', 'scripts']),
      snippet('c', ['code']),
    ]);

    expect(collectSnippetIds(tree[0]).sort()).toEqual(['a', 'b', 'c']);
    expect(countSnippets(tree[0])).toBe(3);
  });

  it('returns an empty array for a missing node', () => {
    expect(collectSnippetIds(null)).toEqual([]);
  });
});
