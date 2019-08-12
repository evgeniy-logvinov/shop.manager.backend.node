const makeUserShort = (user, w, h) =>
	user == null
		? null
		: {
			id: user._id,
			user: user.name,
			logoImage: user._.logoImage.limit(w || 512, h || 512),
		};

module.exports = {
	makeUserShort,
};
