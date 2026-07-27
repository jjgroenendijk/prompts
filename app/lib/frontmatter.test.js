/**
 * Unit Tests for OKF frontmatter parsing
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { parseFrontmatter, normalizeTags, trustTier, isStale } from './frontmatter.js';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('parseFrontmatter()', () => {
  it('splits frontmatter from body', () => {
    const raw = ['---', 'type: Rule', 'title: Max Line Length', '---', '', 'Cap lines at 100.'].join('\n');
    const { data, body } = parseFrontmatter(raw);

    expect(data.type).toBe('Rule');
    expect(data.title).toBe('Max Line Length');
    expect(body.trim()).toBe('Cap lines at 100.');
  });

  it('returns the whole file as body when there is no frontmatter', () => {
    const raw = 'Just a rule with no metadata.';
    expect(parseFrontmatter(raw)).toEqual({ data: {}, body: raw });
  });

  it('keeps body markdown containing --- intact', () => {
    const raw = ['---', 'type: Rule', '---', '', 'Above', '', '---', '', 'Below'].join('\n');
    const { data, body } = parseFrontmatter(raw);

    expect(data.type).toBe('Rule');
    expect(body).toContain('Above');
    expect(body).toContain('Below');
  });

  it('parses list and nested mapping values', () => {
    const raw = [
      '---',
      'type: Rule',
      'tags: [formatting, lint]',
      'generated: { by: human:jjgroenendijk, at: 2026-07-27T00:00:00Z }',
      '---',
      'Body',
    ].join('\n');
    const { data } = parseFrontmatter(raw);

    expect(data.tags).toEqual(['formatting', 'lint']);
    expect(data.generated.by).toBe('human:jjgroenendijk');
  });

  it('degrades to body-only on malformed YAML instead of throwing', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const raw = ['---', 'type: [unclosed', '---', 'Body'].join('\n');

    const { data, body } = parseFrontmatter(raw);

    expect(data).toEqual({});
    expect(body).toBe(raw);
    expect(console.warn).toHaveBeenCalled();
  });

  it('treats an unterminated block as body', () => {
    const raw = ['---', 'type: Rule', 'Body without a closing delimiter'].join('\n');
    expect(parseFrontmatter(raw)).toEqual({ data: {}, body: raw });
  });

  it('handles an empty frontmatter block', () => {
    const raw = ['---', '---', 'Body'].join('\n');
    const { data, body } = parseFrontmatter(raw);

    expect(data).toEqual({});
    expect(body).toBe('Body');
  });

  it('ignores non-mapping frontmatter', () => {
    const raw = ['---', '- one', '- two', '---', 'Body'].join('\n');
    expect(parseFrontmatter(raw).data).toEqual({});
  });

  it('returns empty results for null input', () => {
    expect(parseFrontmatter(null)).toEqual({ data: {}, body: '' });
  });
});

describe('normalizeTags()', () => {
  it('passes through a list', () => {
    expect(normalizeTags(['a', 'b'])).toEqual(['a', 'b']);
  });

  it('splits a comma separated string', () => {
    expect(normalizeTags('a, b')).toEqual(['a', 'b']);
  });

  it('drops empty entries', () => {
    expect(normalizeTags(['a', '', '  '])).toEqual(['a']);
  });

  it('returns an empty array when absent', () => {
    expect(normalizeTags(undefined)).toEqual([]);
  });
});

describe('trustTier()', () => {
  it('reports unverified when the key is absent', () => {
    expect(trustTier(undefined)).toBe('unverified');
  });

  it('treats a bare mapping as a one-element list', () => {
    expect(trustTier({ by: 'human:jjgroenendijk', at: '2026-07-27T00:00:00Z' })).toBe('human-reviewed');
  });

  it('reports machine-confirmed for non-human actors', () => {
    expect(trustTier([{ by: 'process:ci', at: '2026-07-27T00:00:00Z' }])).toBe('machine-confirmed');
  });

  it('promotes to human-reviewed when any actor is human', () => {
    const verified = [{ by: 'process:ci' }, { by: 'human:jjgroenendijk' }];
    expect(trustTier(verified)).toBe('human-reviewed');
  });
});

describe('isStale()', () => {
  it('is false without a date', () => {
    expect(isStale(null)).toBe(false);
  });

  it('is true on the stale_after day', () => {
    expect(isStale('2026-07-27', new Date('2026-07-27T00:00:00Z'))).toBe(true);
  });

  it('is false before the stale_after day', () => {
    expect(isStale('2026-07-27', new Date('2026-07-26T00:00:00Z'))).toBe(false);
  });

  it('is false for an unparseable date', () => {
    expect(isStale('not-a-date')).toBe(false);
  });
});
