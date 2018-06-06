const Controller = require('egg').Controller;

class UserController extends Controller {
	// 登录
	async login() {
		const ctx = this.ctx;
		const account = ctx.request.body.account
		const password = ctx.request.body.password
		const result = await ctx.service.user.login(account, password)

		ctx.cookies.set('sun', result.id, {
			maxAge: 10 * 60 * 1000,
			path: '/',
			encrypt: true,
			signed: true
		})
		
		ctx.body = result ? ctx.__success() : ctx.__error()
	}

	// 注册
	async signup() {
		const ctx = this.ctx
		const data = ctx.request.body

		const result = await ctx.service.user.signup(data)
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

	async test(){
		const ctx = this.ctx
		
		ctx.body = ctx.__success()
	}
}

module.exports = UserController