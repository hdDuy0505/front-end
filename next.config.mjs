/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_APP_API_URL: process.env.NEXT_APP_API_URL,
    },
};

export default nextConfig;
