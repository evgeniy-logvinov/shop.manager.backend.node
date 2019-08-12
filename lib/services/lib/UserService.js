const _ = require('lodash')
var keystone = require('keystone');

const AbstractService = require('./AbstractService')
const User = keystone.list('User').model
const { makeUserShort } = requireRoot("./lib/convertor");

class UserService extends AbstractService {

	async getUser({ token }) {
		const user = await User.findOne({ _id: token.user._id })
		return makeUserShort(user);
	}
}

module.exports = UserService
