// Injected content via Sentry wizard below
const {withSentryConfig} = require("@sentry/nextjs");
const path = require("path");

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    compiler: {
        relay: {
            // This should match relay.config.js
            artifactDirectory: './artifacts',
            schema: path.resolve(__dirname, './schema.graphql'),
            src: path.resolve(__dirname),
            exclude: ['**/node_modules/**', '**/__generated__/**', 'schema.graphql'],
            language: "typescript",
            noFutureProofEnums: true,
        },
    },
    images: {
        domains: ['placehold.co', 's3.eu-north-1.amazonaws.com'],
    },
    env: {
        GRAPHQL_API_URL: process.env.GRAPHQL_API_URL,
        SENTRY_DSN: process.env.SENTRY_DSN,
    },
    webpack: (config) => {
        config.resolve.fallback = {fs: false};

        return config;
    },
}


module.exports = nextConfig

if (process.env.NODE_ENV === 'production') {
    module.exports = withSentryConfig(
        module.exports,
        {
            // For all available options, see:
            // https://github.com/getsentry/sentry-webpack-plugin#options

            // Suppresses source map uploading logs during build
            silent: true,

            org: "stopover-dt",
            project: process.env.SENTRY_PROJECT,
        },
        {
            // For all available options, see:
            // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

            // Upload a larger set of source maps for prettier stack traces (increases build time)
            widenClientFileUpload: true,

            // Transpiles SDK to be compatible with IE11 (increases bundle size)
            transpileClientSDK: true,

            // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
            tunnelRoute: "/monitoring",

            // Hides source maps from generated client bundles
            hideSourceMaps: true,

            // Automatically tree-shake Sentry logger statements to reduce bundle size
            disableLogger: true,
        }
    );
}
