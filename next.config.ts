import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "cf.shopee.com.br" },
      { protocol: "https", hostname: "http2.mlstatic.com" },
    ],
  },
  basePath: "",
};

export default nextConfig;
