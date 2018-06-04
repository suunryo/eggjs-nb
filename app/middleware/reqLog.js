module.exports = (options, app) => {
    return async function reqLog(ctx, next){
        console.log('=====',ctx.request.method,ctx.request.url,'=====')
        await next()
    }
}