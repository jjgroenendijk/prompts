#!/usr/bin/env node
/**
 * Validate the snippets bundle against OKF v0.2 conformance (SPEC section 11).
 *
 * A bundle conforms when every non-reserved .md file has parseable YAML
 * frontmatter carrying a non-empty `type`. The loader is deliberately permissive
 * and degrades malformed frontmatter to body-only, which silently loses metadata,
 * so this check is what turns that into a failure.
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import fg from 'fast-glob';
import { load } from 'js-yaml';

const RESERVED = new Set(['index.md', 'log.md']);
// Bundle documentation, not concepts. Kept out of the loader for the same reason.
const BUNDLE_DOCS = new Set(['AGENTS.md', 'CLAUDE.md']);
const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '../..');
const FRONTMATTER = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*\r?(\n|$)/;

const errors = [];
const files = await fg('snippets/**/*.md', { cwd: ROOT });

for (const file of files.sort()) {
  const filename = file.split('/').pop();
  const raw = await readFile(join(ROOT, file), 'utf8');

  if (BUNDLE_DOCS.has(filename)) continue;

  if (RESERVED.has(filename)) {
    // Only a bundle-root index.md may carry frontmatter (SPEC section 8).
    if (FRONTMATTER.test(raw) && file !== 'snippets/index.md') {
      errors.push(`${file}: ${filename} must not carry frontmatter`);
    }
    continue;
  }

  const match = raw.match(FRONTMATTER);
  if (!match) {
    errors.push(`${file}: missing YAML frontmatter block`);
    continue;
  }

  let data;
  try {
    data = load(match[1]);
  } catch (error) {
    errors.push(`${file}: unparseable frontmatter - ${error.message}`);
    continue;
  }

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    errors.push(`${file}: frontmatter must be a YAML mapping`);
    continue;
  }
  if (!data.type || !String(data.type).trim()) {
    errors.push(`${file}: missing required non-empty 'type'`);
  }
  if (data.status && !['draft', 'stable', 'deprecated'].includes(String(data.status))) {
    errors.push(`${file}: status must be draft, stable, or deprecated`);
  }
}

if (errors.length > 0) {
  console.error('[ERROR] snippets bundle is not OKF conformant:');
  errors.forEach((message) => console.error(`  - ${message}`));
  process.exit(1);
}

console.log(`[INFO] OKF conformance OK, ${files.length} files checked`);
