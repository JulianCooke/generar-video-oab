/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://alvarezbarrios.com.ar/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig;
