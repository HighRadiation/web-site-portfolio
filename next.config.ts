import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  ...(process.env.NODE_ENV === 'production' && {
    redirects: async () => [
      { source: '/docs', destination: '/', permanent: false }
    ]
  })
};

export default nextConfig;
