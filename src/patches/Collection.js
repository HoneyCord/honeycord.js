module.exports = (extendables) => {
	// <Collection>.array
	
	var Collection = require(`@discordjs/collection`).default;
	
	Collection.prototype.array = function() {
		return this.map(x => x);
	};

	extendables.Discord.Collection.prototype.array = function() {
		return this.map(x => x);
	};
};
