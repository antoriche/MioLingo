import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Turbopack config (empty to silence warning)
  turbopack: {},
  // Static export for client-side PWA
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

// Note: next-pwa doesn't fully support Next.js 16 yet
// We'll configure PWA manually with Workbox in a later step
export default nextConfig;


