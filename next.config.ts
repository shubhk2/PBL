import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,  // Enable Next.js App Router
  } as any,  // Bypass type checking for experimental properties
  pageExtensions: ["ts", "tsx"], // Ensure Next.js looks for .tsx files
};

export default nextConfig;
