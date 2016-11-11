const BrowserSync = require('browser-sync')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const runServer = require('./runServer')
const run = require('./run')
const clean = require('./clean')
const copy = require('./copy')

const DEBUG = !process.argv.includes('--release')

const start = () => new Promise((resolve, reject) => {
    run(clean)
        .then(() => {
            run(copy.bind(null, { watch: true }))
        })
        .then(() => {
            new Promise((resolve, reject) => {
                webpackConfig.filter(x => x.target !== 'node').forEach(config => {
                    if (Array.isArray(config.entry)) {
                        config.entry.unshift('webpack-hot-middleware/client')
                    } else {
                        config.entry = ['webpack-hot-middleware/client', config.entry]
                    }
                    config.plugins.push(new webpack.HotModuleReplacementPlugin())
                    config.plugins.push(new webpack.NoErrorsPlugin())
                })
                const compiler = webpack(webpackConfig)
                compiler.apply(new webpack.ProgressPlugin({
                    profile: true
                }))

                const wpMiddleware = webpackMiddleware(compiler, {
                    publicPath: webpackConfig[0].output.publicPath,
                    stats: webpackConfig[0].stats,
                })
                const hotMiddlewares = compiler.compilers.filter(compiler => {
                    return compiler.options.target !== 'node'
                }).map(compiler => webpackHotMiddleware(compiler))
                let handleServerBundleComplete = () => {
                    runServer((err, host) => {
                        if (!err) {
                            const bs = BrowserSync.create()
                            bs.init(Object.assign({
                                proxy: {
                                    target: host,
                                    middleware: [wpMiddleware, ...hotMiddlewares],
                                },
                                files: ['dist/public/**/*.*'],
                            }, DEBUG ? {} : {
                                notify: false,
                                ui: false
                            }), resolve)
                            handleServerBundleComplete = runServer
                        }
                    })
                }
                compiler.plugin('done', () => handleServerBundleComplete())
            })
        })
})

module.exports = start
