var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SMUser Model
 * ==========
 */
var SMUser = new keystone.List('SMUser');

SMUser.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
SMUser.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
SMUser.defaultColumns = 'name, email, isAdmin';
SMUser.register();
