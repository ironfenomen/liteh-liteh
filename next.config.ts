import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
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
  // Cache-Control: страницы — must-revalidate; public/ без версии в имени — 1 день + revalidate; _next/static (хеш в пути) — immutable.
  // Порядок важен: при совпадении нескольких правил применяется последнее.
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
      // Sitemap: явный Cache-Control, чтобы не перезаписать Content-Type и кеш от route handler
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
      // Файлы из public/ (имена без хеша — при обновлении контента браузер должен перепроверить)
      {
        source: "/(.*)\\.(svg|png|jpg|jpeg|webp|avif|ico|woff2|woff|ttf|eot|js|css)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
      // _next/static — хеш в пути, безопасно кешировать надолго
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

export default withBundleAnalyzer(nextConfig);
