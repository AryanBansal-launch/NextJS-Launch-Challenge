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
        source: '/shuffle-products',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, s-maxage=86400',
          },
        ],  
      },
    ];
  },
};

export default nextConfig;
