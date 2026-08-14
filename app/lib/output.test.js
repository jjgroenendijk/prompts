/**
 * Unit Tests for output assembly
 */

import { describe, it, expect } from 'vitest';
import { buildOutput, formatCategoryTitle } from './output.js';

const snippet = (id, category, content) => ({ id, category, content });

describe('buildOutput()', () => {
  it('groups snippets under category headings', () => {
    const output = buildOutput([
      snippet('a', 'writing', 'No emojis.'),
      snippet('b', 'writing', 'No bold.'),
    ]);

    expect(output).toBe('## Writing\n\nNo emojis.\nNo bold.');
  });

  it('renders nested categories as a readable heading', () => {
    const output = buildOutput([snippet('a', 'code/quality', 'Strict lint.')]);
    expect(output).toBe('## Code / Quality\n\nStrict lint.');
  });

  it('omits headings when includeTitle is false', () => {
    const output = buildOutput([snippet('a', 'writing', 'No emojis.')], { includeTitle: false });
    expect(output).toBe('No emojis.');
  });

  it('honors a custom separator within a category', () => {
    const output = buildOutput(
      [snippet('a', 'writing', 'One.'), snippet('b', 'writing', 'Two.')],
      { separator: '\n\n', includeTitle: false }
    );

    expect(output).toBe('One.\n\nTwo.');
  });

  it('separates categories with a blank line', () => {
    const output = buildOutput([
      snippet('a', 'writing', 'One.'),
      snippet('b', 'code/quality', 'Two.'),
    ]);

    expect(output).toBe('## Writing\n\nOne.\n\n## Code / Quality\n\nTwo.');
  });

  it('never emits frontmatter delimiters for body-only content', () => {
    const output = buildOutput([snippet('a', 'writing', 'Body only.')]);
    expect(output).not.toContain('---');
  });

  it('returns an empty string for no selection', () => {
    expect(buildOutput([])).toBe('');
    expect(buildOutput(undefined)).toBe('');
  });
});

describe('formatCategoryTitle()', () => {
  it('formats each segment', () => {
    expect(formatCategoryTitle('knowledge/okf')).toBe('Knowledge / OKF');
  });

  it('handles a single segment', () => {
    expect(formatCategoryTitle('agents-md')).toBe('Agents Md');
  });

  it('returns an empty string for empty input', () => {
    expect(formatCategoryTitle('')).toBe('');
  });
});
