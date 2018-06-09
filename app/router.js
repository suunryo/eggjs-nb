module.exports = app => {
	const { router, controller, config } = app;

	const baseRoute = config.path.baseRoute

	router.post(baseRoute+'/common/uploadfile', controller.common.uploadfile)

	router.post(baseRoute+'/user/login', controller.user.login)
	router.post(baseRoute+'/user/signup', controller.user.signup)
	router.get(baseRoute+'/user/checkUser', controller.user.checkUser)
	router.get(baseRoute+'/user/getUserInfo', controller.user.getUserInfo)
	router.get(baseRoute+'/user/logout', controller.user.logout)

	router.get(baseRoute+'/content/page', controller.content.page)
	router.post(baseRoute+'/content/add', controller.content.add)

}