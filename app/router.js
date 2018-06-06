const basePath = '/api'
module.exports = app => {
	const { router, controller } = app;

	router.post(basePath+'/user/login', controller.user.login)
	router.post(basePath+'/user/signup', controller.user.signup)
	router.get(basePath+'/user/checkUser', controller.user.checkUser)
	router.get(basePath+'/user/getUserInfo', controller.user.getUserInfo)
	router.get(basePath+'/user/test', controller.user.test)

	router.get(basePath+'/content/page', controller.content.page)
}