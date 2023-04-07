/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['ra-core', 'react-admin']); // pass the modules you would like to see transpiled

const nextConfig = {
    reactStrictMode: true,
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'placehold.co',
            port: '',
            pathname: '/**',
        },
    ],
    images: {
        domains: ['placehold.co'],
    },
    ...withTM({})
}

module.exports = nextConfig
