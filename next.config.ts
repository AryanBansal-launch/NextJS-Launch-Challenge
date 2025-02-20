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
            value: "max-age=0, s-maxage=10, stale-while-revalidate",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
