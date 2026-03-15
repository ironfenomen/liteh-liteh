import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      { protocol: "https", hostname: "prodoctorov.ru", pathname: "/upload/**" },
      { protocol: "https", hostname: "amadeyakids.ru", pathname: "/**" },
      { protocol: "https", hostname: "www.amadeyadetox26.ru", pathname: "/**" },
      { protocol: "https", hostname: "amadeya26.ru", pathname: "/**" },
    ],
  },
  // Cache-Control: страницы и прочие ответы — revalidate; статика _next/static — долгий кеш (правило для статики идёт последним, чтобы перекрыть общее).
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Редиректы: www -> основной домен; HTTP -> HTTPS (для главного адреса и совместимости с Вебмастером).
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
