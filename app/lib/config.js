import { readFile, access } from 'fs/promises';
import { join } from 'path';
import { load } from 'js-yaml';
import { z } from 'zod';

const CONFIG_PATH = join(process.cwd(), '../config.yml');

// Define config schema with zod
const configSchema = z.object({
  site: z.object({
    title: z.string(),
    description: z.string().optional(),
    baseUrl: z.string(),
    basePath: z.string().optional(),
  }),
  github: z.object({
    owner: z.string(),
    repo: z.string(),
    defaultBranch: z.string().default('main'),
  }),
  ui: z.object({
    previewCharLimit: z.number().default(400),
    searchPlaceholder: z.string().default('Search rules...'),
    copyButtonText: z.string().default('Copy Selected Rules'),
    addButtonText: z.string().default('Add New Rule'),
    configButtonText: z.string().default('Settings'),
  }).optional(),
  rules: z.object({
    separator: z.string().default('\n\n---\n\n'),
    includeTitle: z.boolean().default(true),
  }).optional(),
});

async function loadConfig() {
  try {
    // Check if file exists
    await access(CONFIG_PATH);

    const fileContents = await readFile(CONFIG_PATH, 'utf8');
    const rawConfig = load(fileContents);

    // Validate config with zod
    const config = configSchema.parse(rawConfig);

    // Derive basePath from baseUrl
    try {
      const url = new URL(config.site.baseUrl);
      // Extract pathname. If it is just '/', basePath should be empty string for Next.js
      let basePath = url.pathname;
      if (basePath === '/') {
        basePath = '';
      } else if (basePath.endsWith('/')) {
        basePath = basePath.slice(0, -1);
      }
      config.site.basePath = basePath;
    } catch (e) {
      console.warn('Invalid baseUrl in config, defaulting basePath to empty string.');
      config.site.basePath = '';
    }

    return config;
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error('Config validation failed:');
      console.error(e.errors.map(err => `  - ${err.path.join('.')}: ${err.message}`).join('\n'));
      throw new Error('Invalid config.yml structure');
    }
    console.error('Error loading config.yml:', e.message);
    throw e;
  }
}

// Export a getter function to avoid eager loading
export async function getConfig() {
  return await loadConfig();
}

// For backward compatibility during migration, export a default that will be loaded at build time
let cachedConfig = null;

export async function getCachedConfig() {
  if (!cachedConfig) {
    cachedConfig = await loadConfig();
  }
  return cachedConfig;
}
