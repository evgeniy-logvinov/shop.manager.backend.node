var keystone = require('keystone');
const Types = keystone.Field.Types

const Basket = new keystone.List('Basket', {
	label: 'Basket',
    track: true
})

Basket.add({
	// name: { type: String, required: true, index: true },
	owner: { type: Types.Relationship, ref: 'User', initial: true },
	totalPrice: { type: Number, index: true },
	done: { type: Boolean, index: true },
	// friend: { type: Types.Relationship, ref: 'User', initial: true, many: true },
});

Basket.relationship({ ref: 'ProductInBasket', refPath: 'basket', path: 'product' });

Basket.defaultColumns = 'done, owner, totalPrice'
Basket.register()
