const path = require('path');
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 'production' か 'development' を指定
// const MODE = "production";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
// const enabledSourceMap = MODE === "development";

module.exports = [
    {
        // モード値を production に設定すると最適化された状態で、
        // development に設定するとソースマップ有効でJSファイルが出力される
        // mode: MODE,
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
                    test: /\.(scss)$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                        // { loader: 'style-loader' },
                        // {
                        //     loader: "css-loader",
                        //     options: {
                        //         url: true,
                        //         importLoaders: 2
                        //     }
                        // },
                        // { loader: 'sass-loader' }
                    ]
                },
                {
                    test: /\.(png|jpe?g|svg)$/i,
                    type: "asset/inline"
                },
                {
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader'
                    }
                }
            ]
        },
        plugins: [
            new KintonePlugin({
                manifestJSONPath: './plugin/manifest.json',
                privateKeyPath: './gghikjoekddaaedbkcnlmfdhhoeniako.ppk',
                pluginZipPath: './release/plugin.zip'
            })
        ],
        target: ["web", "es5"]
    }
];
