import { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const config: StorybookConfig = {
    stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-webpack5-compiler-swc"
    ],

    framework: {
        name: '@storybook/react-webpack5',
        options: {
            legacyRootApi: true,
        },
    },

    core: {
        builder: {
            name: "@storybook/builder-webpack5",
            options: {
                fsCache: true,
                lazyCompilation: true
            }
        },
    },

    webpackFinal: async (config) => {
        if (config.resolve) {
            config.resolve.alias = {
                ...config.resolve.alias,
                'components': path.resolve(__dirname, '../components'),
                'lib': path.resolve(__dirname, '../lib')
            };
        }
        return config;
    },
}

export default config;