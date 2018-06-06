const Controller = require('egg').Controller;

class ContentController extends Controller {
    async page() {
        const ctx = this.ctx;
        
        const result = await ctx.service.content.page()

        ctx.body = ctx.__success(result)
    }
}

module.exports = ContentController