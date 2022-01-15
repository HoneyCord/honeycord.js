module.exports = () => {
	var Collection = require(`@discordjs/collection`).default;
	Collection.prototype.array = function() {
		// <Collection>.array
		return this.map(x => x);
	};
};
