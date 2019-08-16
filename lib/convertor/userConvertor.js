const makeUserShort = (user, w, h) =>
	user == null
		? null
		: {
			id: user._id,
			phone: user.phone,
			email: user.email,
			name: user.name,
			logoImage: user._.logoImage.limit(w || 128, h || 128),
		};

module.exports = {
	makeUserShort,
};
