var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	logoImage: {
		type: Types.CloudinaryImage,
		folder: "shop.manager/backend/users/logo",
		autoCleanup: true,
		initial: true,
		width: 512,
		height: 512
	},
	phone: { type: Types.Text, min: 9, max: 20, initial: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
		isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	});

User.relationship({ ref: 'Basket', refPath: 'owner', path: 'userOwner' });

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
