const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
 
module.exports = {
    entry: {
        app: "./src/assets/js/index.js",
    }, 
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            // HTML Loader
            {
                test: /\.html$/i,
                use: "html-loader"
            },
            // Style and CSS loader
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            // File loader for image
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/img'
                      }
                    }
                ]
            },
            // File loader for font
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/font'
                      }
                    }
                ]
            },
        ]
    },
    /* plugin */
    plugins: [
        // Provide Plugin
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Swal: 'sweetalert2'
          }),
        // HTML Webpack Plugin
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            chunks: ['app'],
            favicon: "./src/assets/img/icon.png",
            filename: "index.html"
        }),
        // Webpack PWA Manifest Plugin
        new WebpackPwaManifest({
            filename: "manifest.json",
            name: "ANi-TIME",
            short_name: "ANi-TIME",
            description: "List your anime anytime.",
            start_url: "/",
            display: "standalone",
            background_color: "#006bbd",
            theme_color: "#0277bd",
            inject: true,
            fingerprints: true,
            ios: true,
            icons: [
                {
                    src: path.resolve('src/assets/img/icon.png'),
                    sizes: [192, 256, 384, 512],
                    ios: true,
                    purpose: "maskable any"
                }
            ],
        }),
        // Workbox Webpack Plugin
        new InjectManifest({
            swSrc: './src/service-worker.js',
            swDest: 'service-worker.js',
        }),
    ]
}