module.exports = {
    "stories": ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-webpack5-compiler-swc"
    ],

    "framework": {
        "name": '@storybook/react-webpack5',
        "options": {
            "legacyRootApi": true,
        },
    },

    "core": {
        "builder": "@storybook/builder-webpack5",
        "options": {
            "lazyCompilation": true
        }
    },
}