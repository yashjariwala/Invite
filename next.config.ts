import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_PAGES === "true" || process.env.GITHUB_ACTIONS === "true";
const repoName = "Invite";
const basePath = isGithubActions ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
