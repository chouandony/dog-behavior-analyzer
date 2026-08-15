/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.GITHUB_PAGES === 'true' ? '/dog-behavior-analyzer' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
