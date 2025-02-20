import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  headers: async () => {
    return [
      {
        source: "/posts/:id",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=10, stale-while-revalidate=0",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
