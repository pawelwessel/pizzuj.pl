import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "maps.gstatic.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
