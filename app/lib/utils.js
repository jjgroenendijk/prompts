import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Combine class names with clsx and merge conflicting Tailwind classes. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Copy text to the clipboard, returning whether it succeeded. */
export async function copyToClipboard(text) {
  const value = String(text ?? '');

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }

    // Fallback for browsers without the Clipboard API.
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

const ACRONYMS = new Set([
  'API', 'HTTP', 'HTTPS', 'URL', 'HTML', 'CSS', 'JS', 'ID', 'UI', 'UX', 'SQL', 'JSON', 'XML',
  'CI', 'CD', 'LOC',
]);

/** Format a filename (kebab/snake case, optional .md) to Title Case. */
export function formatTitle(filename) {
  if (!filename) return '';

  return String(filename)
    .replace(/\.md$/i, '')
    .replace(/[-_]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      const upper = word.toUpperCase();
      if (ACRONYMS.has(upper)) return upper;
      // Preserve existing acronyms and words that start with a number.
      if ((word === upper && word.length > 1) || /^\d/.test(word)) return word;
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}
