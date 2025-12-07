const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONFIG_PATH = path.join(process.cwd(), '../config.yml');

function validateConfig(config) {
  const required = [
    'site.title',
    'site.baseUrl',
    'github.owner',
    'github.repo'
  ];

  for (const field of required) {
    const value = field.split('.').reduce((obj, key) => obj && obj[key], config);
    if (!value) {
      throw new Error(`Missing required config field: ${field}`);
    }
  }
}

function loadConfig() {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      throw new Error(`Config file not found at ${CONFIG_PATH}`);
    }

    const fileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
    const config = yaml.load(fileContents);

    validateConfig(config);

    // Derive basePath
    if (config.site && config.site.baseUrl) {
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
    } else {
      config.site = config.site || {};
      config.site.basePath = '';
    }

    return config;
  } catch (e) {
    console.error('Error loading config.yml:', e.message);
    throw e;
  }
}

module.exports = loadConfig();
