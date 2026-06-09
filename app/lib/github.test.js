/**
 * Unit Tests for GitHub URL helpers
 */

import { describe, it, expect } from 'vitest';
import { getEditUrl, getCreateUrl, getConfigUrl } from './github.js';

const cfg = {
  github: { owner: 'jjgroenendijk', repo: 'prompts', defaultBranch: 'main' },
};

describe('getEditUrl()', () => {
  it('builds an edit URL from a relative snippet path', () => {
    expect(getEditUrl('snippets/git-commits/conventional-commits.md', cfg)).toBe(
      'https://github.com/jjgroenendijk/prompts/edit/main/snippets/git-commits/conventional-commits.md'
    );
  });

  it('strips a leading slash from the file path', () => {
    expect(getEditUrl('/config.yml', cfg)).toBe(
      'https://github.com/jjgroenendijk/prompts/edit/main/config.yml'
    );
  });

  it('strips a leading ../ produced during the build', () => {
    expect(getEditUrl('../snippets/writing-style/clarity.md', cfg)).toBe(
      'https://github.com/jjgroenendijk/prompts/edit/main/snippets/writing-style/clarity.md'
    );
  });

  it('falls back to the main branch when defaultBranch is missing', () => {
    const noBranch = { github: { owner: 'a', repo: 'b' } };
    expect(getEditUrl('file.md', noBranch)).toBe(
      'https://github.com/a/b/edit/main/file.md'
    );
  });

  it('honours a non-default branch', () => {
    const branched = { github: { owner: 'a', repo: 'b', defaultBranch: 'develop' } };
    expect(getEditUrl('file.md', branched)).toBe(
      'https://github.com/a/b/edit/develop/file.md'
    );
  });

  it('throws when no config is available', () => {
    expect(() => getEditUrl('file.md')).toThrow('Config not loaded');
  });
});

describe('getCreateUrl()', () => {
  it('pre-fills a filename inside the given category', () => {
    expect(getCreateUrl('security', cfg)).toBe(
      'https://github.com/jjgroenendijk/prompts/new/main?filename=snippets/security/new-rule.md'
    );
  });

  it('falls back to the snippets root when no category is given', () => {
    expect(getCreateUrl('', cfg)).toBe(
      'https://github.com/jjgroenendijk/prompts/new/main?filename=snippets/new-rule.md'
    );
  });

  it('throws when no config is available', () => {
    expect(() => getCreateUrl('security')).toThrow('Config not loaded');
  });
});

describe('getConfigUrl()', () => {
  it('builds an edit URL for config.yml', () => {
    expect(getConfigUrl(cfg)).toBe(
      'https://github.com/jjgroenendijk/prompts/edit/main/config.yml'
    );
  });

  it('throws when no config is available', () => {
    expect(() => getConfigUrl()).toThrow('Config not loaded');
  });
});
