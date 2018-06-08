module.exports = {
    __success(result) {
        return {
            code: 200,
            msg: 'success',
            result: result
        }
    },
    __error(result) {
        return {
            code: 500,
            msg: 'error',
            result: result
        }
    },
    __notLogin() {
        return {
            code: 501,
            msg: '未登录'
        }
    }
}