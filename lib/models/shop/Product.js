var keystone = require('keystone');
var Types = keystone.Field.Types;

const Product = new keystone.List('Product', {
	label: 'Product',
	track: true,
})

Product.add({
	name: { type: String, required: true, index: true, initial: true, },
	description: { type: String, initial: true, },
	number: { type: Number, require: true, initial: true, },
	logoImage: {
		type: Types.CloudinaryImage,
		folder: "shop.manager/backend/products/logo",
		autoCleanup: true,
		initial: true,
		width: 512,
		height: 512
	},
	images: {
		type: Types.CloudinaryImages,
		folder: "shop.manager/backend/products/images",
		autoCleanup: true,
		initial: true,
		generateFilename: function (file, attemptNumber, callback) {
			var originalname = file.originalname;
			var filenameWithoutExtension = originalname.substring(
				0,
				originalname.lastIndexOf(".")
			);
			var timestamp = new Date().getTime();
			return `${filenameWithoutExtension}-${timestamp}`;
		},
		whenExists: "retry"
	},
	types: {
		type: Types.Relationship,
		ref: "ProductType",
		many: true,
		initial: true,
	}
});

// Product.relationship({ ref: 'productInBasket', refPath: 'product', path: 'ProductInBasket' });

Product.defaultSort = "-createdAt";
Product.defaultColumns = "name, logoImage, types";
Product.register();
