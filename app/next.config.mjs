import config from './lib/config.js';

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