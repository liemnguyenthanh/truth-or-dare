/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,
  output: 'export',

  // SEO optimizations
  compress: true,

  // Image optimization for static export
  images: {
    unoptimized: true, // Required for static export
  },

  // Trailing slash for static export
  trailingSlash: true,
};

module.exports = nextConfig;
