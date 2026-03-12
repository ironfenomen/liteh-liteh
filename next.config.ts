import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "prodoctorov.ru", pathname: "/upload/**" },
      { protocol: "https", hostname: "amadeyakids.ru", pathname: "/**" },
      { protocol: "https", hostname: "www.amadeyadetox26.ru", pathname: "/**" },
      { protocol: "https", hostname: "amadeya26.ru", pathname: "/**" },
    ],
  },
};

export default nextConfig;
