/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-cdn.jtvnw.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'clips-media-assets2.twitch.tv',
        port: '',
        pathname: '/**',
      },
    ]
  },
  output: "export"
};

export default nextConfig;
