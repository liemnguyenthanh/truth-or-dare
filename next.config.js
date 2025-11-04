/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // Full Static Site Generation (SSG)

  // SEO optimizations
  compress: true,

  // Image optimization for static export
  images: {
    unoptimized: true, // Required for static export
  },

  // Trailing slash for static export
  trailingSlash: true,

  // Thêm cấu hình webpack để tối ưu bundle size
  webpack: (config, { dev, isServer }) => {
    // Chỉ áp dụng cho build production ở client-side
    if (!dev && !isServer) {
      // Tối ưu hóa bundle size
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](@react|react|next|framer-motion)/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.+?)(?:[\\/]|$)/
              )[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 30,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
