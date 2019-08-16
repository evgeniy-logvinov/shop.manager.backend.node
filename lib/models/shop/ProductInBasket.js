var keystone = require('keystone');
const Types = keystone.Field.Types

const ProductInBasket = new keystone.List('ProductInBasket', {
	label: 'ProductInBasket',
	track: true
})

ProductInBasket.add({
	basket: {
		type: Types.Relationship,
		ref: 'Basket',
		initial: true
	},
	product: {
		type: Types.Relationship,
		ref: 'Product',
		initial: true
	},
	count: {
		type: Number,
		initial: true,
		default: 0
	},
	price: {
		type: Number,
		initial: true,
		default: 0
	},
});

ProductInBasket.defaultColumns = 'product, count, price'
ProductInBasket.register()
