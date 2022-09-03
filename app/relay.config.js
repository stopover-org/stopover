const path = require("path");
module.exports = {
    // ...
    // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
    schema: path.resolve(__dirname, '../graphql/schema.graphql'),
    src: path.resolve(__dirname),
    exclude: ['**/node_modules/**', '**/__generated__/**', 'schema.graphql'],
    language: "typescript",
    noFutureProofEnums: true,
}