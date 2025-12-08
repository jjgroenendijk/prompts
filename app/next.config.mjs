import { getConfig } from './lib/config.js';

// Use top-level await to load config asynchronously
const config = await getConfig();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: config.site.basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;