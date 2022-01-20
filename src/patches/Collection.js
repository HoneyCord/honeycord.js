module.exports = (extendables) => {
	// <Collection>.array
	var ReqCollection = require(`@discordjs/collection`).default;
	ReqCollection.prototype.array = function() {
		return this.values();
	};
};
