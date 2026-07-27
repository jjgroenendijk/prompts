#!/usr/bin/env node
/**
 * Generate OKF index.md files for the snippets bundle (SPEC section 8).
 *
 * Each directory gets a listing of its concepts and subdirectories so a human or
 * an agent can see what is available before opening individual documents. The
 * bundle root additionally declares the spec version (SPEC section 12).
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { parseFrontmatter } from '../lib/frontmatter.js';
import { formatTitle } from '../lib/utils.js';

const OKF_VERSION = '0.2';
const RESERVED = new Set(['index.md', 'log.md']);
const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '../../snippets');

async function readDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  const directories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .filter((entry) => !RESERVED.has(entry.name))
    .map((entry) => entry.name)
    .sort();

  return { directories, files };
}

async function describe(path, filename) {
  const { data } = parseFrontmatter(await readFile(join(path, filename), 'utf8'));
  return {
    link: filename,
    title: data.title || formatTitle(filename),
    description: data.description || '',
  };
}

/** Write one directory's index.md and recurse. Returns the directory's description. */
async function buildIndex(dir) {
  const { directories, files } = await readDirectory(dir);
  const isRoot = dir === ROOT;
  const name = relative(ROOT, dir) || 'snippets';

  const children = [];
  for (const child of directories) {
    children.push({ link: `${child}/`, ...(await buildIndex(join(dir, child))) });
  }

  const concepts = [];
  for (const file of files) {
    concepts.push(await describe(dir, file));
  }

  const entry = (item) =>
    item.description
      ? `* [${item.title}](${item.link}) - ${item.description}`
      : `* [${item.title}](${item.link})`;

  const sections = [];
  if (isRoot) {
    sections.push(`---\nokf_version: "${OKF_VERSION}"\n---\n`);
  }
  sections.push(`# ${formatTitle(name.split('/').pop())}\n`);

  if (children.length > 0) {
    sections.push(`${children.map(entry).join('\n')}\n`);
  }
  if (concepts.length > 0) {
    if (children.length > 0) sections.push('# Concepts\n');
    sections.push(`${concepts.map(entry).join('\n')}\n`);
  }

  await writeFile(join(dir, 'index.md'), `${sections.join('\n')}`, 'utf8');

  const count = concepts.length + children.length;
  return {
    title: formatTitle(name.split('/').pop()),
    description: `${count} ${count === 1 ? 'entry' : 'entries'}`,
  };
}

await buildIndex(ROOT);
console.log('[INFO] generated index.md files under snippets/');
