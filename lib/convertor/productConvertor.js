const makeProductShort = (product, w, h) =>
	product == null
		? null
		: {
			id: product._id,
			name: product.name,
			price: product.price,
			number: product.number,
			description: product.description,
			logoImage: product._.logoImage.limit(w || 512, h || 512),
			images: product.images.map((image) => image),
			types: product.types
		};

const makeProductModel = product =>
	product == null
		? null
		: {
			descriptor: makeProductShort(product)
		};

module.exports = {
	makeProductShort,
	makeProductModel
};
