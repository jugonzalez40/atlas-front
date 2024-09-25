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
  }
};

export default nextConfig;
