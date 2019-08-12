const SecurityService = require('./lib/SecurityService')
const ShopService = require('./lib/ShopService')
const BasketService = require('./lib/BasketService')
const UserService = require('./lib/UserService')

module.exports = {
	securityService: new SecurityService(),
	shopService: new ShopService(),
	basketService: new BasketService(),
	userService: new UserService()
}
