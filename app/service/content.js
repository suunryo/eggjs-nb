const Service = require('egg').Service

class ContentService extends Service {
    async page() {
        let list = await this.app.mysql.select('content') || []

        list.forEach(v => {
            Object.keys(v).forEach(k => {
                if(v[k].constructor.name == 'Date') v[k] = v[k].format('yyyy-MM-dd hh:mm:ss')
            })
        })
        return list
    }
}

module.exports = ContentService