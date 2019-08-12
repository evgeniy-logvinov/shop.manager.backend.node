var keystone = require('keystone');
const Types = keystone.Field.Types

const Basket = new keystone.List('Basket', {
	label: 'Basket',
    track: true
})

Basket.add({
	name: { type: String, required: true, index: true },
	owner: { type: Types.Relationship, ref: 'User', initial: true },
	// friend: { type: Types.Relationship, ref: 'User', initial: true, many: true },
});

Basket.defaultColumns = 'name, owner'
Basket.register()
