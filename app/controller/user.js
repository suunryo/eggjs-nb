const Controller = require('egg').Controller;

class UserController extends Controller {
	// 登录
	async login() {
		const ctx = this.ctx;
		const {account, password} = ctx.request.body
		const result = await ctx.service.user.login(account, password)

		if(!result){
			ctx.body = ctx.__error('账户不存在')
		}else if(result.password != password){
			ctx.body = ctx.__error('密码不正确')
		}else{
			ctx.cookies.set('sun', result.id.toString(), {
				path: '/',
				encrypt: true,
				signed: true
			})
			ctx.session.user = result.id
			ctx.body = ctx.__success()
		}
	}

	// 注册
	async signup() {
		const ctx = this.ctx
		const data = ctx.request.body

		const result = await ctx.service.user.signup(data)

		ctx.cookies.set('sun', result.toString(), {
			path: '/',
			encrypt: true,
			signed: true
		})
		ctx.session.user = result.id
		
		ctx.body = ctx.__success({id: result})
	}

	// check account/name for sign-up
	async checkUser() {
		const ctx = this.ctx
		const data = {
			type: ctx.query.type,
			value: ctx.query.value
		}
		
		const result = await ctx.service.user.checkUser(data)
		ctx.body = result ? ctx.__success() : ctx.__error()
	}


	async getUserInfo() {
		const ctx = this.ctx

		const userId = ctx.cookies.get('sun', {
			encrypt: true,
			signed: true
		})

		const result = await ctx.service.user.getUserInfo(userId)
		ctx.body = result ? ctx.__success(result) : ctx.__error()
	}

	async logout(){
		const ctx = this.ctx
		
		ctx.cookies.set('sun', null)
		ctx.session.user = null
		ctx.body = ctx.__success()
	}
}

module.exports = UserController