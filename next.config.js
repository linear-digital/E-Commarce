/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["www.bdshop.com",
      "www.ryanscomputers.com",
      "www.newsshooter.com",
      "dropshop.com.bd",
      "sg-test-11.slatic.net",
      "localhost",
      "192.168.10.186",
      "server.linearhub.com"
    ],
  },
  experimental: {
    taint: true,
  },
  
};

module.exports = nextConfig;
