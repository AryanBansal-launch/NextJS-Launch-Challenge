import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  generateBuildId: () => {    
    return process.env.CONTENTSTACK_LAUNCH_DEPLOYMENT_UID || null;
  },
};

export default nextConfig;
