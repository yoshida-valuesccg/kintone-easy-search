const path = require('path');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');

module.exports = [
    {
        entry: {
            desktop: './src/css/desktop.scss',
            config: './src/css/config.scss'
        },
        output: {
            path: path.resolve(__dirname, 'plugin', 'css'),
            filename: '[name].css'
        },
        module: {
            rules: [
                {
                    // 対象となるファイルの拡張子(scss)
                    // Sassファイルの読み込みとコンパイル
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader"
                    ]
                }
            ]
        }
    },
    {
        entry: {
            desktop: './src/js/desktop.js',
            config: './src/js/config.js'
        },
        output: {
            path: path.resolve(__dirname, 'plugin', 'js'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader'
                    }
                },
                {
                    test: /\.json$/,
                    use: 'json-loader'
                },
                {
                    test: /\.(gif|jpg|jpeg|tiff|png)$/,
                    use: 'url-loader'
                }
            ]
        },
        plugins: [
            new KintonePlugin({
                manifestJSONPath: './plugin/manifest.json',
                privateKeyPath: './private.ppk',
                pluginZipPath: './dist/plugin.zip'
            })
        ]
    }
];
