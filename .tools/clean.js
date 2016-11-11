const del = require('del')
const fs = require('./lib/fs')

const clean = () => new Promise((resolve, reject) => {
    del(['.tmp', 'dist/*', '!dist/.git'], { dot: true })
    .then(() => {
        fs.makeDir('dist/public')
    })
    .then(() => {resolve()})
})

module.exports = clean
