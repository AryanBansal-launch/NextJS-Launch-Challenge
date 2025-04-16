import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  generateBuildId: () => {    
    return process.env.CONTENTSTACK_LAUNCH_DEPLOYMENT_UID || null;
  },
  async headers() {
    return [
      {
        source: '/blog',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400',
          },
        ],  
      },
    ];
  },
};

export default nextConfig;
