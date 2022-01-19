module.exports = (extendables) => {
	// <Collection>.array
	var ReqCollection = require(`@discordjs/collection`).default;
	ReqCollection.prototype.array = function() {
		return this.map(x => x);
	};
	
	/*
	extendables.extend(`Collection`, ExtendableCollection => {
		class Collection extends ExtendableCollection {
			// <Collection>.array
			array() {
				return super.map(x => x);
			}
		}

		 return Collection;
	});
	*/
};
