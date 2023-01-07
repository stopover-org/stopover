/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['ra-core', 'react-admin']); // pass the modules you would like to see transpiled

const nextConfig = {
    reactStrictMode: true,
    ...withTM({})
}

module.exports = nextConfig
