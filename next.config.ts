import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix for Windows dev environment: enable polling so file modifications trigger Fast Refresh instantly
  watchOptions: {
    pollIntervalMs: 800,
  },
  turbopack: {},
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 800,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
