import {app, router} from './app'

export default context => {
    router.push(context.url)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 0)
    }).then(() => {
        return app
    })
}
