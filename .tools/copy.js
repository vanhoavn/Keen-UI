const path = require('path')
const gaze = require('gaze')
const replace = require('replace')
const Promise = require('bluebird')
const ncp = Promise.promisify(require('ncp'))

const copy = ({ watch } = {}) => new Promise((resolve, reject) => {
    Promise.all([
        ncp('src-site/public', 'dist/public'),
        ncp('src-site/server/views', 'dist/views'),
        ncp('package.json', 'dist/package.json'),
    ])
        .then(() => {
            replace({
                regex: '"start".*',
                replacement: '"start": "node server.js"',
                paths: ['dist/package.json'],
                recursive: false,
                silent: false,
            })
            if (watch) {
                const watcher = new Promise((resolve, reject) => {
                    gaze('src-site/public/**/*.*', (err, val) => err ? reject(err) : resolve(val))
                })
                watcher.then((watcher) => {
                    watcher.on('changed', (file) => new Promise((resolve, reject) => {
                        const replace = file.substr(path.join(__dirname, '../src-site/public/').length)
                        ncp(`src-site/public/${relPath}`, `build/public/${relPath}`)
                    }))
                })
            }
            resolve()
        })
})

module.exports = copy
