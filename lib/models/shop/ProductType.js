
var keystone = require("keystone");

/**
 * Product Model
 * =============
 */

var ProductType = new keystone.List("ProductType", {
	autokey: { from: "name", path: "key", unique: true }
});

ProductType.add({
	name: { type: String, required: true, initial: true },
	publishedDate: { type: Date, default: Date.now },
});

ProductType.relationship({ path: 'types', ref: 'Product', refPath: 'types' });

ProductType.register();
