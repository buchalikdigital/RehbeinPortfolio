import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/RehbeinPortfolio",
  assetPrefix: "/RehbeinPortfolio/",
};

export default nextConfig;
