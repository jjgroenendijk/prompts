/**
 * Unit Tests for output assembly and the token estimate
 */

import { describe, it, expect } from 'vitest';
import { buildOutput, formatCategoryTitle, estimateTokens, formatTokenCount } from './output.js';

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

describe('estimateTokens()', () => {
  it('approximates four characters per token', () => {
    expect(estimateTokens('12345678')).toBe(2);
  });

  it('rounds partial tokens up', () => {
    expect(estimateTokens('123')).toBe(1);
  });

  it('is zero for empty or whitespace input', () => {
    expect(estimateTokens('')).toBe(0);
    expect(estimateTokens('   ')).toBe(0);
    expect(estimateTokens(null)).toBe(0);
  });
});

describe('formatTokenCount()', () => {
  it('shows exact counts below 1000', () => {
    expect(formatTokenCount(840)).toBe('~840');
  });

  it('abbreviates thousands', () => {
    expect(formatTokenCount(1234)).toBe('~1.2k');
  });
});
