const Service = require('egg').Service

class UserService extends Service {
	// 登录
	async login(account, password) {
		const row = await this.app.mysql.get('user', {account: account})
		if(!row) return false
		return row
	}

	// 注册
	async signup(data) {
		const res = await this.app.mysql.insert('user', data)

		return res.insertId
	}

	// 检查账户昵称
	async checkUser(data) {
		if(!data.type || !data.value) return false
		let obj = {};
		if(data.type == 1){
			obj.account = data.value
		}else if(data.type == 2){
			obj.nickname = data.value
		}
		const res = await this.app.mysql.get('user', obj)
		return res ? false : true
	}

	async getUserInfo(id) {
		if(!id) return false;

		let res = await this.app.mysql.get('user', {id: id})
		if(!res) return false

		delete res.password

		return res
	}
}

module.exports = UserService