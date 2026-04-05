import * as path from "node:path";
import {fileURLToPath} from "node:url";
import CopyPlugin from "copy-webpack-plugin";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
    {
        name: "web-development",
        entry: [
            "./src/client/index.js",
            "webpack-dev-server/client?http://localhost:4000"
        ],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "web/static/js/index.js",
            clean: true,
        },
        mode: "development",
        target: "web",
        devtool: [
            {type: "javascript", use: "source-map"},
            {type: "css", use: "inline-source-map"},
        ],
        module: {
            noParse: /.*[\/\\]bin[\/\\].+\.js/,
            rules: [
                {
                    test: /.jsx?$/,
                    include: [path.resolve(__dirname, 'src')],
                    use: [{loader: 'babel-loader', options: {presets: ['@babel/preset-react', '@babel/preset-env']}}]
                },
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, 'src')],
                    use: [{loader: 'babel-loader', options: {presets: ['@babel/preset-env']}}]
                },
                {
                    test: /\.(html|htm)$/,
                    use: [{loader: 'dom'}]
                }
            ]
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {from: 'src/client/resources', to: path.resolve(__dirname, "dist/web")}
                ],
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify("development"),
                'PLATFORM': JSON.stringify("web")
            })
        ],
        resolve: {
            alias: {
                'platform': path.resolve(__dirname, './src/client/platform/web')
            },
            fallback: {
                "timers": false,
                "stream": false
            }
        }
    },
    {
        name: "web-production",
        entry: [
            "./src/client/index.js",
        ],
        output: {
            path: path.resolve(__dirname, "dist/web"),
            filename: "static/js/index.js",
            clean: true,
        },
        mode: "production",
        target: "web",
        module: {
            noParse: /.*[\/\\]bin[\/\\].+\.js/,
            rules: [
                {
                    test: /.jsx?$/,
                    include: [path.resolve(__dirname, 'src')],
                    use: [{loader: 'babel-loader', options: {presets: ['@babel/preset-react', '@babel/preset-env']}}]
                },
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, 'src')],
                    use: [{loader: 'babel-loader', options: {presets: ['@babel/preset-env']}}]
                },
                {
                    test: /\.(html|htm)$/,
                    use: [{loader: 'dom'}]
                }
            ]
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {from: 'src/client/resources', to: path.resolve(__dirname, "dist")}
                ],
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify("production"),
                'PLATFORM': JSON.stringify("web")
            })
        ],
        resolve: {
            alias: {
                'platform': path.resolve(__dirname, './src/client/platform/web')
            },
            fallback: {
                "timers": false,
                "stream": false
            }
        }
    },
]