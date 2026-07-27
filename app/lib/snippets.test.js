/**
 * Unit Tests for snippet mapping
 */

import { describe, it, expect } from 'vitest';
import { toSnippet } from './snippets.js';

const config = {
  github: { owner: 'jjgroenendijk', repo: 'prompts', defaultBranch: 'main' },
};

describe('toSnippet()', () => {
  it('reads OKF frontmatter into snippet fields', () => {
    const raw = [
      '---',
      'type: Rule',
      'title: Max Line Length',
      'description: Cap hand-written lines at 100 chars.',
      'tags: [formatting, lint]',
      'status: draft',
      'verified: { by: human:jjgroenendijk, at: 2026-07-27T00:00:00Z }',
      '---',
      '',
      'Limit every hand-written line to 100 characters.',
    ].join('\n');

    const snippet = toSnippet('../snippets/code/quality/max-line-length.md', raw, config);

    expect(snippet.title).toBe('Max Line Length');
    expect(snippet.description).toBe('Cap hand-written lines at 100 chars.');
    expect(snippet.type).toBe('Rule');
    expect(snippet.tags).toEqual(['formatting', 'lint']);
    expect(snippet.status).toBe('draft');
    expect(snippet.trust).toBe('human-reviewed');
  });

  it('excludes frontmatter from the copyable content', () => {
    const raw = ['---', 'type: Rule', '---', '', 'Body only.'].join('\n');
    const snippet = toSnippet('../snippets/writing/body.md', raw, config);

    expect(snippet.content).toBe('Body only.');
    expect(snippet.content).not.toContain('type: Rule');
  });

  it('derives nested categories from the directory path', () => {
    const snippet = toSnippet('../snippets/code/quality/strict-linting.md', 'Body', config);

    expect(snippet.categorySegments).toEqual(['code', 'quality']);
    expect(snippet.category).toBe('code/quality');
  });

  it('supports single-level categories', () => {
    const snippet = toSnippet('../snippets/writing/no-emojis.md', 'Body', config);

    expect(snippet.categorySegments).toEqual(['writing']);
    expect(snippet.category).toBe('writing');
  });

  it('falls back to the filename for the title and to defaults for metadata', () => {
    const snippet = toSnippet('../snippets/writing/no-emojis.md', 'Body', config);

    expect(snippet.title).toBe('No Emojis');
    expect(snippet.type).toBe('Rule');
    expect(snippet.status).toBe('stable');
    expect(snippet.trust).toBe('unverified');
    expect(snippet.description).toBe('');
  });

  it('returns null when the body is empty', () => {
    const raw = ['---', 'type: Rule', 'title: Empty', '---', '   '].join('\n');
    expect(toSnippet('../snippets/writing/empty.md', raw, config)).toBeNull();
  });

  it('builds a GitHub edit URL from the repo-relative path', () => {
    const snippet = toSnippet('../snippets/writing/no-emojis.md', 'Body', config);

    expect(snippet.editUrl).toBe(
      'https://github.com/jjgroenendijk/prompts/edit/main/snippets/writing/no-emojis.md'
    );
  });
});
