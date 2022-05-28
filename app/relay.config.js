module.exports = {
    src: ['./pages', './components'],
    schema: './schema.graphql',
    exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
    extensions: ['ts', 'tsx'],
    language: 'typescript',
    // artifactDirectory: 'graphql/__generated__',
};
