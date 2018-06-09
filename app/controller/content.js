const Controller = require('egg').Controller;

class ContentController extends Controller {
    async page() {
        const ctx = this.ctx;
        
        const result = await ctx.service.content.page()

        ctx.body = ctx.__success(result)
    }

    async add() {
        const ctx = this.ctx
        let data = ctx.request.body

        data.created_time = new Date()
        data.update_time = new Date()

        const result = await ctx.service.content.add(data)

        ctx.body = result ? ctx.__success({id: result.insertId}) : ctx.__error
    }
}

module.exports = ContentController