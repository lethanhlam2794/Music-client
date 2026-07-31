/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3002',
          },
        ],
      },
    turbopack: {
      root: process.cwd(),
    },
};

export default nextConfig;
