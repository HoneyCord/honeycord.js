module.exports = (path, Discord, srcPath) => {
	class Collection extends Discord.Collection {
		array() {
			return super.values();
		}
	}

	Discord.Collection = Collection;
};
