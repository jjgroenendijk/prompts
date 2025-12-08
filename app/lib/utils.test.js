/**
 * Unit Tests for Utility Functions
 */

import { describe, it, expect } from 'vitest';
import { truncateText, formatTitle } from './utils.js';

describe('truncateText()', () => {
  it('returns original text when under limit', () => {
    expect(truncateText('Hello World', 20)).toBe('Hello World');
  });

  it('truncates text over limit at word boundary', () => {
    expect(truncateText('This is a long text that needs truncation', 20)).toBe('This is a long text...');
  });

  it('returns original text when exactly at limit', () => {
    expect(truncateText('Exact length text!!', 19)).toBe('Exact length text!!');
  });

  it('returns empty string for empty input', () => {
    expect(truncateText('', 10)).toBe('');
  });

  it('returns empty string for null value', () => {
    expect(truncateText(null, 10)).toBe('');
  });

  it('returns empty string for undefined value', () => {
    expect(truncateText(undefined, 10)).toBe('');
  });

  it('works correctly with very short limit', () => {
    expect(truncateText('Hello World', 5)).toBe('Hello...');
  });

  it('truncates single long word at limit', () => {
    expect(truncateText('Supercalifragilisticexpialidocious', 10)).toBe('Supercalif...');
  });

  it('returns original text for zero limit', () => {
    expect(truncateText('Hello World', 0)).toBe('Hello World');
  });

  it('returns original text for negative limit', () => {
    expect(truncateText('Hello World', -5)).toBe('Hello World');
  });
});

describe('formatTitle()', () => {
  it('converts kebab-case to Title Case', () => {
    expect(formatTitle('my-awesome-prompt')).toBe('My Awesome Prompt');
  });

  it('removes .md extension', () => {
    expect(formatTitle('readme.md')).toBe('Readme');
  });

  it('converts kebab-case and removes .md extension', () => {
    expect(formatTitle('my-project-readme.md')).toBe('My Project Readme');
  });

  it('converts snake_case to Title Case', () => {
    expect(formatTitle('my_awesome_prompt')).toBe('My Awesome Prompt');
  });

  it('handles mixed separators', () => {
    expect(formatTitle('my-awesome_prompt')).toBe('My Awesome Prompt');
  });

  it('handles numbers correctly', () => {
    expect(formatTitle('version-2-update')).toBe('Version 2 Update');
  });

  it('handles leading numbers', () => {
    expect(formatTitle('2024-report')).toBe('2024 Report');
  });

  it('recognizes common acronyms (API)', () => {
    expect(formatTitle('api-documentation')).toBe('API Documentation');
  });

  it('recognizes multiple acronyms', () => {
    expect(formatTitle('html-css-guide')).toBe('HTML CSS Guide');
  });

  it('returns empty string for empty input', () => {
    expect(formatTitle('')).toBe('');
  });

  it('returns empty string for null value', () => {
    expect(formatTitle(null)).toBe('');
  });

  it('returns empty string for undefined value', () => {
    expect(formatTitle(undefined)).toBe('');
  });

  it('returns empty string for only extension', () => {
    expect(formatTitle('.md')).toBe('');
  });

  it('handles version numbers', () => {
    expect(formatTitle('my-prompt-v1.2')).toBe('My Prompt V1.2');
  });

  it('handles multiple consecutive separators', () => {
    expect(formatTitle('my--awesome---prompt')).toBe('My Awesome Prompt');
  });

  it('removes .MD extension (uppercase)', () => {
    expect(formatTitle('file.MD')).toBe('File');
  });

  it('removes .Md extension (mixed case)', () => {
    expect(formatTitle('file.Md')).toBe('File');
  });
});
