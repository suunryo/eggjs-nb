const Controller = require('egg').Controller

class HomeController extends Controller {
	async index() {
		this.ctx.body = 'hello boy'
	}
}

module.exports = HomeController