const _ = require('lodash')
const express = require('express')
const { shopService, basketService } = requireRoot('lib/services')
const { authenticate } = require('../lib/middleware')

const router = express.Router()

function resBody(member) {
	return {
		data: member || {},
		status: 'success'
	}
}

router.get('/baskets', authenticate(),
	async (req, res, next) => {
		try {
			const { page, size, identifier, updatedAt, friendIds } = req.query
			const baskets = await basketService.getBaskets({ page, size, token: req.headers.authorization })

			res.status(200).send(baskets)
		} catch (e) {
			next(e);
		}
	})

router.get('/products',
	async (req, res, next) => {
		try {
			const w = req.w;
			const h = req.h;
			const product = await shopService.getProducts({ w, h })

			res.send(product)
		} catch (e) {
			next(e);
		}
	})

router.get('/products-in-baskets', authenticate(),
	async (req, res, next) => {
		try {
			const { basket, product } = req.query
			let filters = { basket, product }
			filters = _.omit(filters, _.isNil)
			const productsInBaskets = await shopService.getProductsInBaskets()

			res.send(productsInBaskets)
		} catch (e) {
			next(e);
		}
	})

router.get('/products-in-baskets/i/:id', authenticate(),
	async (req, res, next) => {
		try {
			const { id } = req.params
			const productsInBaskets = await shopService.findOneProductInBaskets({ id });

			res.send(productsInBaskets)
		} catch (e) {
			next(e);
		}
	})


module.exports = router
