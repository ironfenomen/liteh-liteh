import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      { protocol: "https", hostname: "prodoctorov.ru", pathname: "/upload/**" },
      { protocol: "https", hostname: "amadeyakids.ru", pathname: "/**" },
      { protocol: "https", hostname: "www.amadeyadetox26.ru", pathname: "/**" },
      { protocol: "https", hostname: "amadeya26.ru", pathname: "/**" },
    ],
  },
  async redirects() {
    const canonical = "https://liteh26.ru";
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.liteh26.ru" }],
        destination: `${canonical}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          { type: "host", value: "liteh26.ru" },
          { type: "header", key: "x-forwarded-proto", value: "http" },
        ],
        destination: `${canonical}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
