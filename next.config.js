/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "server.linearhub.com",
      },
      {
        protocol: "http",
        hostname: "192.168.10.186",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ]
  },
  experimental: {
    taint: true,
  },

};

module.exports = nextConfig;
