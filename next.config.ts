import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/fintech-requisitions',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
