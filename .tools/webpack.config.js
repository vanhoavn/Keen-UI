const webpack = require('webpack')
const { join, resolve } = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const merge = require('webpack-merge')
const nodeExt = require('webpack-node-externals')
const config = require('../config')

const DEBUG = !process.argv.includes('--release')
const VERBOSE = process.argv.includes('--verbose')
const { path, AUTOPREFIXER_BROWSERS } = config
const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ?
        '"development"' : '"production"',
    __DEV__: DEBUG,
}

const baseConfig = {
    output: {
        publicPath: '/',
        sourcePrefix: '  ',
    },

    cache: DEBUG,

    stats: {
        colors: true,
        reasons: DEBUG,
        hash: VERBOSE,
        version: VERBOSE,
        timings: true,
        chunks: VERBOSE,
        chunkModules: VERBOSE,
        cached: VERBOSE,
        cachedAssets: VERBOSE,
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.vue', '.css'],
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
            },
            exclude: /node_modules|src\/(helpers|lib|mixins)/,
        }, {
            test: /\.vue$/,
            use: {
                loader: 'vue-loader',
            },
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            use: 'url?limit=10000&name=public/img/[hash].[ext]',
            include: path.src,
        }, {
            test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
            use: 'url-loader',
            include: path.src,
        }],
    },
}

const clientConfig = merge(baseConfig, {
    entry: ['./src-site/client/main.js'],
    output: {
        path: join(path.dist, '/public'),
        filename: DEBUG ?
            '[name].js?[hash]' : '[name].[hash].js',
    },
    devtool: DEBUG ?
        'cheap-module-eval-source-map' : false,
    plugins: [
        new webpack.DefinePlugin(Object.assign({
            'process.env.BROWSER': true
        }, GLOBALS)),
        new AssetsPlugin({
            path: path.dist,
            filename: 'assets.js',
            processOutput: x => `module.exports = ${JSON.stringify(x)}`
        }),
        new webpack.LoaderOptionsPlugin({
            vue: {
                postcss: [require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })]
            }
        })
    ].concat(!DEBUG ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: VERBOSE,
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
    ] : []),
})

const serverConfig = merge(baseConfig, {
    entry: ['./src-site/server/main.js'],
    output: {
        path: path.dist,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },
    target: 'node',
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin(Object.assign({
            'process.env.BROWSER': false
        }, GLOBALS)),
    ],
    externals: [nodeExt(), /\.\/assets$/]
})

const serverBundleConfig = merge(baseConfig, {
    entry: ['./src-site/client/server-entry.js'],
    target: 'node',
    output: {
        path: path.dist,
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2',
    },
    devtool: false,
    plugins: [
        new webpack.DefinePlugin(Object.assign({
            'process.env.BROWSER': false,
            'process.env.VUE_ENV': '"server"'
        }, GLOBALS))
    ],
    externals: [nodeExt()],
})

module.exports = [clientConfig, serverConfig, serverBundleConfig]
