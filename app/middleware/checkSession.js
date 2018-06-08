module.exports = (ops, app) => {
    return async function checkSession(ctx, next){
        if(ctx.path != '/api/user/login' && ctx.path != '/api/user/logout'){
            console.log('====== user session :', ctx.session.user, '======')
        }
        
        await next()

        if(ctx.path != '/api/user/login' && ctx.path != '/api/user/logout'){
            if(!ctx.session.user) ctx.body = ctx.__notLogin()
        }
    }
}