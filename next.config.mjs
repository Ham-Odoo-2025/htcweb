/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'htc-fire-s3-bucket.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'd11w7iudg4apkd.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'htc-fire.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
};

export default nextConfig;
