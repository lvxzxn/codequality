/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPENAPI_KEY: process.env.OPENAPI_KEY,
  },
};

export default nextConfig;
