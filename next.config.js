/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },{
        protocol: "https",
        hostname: "img.drz.lazcdn.com",
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
