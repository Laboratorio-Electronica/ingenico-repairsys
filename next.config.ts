import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // ¡activa AVIF y WebP!
    remotePatterns: [
      { protocol: 'https', hostname: 'imgur.com' },
    ],
  },
};

export default nextConfig;
