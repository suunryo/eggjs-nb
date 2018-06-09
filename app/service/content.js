const Service = require('egg').Service

class ContentService extends Service {
    async page() {
        let list = await this.app.mysql
            .query( `SELECT content.* ,
                user.account,
                user.nickname,
                user.headurl
                FROM content
                LEFT JOIN user
                ON content.user_id = user.id
                ORDER BY update_time DESC`)

        list.forEach(v => {
            Object.keys(v).forEach(k => {
                if(v[k].constructor.name == 'Date') v[k] = v[k].format('yyyy-MM-dd hh:mm:ss')
            })
        })
        return list
    }

    async add(data) {

        const result = await this.app.mysql.insert('content', data)

        return result
    }
}

module.exports = ContentService