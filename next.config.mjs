/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // experimental: {
  //   instrumentationHook: true,
  // },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
