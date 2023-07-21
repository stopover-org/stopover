/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['placehold.co'],
    },
    env: {
        GRAPHQL_API_URL: process.env.GRAPHQL_API_URL
    }
}

module.exports = nextConfig
