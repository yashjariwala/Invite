/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/Invite",
  assetPrefix: "/Invite",
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
