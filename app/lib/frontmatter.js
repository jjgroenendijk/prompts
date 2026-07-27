import { load } from 'js-yaml';

const OPENING_DELIMITER = /^---[ \t]*\r?\n/;
const CLOSING_DELIMITER = /^---[ \t]*\r?(\n|$)/m;

/**
 * Split OKF-style YAML frontmatter from a markdown body.
 *
 * Parsing is permissive by design: OKF v0.2 conformance (SPEC section 11) requires
 * consumers to tolerate unknown keys and never reject a document, so malformed YAML
 * degrades to a body-only document instead of throwing.
 *
 * @param {string} raw - Full file contents.
 * @returns {{ data: Object, body: string }}
 */
export function parseFrontmatter(raw) {
  const text = String(raw ?? '');

  if (!OPENING_DELIMITER.test(text)) {
    return { data: {}, body: text };
  }

  const rest = text.replace(OPENING_DELIMITER, '');
  const closingIndex = rest.search(CLOSING_DELIMITER);

  // Unterminated block: treat the whole file as body rather than guessing.
  if (closingIndex === -1) {
    return { data: {}, body: text };
  }

  const block = rest.slice(0, closingIndex);
  const newlineAfterClose = rest.indexOf('\n', closingIndex);
  const body = newlineAfterClose === -1 ? '' : rest.slice(newlineAfterClose + 1);

  let data;
  try {
    data = load(block);
  } catch (error) {
    console.warn(`Invalid YAML frontmatter, reading file as body only: ${error.message}`);
    return { data: {}, body: text };
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { data: {}, body };
  }

  return { data, body };
}

/** Normalize a frontmatter `tags` value to an array of non-empty strings. */
export function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }
  if (typeof tags === 'string') {
    return tags.split(',').map((tag) => tag.trim()).filter(Boolean);
  }
  return [];
}

/**
 * Derive the OKF trust tier from `verified` (SPEC section 5.3).
 * A bare mapping counts as a one-element list.
 */
export function trustTier(verified) {
  if (!verified) return 'unverified';

  const events = Array.isArray(verified) ? verified : [verified];
  const actors = events
    .map((event) => (event && typeof event === 'object' ? String(event.by ?? '') : ''))
    .filter(Boolean);

  if (actors.length === 0) return 'unverified';
  if (actors.some((actor) => actor.startsWith('human:'))) return 'human-reviewed';
  return 'machine-confirmed';
}

/** True when a concept is on or past its `stale_after` date (SPEC section 5.5). */
export function isStale(staleAfter, today = new Date()) {
  if (!staleAfter) return false;

  const deadline = new Date(staleAfter);
  if (Number.isNaN(deadline.getTime())) return false;

  const asDay = (date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return asDay(today) >= asDay(deadline);
}
