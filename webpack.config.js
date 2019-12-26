const { resolve } = require('path');


module.exports = [
    {
        entry: './src/index.ts',
        mode: "production",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            libraryTarget: 'umd',
            globalObject: 'this',
            library: 'providerSeed',
            filename: 'provider-seed.js',
            path: resolve(__dirname, 'dist'),
        }
    }
];