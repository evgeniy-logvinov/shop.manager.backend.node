const _ = require('lodash')
var keystone = require('keystone');

const { RestApiError, WebError } = requireRoot('lib/errors')

const AbstractService = require('./AbstractService')
const UserService = require('./UserService')
const SecurityService = require('./SecurityService')
const Product = keystone.list('Product').model
const ProductInBasket = keystone.list('ProductInBasket').model
const Basket = keystone.list('Basket').model
const { makeProductShort, makeProductModel } = requireRoot("./lib/convertor");
const { productShortProjection, productModelProjection } = requireRoot(
	"lib/projections"
);

class ShopService extends AbstractService {

	async getProducts({ w = 512, h = 512 }) {
		const products = await Product.find({})
			.populate(productShortProjection)
			.exec();
		return products.map((el) => makeProductShort(el, w, h));
	}

	async getProductsInBaskets() {
		return await ProductInBasket
			.find({})
			.exec()
	}

	async findOneProductInBaskets({ id }) {
		return await ProductInBasket
			.find({ id })
			.exec()
	}

	async findProductsInBasketsByFilters({ basket, product }) {
		return await ProductInBasket
			.find({ basket, product })
			.exec()
	}

	async createTicket({ products, token }) {
		const basket = await this.createBasket({ products, token });

		for (const product of products) {
			await this.createProductInBasket({ product, basketId: basket._id });
		}

		return basket._id;
	}

	async createBasket({ products, token }) {
		let owner = null;
		const totalPrice = products.reduce((summ, el) => summ + el.price * el.count, 0);

		if (token) {
			const userService = new UserService();
			const securityService = new SecurityService();
			const ownToken = await securityService.token({ token })

			owner = await userService.getUser({ token: ownToken })
		}

		return Basket.create({
			owner: owner.id, totalPrice
		})
	}

	async createProductInBasket({ product, basketId }) {
		if (!basketId) {
			throw new RestApiError('Empty basket Id');
		}

		if (!product.id) {
			throw new WebError('Empty product id');
		}

		return ProductInBasket.create({
			basket: basketId,
			product: product.id,
			price: product.price,
			count: product.count,
		})
	}
}

module.exports = ShopService
