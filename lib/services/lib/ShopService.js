const _ = require('lodash')
var keystone = require('keystone');

const AbstractService = require('./AbstractService')
const Product = keystone.list('Product').model
const ProductInBasket = keystone.list('ProductInBasket').model
const { makeProductShort, makeProductModel } = requireRoot("./lib/convertor");
const { productShortProjection, productModelProjection } = requireRoot(
	"lib/projections"
);

class ShopService extends AbstractService {

	async getProducts({w = 512, h = 512}) {
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
}

module.exports = ShopService
