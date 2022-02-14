const { resolve } = require('path');


module.exports = [{
    target: 'web',
    entry: './src/index.ts',
    mode: "production",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        libraryTarget: 'umd',
        globalObject: 'this',
        library: 'providerSeed',
        filename: 'provider-seed.js',
        path: resolve(__dirname, './dist'),
    }
}];
